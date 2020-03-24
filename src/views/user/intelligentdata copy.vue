<template>
  <div class="chart-container">
    <header>
      <span class="title-one">学员中心</span>
      <span class="title-sec">智能数据</span>
    </header>
    <div class="box-big">
      <p class="title-one" style="color:#6666FF">智能数据</p>
      <div class="top-box">
        <div class="top-left">
          <ul>
            <li>1、请将要分析的号码，复制到右边的数据框中。每一柱一行，每个号码以空格分开。</li>
            <li>2、选择用于计算遗漏的彩票</li>
            <li>
              <el-select v-model="value" placeholder="请选择" @change="TypeChange">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </li>
            <li style="margin-bottom:0">3、选择用于计算的期数</li>
            <li>
              <el-select v-model="value1" placeholder="请选择" @change="TypeChanges">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <div class="top-right">
          <p clsss="top-right-text">号码</p>
          <textarea name id cols="30" rows="10" v-model="textareaVal"></textarea>
        </div>
      </div>

      <div class="title-3">
        <span class="yunsuan" @click="tabChange">智能运算</span>
        <span>最大遗漏期数：{{maxs}}；</span>
        <span>总遗漏期数：{{totals}}</span>
      </div>
      <p>智能数据遗漏走势图</p>
      <div id="chart-box">
        <div style="position:relative" v-if="chartImg==true">
          <div class="charts-img">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <!-- <span class="qihao">期号</span> -->
        </div>
        <chart height="100%" width="100%" :key="timers" v-if="chartImg==false"></chart>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "@/components/Charts/lineMarkerCopy";

export default {
  name: "intelligentdata",
  components: { Chart },
  data() {
    return {
      chartImg: true,

      timers: "1",
      options: [],
      value: "",
      options1: [
        {
          value: "100",
          label: "100"
        },
        {
          value: "500",
          label: "500"
        }
      ],
      value1: "100",

      loginForm: {
        caipiaoid: 5,
        token: localStorage.getItem("token"),
        limit: "100"
      },
      textareaVal: "",

      max: 0,
      total: 0
    };
  },
  created() {
    this.vip();
    if (sessionStorage.getItem("copy") && sessionStorage.getItem("zuohao")) {
      this.textareaVal = sessionStorage.getItem("zuohao");
    }
    this.cate();
  },

  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      if (!sessionStorage.getItem("max")) return;
      sessionStorage.removeItem("max");

      if (!sessionStorage.getItem("total")) return;
      sessionStorage.removeItem("total");

      (this.timers = "1"), this.cate();

      (this.value1 = "100"),
        (this.loginForm = {
          caipiaoid: 5,
          token: localStorage.getItem("token"),
          limit: "100"
        }),
        (this.textareaVal = ""),
        (this.max = 0),
        (this.total = 0);
      this.textareaVal = "";
    }
  },
  computed: {
    maxs() {
      return this.$store.state.max;
    },
    totals() {
      return this.$store.state.total;
    }
  },
  methods: {
    cate() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/cate",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.options = res.data.data;
        that.value = res.data.data[0].name;
        that.loginForm.type = res.data.data[0].id;
      });
    },

    // 点击计算遗漏走势图
    tabChange() {
      if (!this.textareaVal) {
        return;
      }
      sessionStorage.setItem("missedMore", this.textareaVal);
      // 点击图表小图标后重新加载图表模板
      this.timers = new Date().getTime();
      this.chartImg = false;
      this.max = sessionStorage.getItem("max");
      this.total = sessionStorage.getItem("total");
    },
    // 切换福建等城市
    TypeChange(v) {
      this.loginForm.caipiaoid = v;
      sessionStorage.setItem("caipiaoidmore", v);
      sessionStorage.setItem("missedMore", this.textareaVal);
      this.timers = new Date().getTime();
    },
    // 切换期数
    TypeChanges(v) {
      this.loginForm.limit = v;
      sessionStorage.setItem("limit", v);
      sessionStorage.setItem("missedMore", this.textareaVal);
      this.timers = new Date().getTime();
    },
    // 刷新当前页面
    reload() {
      location.reload();
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}

.top-box {
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.title-one {
  font-size: 18px;
  color: #333333;
}

.title-sec {
  color: #666666;
  font-size: 14px;
}

ul li {
  color: #333300;
  font-size: 14px;
  list-style: none;
  height: 40px;
  /* line-height: 40px; */
  margin-bottom: 10px;
}
.top-right p {
  color: #333300;
  font-size: 14px;
}

textarea {
  border: 0.5px solid #f5f5f5;
  margin-left: 42px;
  height: 130px;
}
.title-3 {
  font-size: 14px;
  color: #333333ff;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  margin-top: 20px;
}
.yunsuan {
  background-color: #4187bd;
  color: #fff;
  font-size: 14px;
  border-radius: 2px;
  padding: 2px 4px;
  margin-right: 5px;
}

#chart-box {
  /* height: 120px; */
  margin-bottom: 50px;
}

.box-big {
  border-top: 4px solid #4187bd;
  background-color: #fff;
  width: 100%;
  padding-left: 10px;
}
.charts-img {
  width: 80vw;
  height: 40vh;
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.charts-img p {
  width: 100%;
  border-top: 0.5px solid #f5f5f5;
  flex: 1;
  /* position: relative;
  right:2px; */
}
.qihao {
  position: ;
}
@media (max-width: 320px) {
  /*0~320*/
  .top-box {
    flex-direction: column;
  }

  .top-right p {
    padding-left: 42px;
  }
}
@media (min-width: 321px) and (max-width: 375px) {
  /*321~768*/
  .top-box {
    flex-direction: column;
  }
  .top-right p {
    padding-left: 42px;
  }
}
@media (min-width: 376px) and (max-width: 425px) {
  /*376~425*/
  .top-box {
    flex-direction: column;
  }
  .top-right p {
    padding-left: 42px;
  }
}
@media (min-width: 426px) and (max-width: 1174px) {
  /*426~768*/
  .top-box {
    flex-direction: column;
  }
  .top-right p {
    padding-left: 42px;
  }
}

@media (min-width: 1174px) {
  /*769~+∞*/
  textarea {
    border: 0.5px solid #f5f5f5;
    margin-left: 0;
    height: 130px;
    width: 694px;
  }
}
</style>
