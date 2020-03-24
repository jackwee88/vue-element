<template>
  <div class="chart-container">
    <p>
      <span class="title-one">个人中心</span>
      <span class="sec-title">余额提现</span>
    </p>
    <div class="box">
      <div class="box-1">
        <p>
          当前可提现余额：
          <span class="price">{{queryMoneys}}元</span>
        </p>
      </div>
      <div class="box-1">
        <p>
          到账账户：
          <span class="price cart-account">{{bank}}</span>
        </p>
      </div>
      <div class="box-input">
        <span>提现金额</span>
        <input type="number" placeholder="请输入您想要提现金额" v-model="formInline.money" />
      </div>
      <p>
        <span class="btn" @click="onSubmit">确认提现</span>
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
      }
    };
  },
  // components: { Chart },
  created() {
    this.vip();
    this.getBank();
    this.queryMoney();
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
    onSubmit() {
      var that = this;
      if (parseFloat(this.formInline.money) > parseFloat(this.queryMoneys)) {
        const h = that.$createElement;

        that.$notify({
          title: "提现失败",
          message: h("i", { style: "color: teal" }, "余额不足")
        });
        return;
      }
      if (parseFloat(this.formInline.money) <= 0) {
        const h = that.$createElement;

        that.$notify({
          title: "提现失败",
          message: h("i", { style: "color: teal" }, "请输入合法金额")
        });
        return;
      }

      that.loading = true;
      this.$axios({
        method: "post",
        url: this.url + "money/withdraw",
        params: {
          token: localStorage.getItem("token"),
          money: that.formInline.money
        }
      }).then(res => {
        const h = that.$createElement;
        that.loading = false;
        that.$notify({
          message: h("i", { style: "color: teal" }, res.data.msg)
        });
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
