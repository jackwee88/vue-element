<template>
  <div class="moneyC">
    <div style>
      <header>
        <span class="title-one">学员中心</span>
        <span class="title-sec">资金计算器</span>
      </header>

      <div class="content-phone">
        <div class="text" style="font-size:18px;">智能推荐</div>
      </div>

      <div class="content">
        <div class="text">资金计算器</div>
        <div style="display:flex;justify-content:center;width:100%;" class="box-phone"></div>
      </div>
    </div>
    <div class="table-wrap">
      <ul>
        <li class="setting">参数设置</li>
        <li>
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <div class="money-box">
              <el-form-item label="金额" prop="money">
                <el-input v-model="ruleForm.money" type="number" min="1"></el-input>
              </el-form-item>
              <el-form-item label="注数" prop="num">
                <el-input v-model="ruleForm.num" type="number" min="1"></el-input>
              </el-form-item>
              <el-form-item label="奖金" prop="bonus">
                <el-input v-model="ruleForm.bonus" type="number" min="1"></el-input>
              </el-form-item>
            </div>
            <div class="sec-box">
              <el-form-item label="起始倍数" prop="onsetMultiple">
                <el-input v-model="ruleForm.onsetMultiple"></el-input>
              </el-form-item>
              <el-form-item label="全程追号" prop="fullTrackNumber">
                <el-input v-model="ruleForm.fullTrackNumber" type="number" min="1"></el-input>
              </el-form-item>
            </div>

            <el-form-item prop="resource" class="radio-wrap">
              <el-radio-group v-model="ruleForm.resource" @change="type">
                <div class="radio-box">
                  <el-radio label="1">利润 ≥</el-radio>
                  <el-input v-model="ruleForm.profit" type="number" min="1"></el-input>
                  <el-radio label="2">
                    隔
                    <el-input v-model="ruleForm.multiple" type="number" min="1"></el-input>
                    <span class="texts">倍数*2</span>
                  </el-radio>
                </div>
                <div class="radio-box">
                  <el-radio label="3">利润率 ≥</el-radio>
                  <el-input v-model="ruleForm.profit1" type="number" min="1"></el-input>
                  <el-radio label="4">
                    隔
                    <el-input v-model="ruleForm.multiple1" type="number" min="1"></el-input>
                    <span class="texts">倍数+1</span>
                  </el-radio>
                </div>
                <div class="radio-box">
                  <el-radio label="5">全程使用相同倍数</el-radio>
                </div>
              </el-radio-group>
            </el-form-item>

            <el-button type="primary" @click="submitForm('ruleForm')">计算</el-button>
          </el-form>
        </li>
      </ul>

      <table class="gridtable">
        <thead style>
          <tr style>
            <th style="max-width:70px;">追号顺序</th>
            <th>倍数</th>
            <th class="two-row">注数</th>
            <th class="two-row">投入（元）</th>
            <th class="two-row bg-odd">累计（元）</th>
            <th class="two-row bg-zh">中奖（元）</th>
            <th class="two-row bg-zh">利润（元）</th>
            <th class="two-row bg-zh">利润率</th>
          </tr>
        </thead>
        <tbody style>
          <template v-for="(item,key) in tableData">
            <tr
              class="sec-body"
              :style="item.id==curId?'height:32vh position:relative':'position:relative'"
            >
              <td>{{item.id}}</td>
              <td>{{item.multiple}}</td>
              <td>{{item.injection_number}}</td>
              <td>{{item.investment}}</td>
              <td>{{item.cumulative}}</td>
              <td>{{item.winning}}</td>
              <td>{{item.profit}}</td>
              <td>{{item.profit_margin}}</td>
            </tr>
          </template>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* 计算 */
ul {
  width: 98%;
  margin: 0 auto 20px !important;
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
  padding-left: 5px !important;
}
el-form {
  background-color: #fff;
  border: 1px solid #f5f5f5;
  /* border-bottom: none; */
}
.setting {
  border-top: 2px solid #4187bd;
  border-bottom: 1px solid #f5f5f5;
  height: 35px;
  line-height: 34px;
}
.el-button--primary {
  width: 90%;
  margin: 5px auto;
  display: block;
}
.texts {
  position: relative;
  right: 18px;
}
.radio-box {
  display: flex;
  margin-bottom: 4px;
  align-items: center;
}
.money-box,
.sec-box,
.radio-box {
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  align-items: center;
}
.radio-box {
  padding-top: 5px;
  padding-bottom: 8px;
}
ul,
li {
  margin: 0;
  list-style: none;
  padding: 0;
}
/*  */
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
  border-top: 5px solid #4187bd;
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
  .table-wrap {
    display: flex;
    flex-direction: row-reverse;
  }
  .gridtable {
    width: 70%;
  }
  ul {
    width: 25%;
    margin-left: 2%;
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
  /* min-width: 100%; */
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
//console.log($);

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

      ruleForm: {
        money: 2,
        num: 112,
        bonus: 540,
        onsetMultiple: 1, //起始倍数
        fullTrackNumber: 3, //全程追号
        resource: "1",
        profit: 100, //利润
        multiple: 5, //倍数
        profit1: 10, //利润
        multiple1: 5 //倍数
      },

      expandKeys: [] /** 新增 **/,

      expands: [],
      curId: "",
      flag: true, //用来判断点击同一个图标的张开和收起
      flagUp: false //用来控制点击文字是进行升序还是降序的处理
    };
  },
  components: { Chart },
  created() {
    // this.cate();
  },
  methods: {
    //点击单选按钮
    type(v) {
      //console.log(v);
      //console.log(this.ruleForm.resource);
    },
    //点击提交按钮
    submitForm(formName) {
      var obj = {
        money: this.ruleForm.money, //金额
        injection_number: this.ruleForm.num, //注数
        reward: this.ruleForm.bonus, //奖金
        times: this.ruleForm.onsetMultiple, //起始倍数
        tracking: this.ruleForm.fullTrackNumber, //追号
        type: this.ruleForm.resource,
        token: localStorage.getItem("token") // 类型
      };
      if (this.ruleForm.resource == 1) {
        obj.profit = this.ruleForm.profit;
      } else if (this.ruleForm.resource == 3) {
        obj.profit_margin = this.ruleForm.profit1;
      } else if (this.ruleForm.resource == 2) {
        obj.multiple = this.ruleForm.multiple;
      } else if (this.ruleForm.resource == 4) {
        obj.plus = this.ruleForm.multiple1;
      }

      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/calculator",
        params: obj
      }).then(res => {
        that.tableData = res.data.data;
      });

      // this.$refs[formName].validate(valid => {

      // });
    },

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
    }
  }
};
</script>