<template>
  <div class="tuijian">
    <div style>
      <header>
        <span class="title-one">学员中心</span>
        <span class="title-sec">智能推荐</span>
      </header>
      <div class="top-phone top">
        <el-select v-model="value" placeholder="请选择" @change="caipiaoidChange">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-select v-model="value1" placeholder="请选择" @change="TypeChange">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <img src="../../assets/img/sx@2x.png" alt @click="reload" />
      </div>
      <div class="top top-pc">
        <el-select v-model="value" placeholder="请选择" @change="caipiaoidChange">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-select v-model="value1" placeholder="请选择" @change="TypeChange">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <img src="../../assets/img/sx@2x.png" alt @click="reload" />
      </div>

      <div class="content-phone">
        <div class="text" style="font-size:18px;">智能推荐</div>
      </div>

      <div class="content">
        <div class="text">智能推荐</div>
        <div style="display:flex;justify-content:center;width:100%;" class="box-phone"></div>
      </div>
    </div>
    <div class="table-wrap">
      <table class="gridtable">
        <thead style>
          <tr style>
            <th style="max-width:70px;">号码</th>
            <th>
              <span @click="upOrDown('last')" class="sort-text">上次</span>
              <span class="up-down">
                <i class="el-icon-caret-top" @click="up('last')"></i>
                <i class="el-icon-caret-bottom i-sec" @click="down('last')"></i>
              </span>
            </th>
            <th class="two-row">
              <span @click="upOrDown('now')" class="sort-text">当前</span>
              <span class="up-down">
                <i class="el-icon-caret-top" @click="up('now')"></i>
                <i class="el-icon-caret-bottom i-sec" @click="down('now')"></i>
              </span>
            </th>
            <th class="two-row">
              <span @click="upOrDown('large')" class="sort-text">最大</span>
              <span class="up-down">
                <i class="el-icon-caret-top" @click="up('large')"></i>
                <i class="el-icon-caret-bottom i-sec" @click="down('large')"></i>
              </span>
            </th>
            <th class="two-row bg-odd">
              <span class="sort-text" @click="upOrDown('price')">价值</span>
              <span class="up-down">
                <i class="el-icon-caret-top" @click="up('price')"></i>
                <i class="el-icon-caret-bottom i-sec" @click="down('price')"></i>
              </span>
            </th>
            <th class="two-row bg-zh">图表</th>
          </tr>
        </thead>
        <tbody style>
          <template v-for="(item,key) in tableData">
            <tr
              class="sec-body"
              :style="item.id==curId?'height:32vh position:relative':'position:relative'"
            >
              <td>{{item.show_number}}</td>
              <td>{{item.last}}</td>
              <td>{{item.now}}</td>
              <td>{{item.large}}</td>
              <td>{{item.price}}</td>
              <td class="tubiao" @click="tabChange($event,item)" style>
                <img
                  src="https://farm-shop.oss-cn-beijing.aliyuncs.com/uploads/b61a1805efafc11f316bcaf792106f7.png"
                  alt
                  class="tb-icon"
                />
              </td>
            </tr>
            <tr v-if="(item.id==curId&&flag==true)">
              <td colspan="6">
                <div class="chart-container" data-id="props.row.id">
                  <chart height="100%" width="100%" :key="timer"></chart>
                </div>
              </td>
            </tr>
          </template>
          <tr></tr>
        </tbody>
      </table>
    </div>
    <!-- <span style="position:fixed;right:0;bottom:50%;z-index:999" @click="backTop">回到顶部</span>   -->
  </div>
</template>

