<template>
  <div class="tuijian">
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
      <el-table
        border
        :data="tableData"
        style="min-width: 100%;text-align: center;"
        id="box"
        stripe
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        @expand-change="tabChange"
      >
        <el-table-column label="号码" prop="show_number" width="100px"></el-table-column>
        <el-table-column label="上次" prop="last" sortable width="54px"></el-table-column>
        <el-table-column label="当前" prop="now" sortable width="54px"></el-table-column>

        <el-table-column label="最大" prop="large" sortable width="54px"></el-table-column>
        <el-table-column label="价值" prop="price" sortable width="54px"></el-table-column>

        <el-table-column type="expand" width="0px" label="图表">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div class="chart-container" data-id="props.row.id">
                <chart height="100%" width="100%"></chart>
              </div>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="content">
      <div class="text">智能推荐</div>
      <div style="display:flex;justify-content:center;width:100%;" class="box-phone">
        <el-table
          border
          :data="tableData"
          style="width: 100vw;text-align: center;"
          id="box"
          stripe
          :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor"
          @expand-change="tabChange"
        >
          <el-table-column label="号码" prop="show_number"></el-table-column>
          <el-table-column label="上次" prop="last" sortable></el-table-column>
          <el-table-column label="当前" prop="now" sortable></el-table-column>

          <el-table-column label="最大" prop="large" sortable></el-table-column>
          <el-table-column label="价格" prop="price" sortable></el-table-column>

          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <div class="chart-container" data-id="props.row.id">
                  <chart height="100%" width="100%" :key="timer"></chart>
                </div>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

#box .active {
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
  /* .el-table__expanded-cell[class*="cell"] {
    height: auto;
    padding: 0;
  } */
}
@media (min-width: 321px) and (max-width: 375px) {
  .top-phone {
    display: block;
  }
  .content-phone {
    display: block;
  }
  /* .el-table__expanded-cell[class*="cell"] {
    height: auto;
    padding: 0;
  } */
}

@media (min-width: 376px) and (max-width: 425px) {
  .top-phone {
    display: block;
  }
  .content-phone {
    display: block;
  }
  /* .el-table__expanded-cell[class*="cell"] {
    height: auto;
    padding: 0;
  } */
}

@media (min-width: 426px) and (max-width: 768px) {
  .top-pc {
    display: block;
  }
  /* .el-table__expanded-cell[class*="cell"] {
    height: auto;
    padding: 0;
  } */
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
        { value: "4", label: "任选4" },
        {
          value: "3",
          label: "任选3"
        }
      ], //任选5等

      value1: "任选5", //任选5等选中的值

      expandKeys: [] /** 新增 **/,

      expands: []
    };
  },
  components: { Chart },
  created() {
    this.vip();
    this.cate();
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
        that.loginForm.caipiaoid = res.data.data[0].id;
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
    tabChange(row, expandedRows) {
      var that = this;
      this.currentView = row.id;
      this.expandedRows = expandedRows;
      var that = this;
      var aBox = document.getElementsByClassName("chart-container");

      sessionStorage.setItem("missed", row.show_number);
      console.log(sessionStorage.getItem("missed"));
      // 点击图表小图标后重新加载图表模板

      if (expandedRows.length > 1) {
        expandedRows.shift();
      }
      this.timer = new Date().getTime();
      console.log(this.timer);
    },
    // 切换任选5等
    caipiaoidChange(v) {
      this.loginForm.caipiaoid = v;
      sessionStorage.setItem("caipiaoid", v);
      this.getData();
    },
    // 切换福建等城市
    TypeChange(v) {
      this.loginForm.type = v;
      sessionStorage.setItem("type", v);
      this.getData();
    },
    // 刷新当前页面
    reload() {
      location.reload();
    },
    //表格行样式
    tableRowStyle({ row, rowIndex }) {
      return "background-color:#F5F5F5;font-size:20px;color:#333;height:60px;border-color:#D7D7D7";
    },
    //表头行样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:#FFE8A9;color:#333;font-size:21px;text-align:center;height:80px;border-color:#D7D7D7";
    }
  },

  clickTable: function(row, column, cell, event) {
    //展开事件日志列表
    if (cell.cellIndex != 3 && cell.cellIndex != 10) {
      this.$refs.refTable.toggleRowExpansion(row);
    }
    this.getnoTicketReason("", row.businessType);
  }
};
</script>