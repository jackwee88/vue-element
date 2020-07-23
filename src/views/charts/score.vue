<template>
<div :style="'height:'+winH">
  <div class="chart-container">
    <p>
      <span class="title-one">个人中心</span>
      <span class="sec-title">积分提现</span>
    </p>
    <div class="box">
      <div class="box-1">
        <p>
          当前可提现积分：
          <span class="price">{{record}}</span>
        </p>
      </div>
      <div class="box-1">
        <p>
          到账账户：
          <span class="price cart-account">{{bank}}</span>
        </p>
      </div>
      <div class="box-input">
        <span>提现积分</span>
        <input type="number" placeholder="请输入您想要提现数量" v-model="num" />
      </div>
      <p>
        <span class="btn" @click="went()">确认提现</span>
      </p>
    </div>

  </div>
      <div class="bg" v-if="visible" @click="visibleChange()" >
      
    </div>
    <div class="modal" v-if="visible">
      <div style="width:100%;height:100%;position:relative;box-sizing:border-box;">
        <div style="padding:10px;font-size:14px;line-height:30px;">
          <div>请核对以下信息，确认无误后点击确认</div>
        <div style="color:#999">银行卡号：{{bank}}</div>
        <div style="color:#999">兑换数量：{{num}}(兑换手续费5%)</div>
        <div style="color:#999">到账时间：7个工作日左右</div>
        </div>
        
        <div class="bottom">
          <span @click="scoreTocash()">确认</span>
          <span @click="visibleChange">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Chart from "@/components/Charts/keyboard";

export default {
  name: "keyboardChart",
  data() {
    return {
      queryMoneys: "",
      bank: "",
      visible:false,
      formInline: {
        money: ""
      },
      record: "",
      num: ""
    };
  },
  // components: { Chart },
  created() {
    this.vip();
    this.getBank();
    this.queryMoney();
    this.getRecord();
     var winH=document.body.clientHeight
    this.winH=winH
  },
  methods: {
    getBank() {
      var that = this;
      that
        .$axios({
          method: "post",
          url: this.url + "user/userInfo",
          params: { token: localStorage.getItem("token") }
        })
        .then(ress => {
          this.bank = ress.data.data.bank.num;
        });
    },
        went(){
      const h = this.$createElement;
      if(this.num==''){
         this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, '请输入兑换数量')
        })
      }else{
        this.visibleChange()
      }
    },
    visibleChange(){
      var visible=this.visible
      this.visible=!visible
    },
    getRecord() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/record",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.record = res.data.data.score;
      });
    },
    scoreTocash() {
      this.$axios({
        method: "post",
        url: this.url + "user/scoreTocash",
        params: { token: localStorage.getItem("token"), score_num: this.num }
      }).then(res => {
        console.log(res.data.msg);
        const h = this.$createElement;
        this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, res.data.msg)
        });
        this.num=''
        this.getRecord()
        this.visibleChange()
      });
    },

    queryMoney() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "money/queryMoney",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.queryMoneys = res.data.data;
        console.log(res.data);
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 8px;
  width: 100%;
  height: 85vh;
}

.title-one {
  color: #333333ff;
  font-size: 18px;
  margin-right: 8px;
}
.sec-title {
  color: #666666ff;
  font-size: 14px;
}
.box {
  background-color: #fff;
  border-top: 4px solid #4187bd;
  height: 70vh;
  padding-left: 30px;
  padding-top: 25px;
  min-width: 200px;
  overflow: auto;
}

.box-1,
.box-input span {
  font-size: 14px;
  color: #333333;
}

.price {
  margin-left: 5px;
}
.bg{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  position: absolute;
  top:0;
  left: 0;
}
.modal{
  width: 300px;
  height: 178px;
  background-color: white;
  position: absolute;
  top:220px;
  left:10%;
  border-radius:10px;
}
.box-input {
  /* margin-top:80px; */
}

input {
  border: 0.5px solid #f5f5f5;
  padding: 8px 16px;
  margin-left: 6px;
}

.btn {
  background-color: #4187bd;
  color: #fff;
  padding: 2px 8px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  margin-left: 144px;
  margin-top: 60px;
}
.bottom{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid rgb(202, 198, 198);
  box-sizing: border-box;
}
.bottom span{
  display: inline-block;
  width: 49%;
  text-align: center;
}
.bottom span:nth-child(1){
  background-color: rgb(29, 108, 167);
  border-radius: 0 0 0 10px;
  color: white;
}
@media (max-width: 320px) {
  /*0~320*/
  .cart-account,
  input {
    margin-top: 10px;
    margin-left: 0;
  }
}
@media (min-width: 321px) and (max-width: 375px) {
  /*321~768*/
  .cart-account,
  input {
    margin-top: 10px;
    margin-left: 0;
  }
}
@media (min-width: 376px) and (max-width: 425px) {
  /*376~425*/
  .cart-account,
  input {
    margin-top: 10px;
    margin-left: 0;
  }
}
@media (min-width: 426px) and (max-width: 768px) {
  /*426~768*/
  .cart-account,
  input {
    margin-top: 10px;
    margin-left: 0;
  }
}

@media (min-width: 769px) {
  /*769~+∞*/
}
</style>