<style scoped>
tbody tr {
  /* table-layout: fixed;
  width: calc( 100% - 1em ); */
}
.title-one {
  color: #333333ff;
  font-size: 18px;
  margin-right: 10px;
  margin-left: 20px;
}
header {
  margin-top: 20px;
}
.title-sec {
  color: #666666ff;
  font-size: 14px;
}
.top {
  border-top: 5px solid #4187bdff;
  width: 98%;
  margin: 0 auto;
  padding: 20px 9px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.top span {
  width: 60px;
  height: 40px;
  background-color: #ff9219;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top img {
  width: 90px;
  height: 40px;
  position: absolute;
  right: 51px;
}
.content,
.content-phone {
  margin-top: 25px;
  border-top: 5px solid #4187bd;
}
.content,
.content-phone {
  width: 98%;
  margin: 0 auto;
  margin-top: 20px;
}
.text {
  margin: 14px 0 20px 2px;
  font-size: 16px;
  color: #666;
  line-height: 22px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.chart-container {
  /* display: none; */
}

.active {
  display: block;
  background: red;
}

.content-phone,
.content,
.top-phone,
.top-pc {
  display: none;
}
.top-phone .el-input {
  width: 75%;
}
.top-phone .el-input__inner {
  height: 30px;
  line-height: 30px;
}
.top-phone .el-select {
  margin-bottom: 4px;
}
.top-phone {
  position: relative;
}
.top-phone img {
  position: absolute;
  top: 18px;
  right: 10px;
  width: 64px;
  height: 28px;
}

@media (max-width: 320px) {
  .top-phone {
    display: block;
  }
  .content-phone {
    display: block;
  }
}

/* .table-wrap{
  height:800px;
  overflow-y: auto;
} */
@media (min-width: 321px) and (max-width: 375px) {
  .top-phone {
    display: block;
  }
  .content-phone {
    display: block;
  }
}

@media (min-width: 376px) and (max-width: 425px) {
  .top-phone {
    display: block;
  }
  .content-phone {
    display: block;
  }
}

@media (min-width: 426px) and (max-width: 768px) {
  .top-pc {
    display: block;
  }

  .content {
    display: block;
  }
}

@media (min-width: 769px) {
  .top-pc {
    display: block;
  }
  /*769~+∞*/
  .content {
    display: block;
  }
}

.charts {
  position: absolute;
  top: 40px;
  width: 100vw;
  height: 30vh;
  background-color: #ff9219;
  left: -947%;
  z-index: 88;
  /* display: none; */
}
/* 表格样式 */
table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #f9f9f9;
  border-collapse: collapse;
  min-width: 100%;
}
table.gridtable th {
  border-width: 1px;
  padding: 0px 0.5px;
  border-style: solid;
  border-color: #f9f9f9;
  background-color: #ffe8a9;
  height: 40px;
}
table.gridtable td {
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: #f9f9f9;
  background-color: #ffffff;
  height: 40px;
  min-width: 32px;
}

.tb-icon {
  width: 20px;
  height: 20px;
}

table tr:nth-child(even) td {
  background: #f5f5f5 !important;
}
/* 排序 */
.up-down {
  position: relative;
  right: 4px;
}
.up-down i {
  position: absolute;
  top: 0;
  left: 0;
}
.up-down .i-sec {
  top: 5px;
}

.up-down i:active,
.sort-text:active {
  color: yellow;
  transform: scale(0.97);
  -ms-transform: rotate(0.97); /* IE 9 */
  -moz-transform: rotate(0.97); /* Firefox */
  -webkit-transform: rotate(0.97); /* Safari 和 Chrome */
  -o-transform: rotate(0.97); /* Opera */
}
.sort-text {
  position: relative;
  right: 5px;
}
</style>

<script>
import Chart from "@/components/Charts/lineMarker";
import $ from "jquery";
console.log($);

export default {
  data() {
    return {
      tableData: [],
      currentView: -1,
      isShowDialog: false,
      loginForm: {
        type: 5,
        caipiaoid: 1,
        token: localStorage.getItem("token")
      },
      nowArray: [],
      timer: "",

      options: [], //福建11选3等
      value: "", //福建11选3等选中的值

      options1: [
        { value: "5", label: "任选5" },
        {
          value: "2",
          label: "任选2"
        },

        {
          value: "3",
          label: "任选3"
        },
        { value: "4", label: "任选4" },
        { value: "6", label: "任选6" },
        { value: "7", label: "任选7" },
        { value: "8", label: "任选8" }
      ], //任选5等

      value1: "任选5", //任选5等选中的值

      expandKeys: [] /** 新增 **/,

      expands: [],
      curId: "",
      flag: true, //用来判断点击同一个图标的张开和收起
      flagUp: false //用来控制点击文字是进行升序还是降序的处理
    };
  },
  components: { Chart },
  created() {
    this.vip();
    this.cate();
    if (localStorage.getItem("type")) {
      this.loginForm.type = localStorage.getItem("type");
      let arr = this.options1.filter(item => {
        return item.value == localStorage.getItem("type");
      });
      this.value1 = arr[0].label;
    }
  },
  methods: {
    backTop() {
      let nowTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      console.log(nowTop);
      if (nowTop > 0) {
        window.requestAnimationFrame(this.goUp);
        window.scrollTo(0, nowTop - nowTop / 5);
      }
    },
    cate() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/cate",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.options = res.data.data;
        if (localStorage.getItem("caipiaoid")) {
          var arr = that.options.filter(item => {
            return item.id == localStorage.getItem("caipiaoid");
          });
          that.value = arr[0].name;
          this.loginForm.caipiaoid = localStorage.getItem("caipiaoid");
        } else {
          that.value = res.data.data[0].name;
          that.loginForm.caipiaoid = res.data.data[0].id;
        }
        that.getData();
      });
    },
    getData(val) {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/plane",
        params: this.loginForm
      }).then(res => {
        that.tableData = res.data.data;
      });
    },
    // 点击每个小图标展开遗漏走势图
    tabChange(e, row) {
      if (row.id == this.curId) {
        this.flag = !this.flag;
      } else {
        this.flag = true;
      }

      this.curId = row.id;

      sessionStorage.setItem("missed", row.show_number);

      // 点击图表小图标后重新加载图表模板
      this.timer = new Date().getTime();
    },
    // 切换福建等城市
    caipiaoidChange(v) {
      this.loginForm.caipiaoid = v;
      localStorage.setItem("caipiaoid", v);
      this.getData();
    },
    // 切换任选5等
    TypeChange(v) {
      this.loginForm.type = v;
      localStorage.setItem("type", v);
      this.getData();
      sessionStorage.setItem("type",v)
    },
    // 刷新当前页面
    reload() {
      location.reload();
    },
    upOrDown(v) {
      this.flagUp = !this.flagUp;
      if (this.flagUp == true) {
        this.up(v);
      } else {
        this.down(v);
      }
    },
    up(v) {
      if (v == "last") {
        this.tableData.sort(function(a, b) {
          return parseInt(a.now) - parseInt(b.now);
        });
      }
      if (v == "now") {
        this.tableData.sort(function(a, b) {
          return parseInt(a.now) - parseInt(b.now);
        });
      }
      if (v == "large") {
        this.tableData.sort(function(a, b) {
          return parseInt(a.large) - parseInt(b.large);
        });
      }
      if (v == "price") {
        this.tableData.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      }
    },
    down(v) {
      if (v == "last") {
        this.tableData.sort(function(a, b) {
          return parseInt(b.last) - parseInt(a.last);
        });
      }
      if (v == "now") {
        this.tableData.sort(function(a, b) {
          return parseInt(b.now) - parseInt(a.now);
        });
      }
      if (v == "large") {
        this.tableData.sort(function(a, b) {
          return parseInt(b.large) - parseInt(a.large);
        });
      }
      if (v == "price") {
        this.tableData.sort(function(a, b) {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      }
    }
  }
};

function insertAfter(newElement, targetElement) {
  // newElement是要追加的元素 targetElement 是指定元素的位置
  var parent = targetElement.parentNode; // 找到指定元素的父节点
  if (parent.lastChild == targetElement) {
    // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
    parent.appendChild(newElement, targetElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
</script>