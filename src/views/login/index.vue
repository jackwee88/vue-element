<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      v-if="centerDialogVisible==false"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="account">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          name="account"
          type="text"
          v-model="loginForm.account"
          autocomplete="on"
          placeholder="请输入账号"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          name="password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autocomplete="on"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >提交</el-button>
        <span class="reset" @click="resetpassword">忘记密码</span>
      <span class="gotoReg" @click="gotoReg">还没账号,前往注册 >></span>
      
    </el-form>
    
    <el-dialog title="123" :visible.sync="showDialog" append-to-body>
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="80%"
      style=";max-height: 90vh;overflow: auto;"
      center
    >
      <span>{{legal}}</span>
      <p>
        <el-checkbox v-model="checked" @change="agren">我同意并遵守本法律声明</el-checkbox>
      </p>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="sureLogin">同意并登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("您的密码需大于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      centerDialogVisible: false, // 法律声明是否出现
      legal: "",
      title: "",
      checked: false
    };
  },
  mounted() {
    if (localStorage.getItem("BCUSER")) {
      this.loginForm.account = localStorage.getItem("BCUSER");
    }
    if (localStorage.getItem("BCPASSWORD")) {
      this.loginForm.password = localStorage.getItem("BCPASSWORD");
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      var that = this;
      console.log(this.checked);

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: this.url + "user/getLegal",
            params: {}
          }).then(res => {
            localStorage.setItem("BCUSER", this.loginForm.account);
            localStorage.setItem("BCPASSWORD", this.loginForm.password);
            that.legal = res.data.data.value;
            that.title = res.data.data.desc;
            that.centerDialogVisible = true;
          });
        } else {
          return false;
        }
      });
    },
    // 点击同意法律条款后进行登录
    sureLogin() {
      var that = this;
      if (this.checked == false) {
        const h = this.$createElement;

        this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, "请先同意本法律声明")
        });
        return;
      }
      this.centerDialogVisible = false;
      this.loading = true;

      this.$axios({
        method: "post",
        url: this.url + "user/login",
        params: this.loginForm
      }).then(res => {
        that.loading = false;
        if (res.data.code == 1) {
          localStorage.setItem("token", res.data.data.userinfo.token);
          that
            .$axios({
              method: "post",
              url: this.url + "user/userInfo",
              params: { token: localStorage.getItem("token") }
            })
            .then(ress => {
              if (!ress.data.data.bank) {
                const h = this.$createElement;

                that.$notify({
                  title: "",
                  message: h(
                    "i",
                    { style: "color: teal" },
                    "您还未填写资料，即将为您跳转"
                  )
                });
                setTimeout(function() {
                  that.$router.push({ path: "/editmsg" });
                }, 3000);
              } else {
                const h = this.$createElement;

                that.$notify({
                  title: "",
                  message: h("i", { style: "color: teal" }, "登录成功")
                });
                setTimeout(function() {
                  that.$router.push({ path: "/user" });
                }, 2000);
              }
              // if (ress.data.data.vip == 1) {
              //   that.$router.push({ path: "/user" });
              // } else {

              //   const h = this.$createElement;

              //   that.$notify({
              //     title: "",
              //     message: h("i", { style: "color: teal" }, '您还不是会员，请成为会员后登录')
              //   });
              //   // that.$router.push({ path: "/pay" });
              // }
              //
            });
        } else {
          const h = this.$createElement;

          that.$notify({
            title: "",
            message: h("i", { style: "color: teal" }, res.data.msg)
          });
        }
      });
    },
    // 去注册
    gotoReg() {
      // window.location.href='http://my.xutavip.com/third/connect/wechat';
      // return;
      this.$router.push({ path: "/reg" });
    },
    resetpassword() {

      this.$router.push({path:'/resetpassword'});
    },
    // 是否勾选法律条款
    agren() {
      this.checked = this.checked;
    }
  }
};
</script>

<style lang="less">
@bg: #2d3a4b;
@light_gray: #eee;
.borderRadio(@value: 10px) {
  -webkit-border-radius: @value;
  -moz-border-radius: @value;
  -ms-border-radius: @value;
  -o-border-radius: @value;
  border-radius: @value;
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: @bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    max-width: 520px;
    width: 83%;
    padding: 35px;
    margin: 120px auto;
    background-color: #3d5e8a;
    .borderRadio(8px);
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 9px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: #000;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      color: #fff;
      text-indent: 20px;
      letter-spacing: 10px;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

.gotoReg {
  float: right;
  color: #fff;
  
}
.reset{
float: left;
color: #ffffff;
text-decoration: underline;
}
</style>
