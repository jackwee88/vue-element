<template>
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
        <span class="btn" @click="scoreTocash()">确认提现</span>
      </p>
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
