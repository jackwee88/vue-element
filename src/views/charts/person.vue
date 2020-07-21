<template>
  <div class="person">
    <header>
      <span>学员中心</span>
      <span>修改资料</span>
    </header>
    <div class="person-info">
      <div class="mine">我的个人资料</div>
      <el-form
        label-position="top"
        label-width="80px"
        :model="formLabelAlign"
        autocomplete="on"
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="学员编号" prop="number">
          <el-input
            v-model="formLabelAlign.id"
            name="number"
            type="text"
            autocomplete="on"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="学员姓名" prop="username">
          <el-input
            v-model="formLabelAlign.username"
            name="username"
            type="text"
            autocomplete="on"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_num">
          <el-input
            v-model="formLabelAlign.id_num"
            name="id_num"
            type="text"
            autocomplete="on"
            placeholder="请输入身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input
            v-model="formLabelAlign.phone"
            name="phone"
            type="text"
            autocomplete="on"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行卡" prop="num">
          <el-input
            v-model="formLabelAlign.num"
            name="num"
            type="text"
            autocomplete="on"
            placeholder="请输入银行卡号"
          ></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="open_bank">
          <el-input
            v-model="formLabelAlign.open_bank"
            name="open_bank"
            type="text"
            autocomplete="on"
          ></el-input>
        </el-form-item>
        <!-- <div class="time">第一次登录时间：2019-10-25 05:25</div> -->
      </el-form>

      <el-form>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="onSubmit(formLabelAlign)">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import validates from "@/utils/validate";

export default {
  name: "person",
  data() {
    // 手机号验证
    var phone = (rule, value, callback) => {
      let regFormat = /^[1][3456789][0-9]{9}$/; //正确手机号
      if (!value) {
        return callback(new Error("不能为空"));
      }
      if (!regFormat.test(value)) {
        callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    // 身份证号验证
    var ID = (rule, value, callback) => {
      let IDFormat = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/; //正确身份证号
      if (!value) {
        return callback(new Error("不能为空"));
      }
      if (!IDFormat.test(value)) {
        callback(new Error("请输入正确身份证号"));
      } else {
        callback();
      }
    };
    return {
      formLabelAlign: {},
      rules: {
        number: [{ trigger: "blur" }],
        username: [{ trigger: "blur" }],
        id_unm: [{ trigger: "blur", validator: ID }],
        phone: [{ trigger: "blur", validator: phone }],
        open_bank: [{ trigger: "blur" }]
      }
    };
  },

  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/userInfo",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.formLabelAlign = res.data.data.bank;
        console.log(that.formLabelAlign);
      });
    },
    onSubmit(formLabelAlign) {
      console.log(formLabelAlign);

      var that = this;

      var obj = {
        username: this.formLabelAlign.username,
        bank: this.formLabelAlign.bank,
        num: this.formLabelAlign.num,
        phone: this.formLabelAlign.phone,
        open_bank: this.formLabelAlign.open_bank,
        id_num: this.formLabelAlign.id_num,
        token: localStorage.getItem("token")
      };

      this.$axios({
        method: "post",
        url: this.url + "money/userBankEdit",
        params: obj
      }).then(res => {
        console.log(res.data.code);

        const h = this.$createElement;
        that.loading = false;
        that.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, res.data.msg)
        });

        location.reload();
      });
    }
  }
};
</script>

<style scoped>
.person {
  padding: 20px;
}
.person-info {
  background-color: #fff;
  margin-top: 2%;
  border-top: 5px solid #4187bd;
}
.person header span {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}
.person header span:last-child {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 5px;
}
.mine {
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  font-size: 16px;
  color: #666;
}
.el-form {
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
}
.el-form-item__label {
  line-height: 0px;
}
.time {
  font-size: 14px;
  margin-bottom: 15px;
}
</style>
