<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>

        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="on"
          class="name-reg"
          placeholder="请输入手机号"
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
          placeholder="password"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="code" />
        </span>
        <el-input
          name="code"
          :type="text"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.code"
          autocomplete="on"
          placeholder="请输入邀请码"
        />
        <span class="show-pwd" @click="showPwd">
          <!-- <svg-icon icon-class="" /> -->
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px;"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >提交</el-button>
      <span class="gotoLogin" @click="gotoLogin">已有账号，前往登录 >></span>
    </el-form>

    <el-dialog title="123" :visible.sync="showDialog" append-to-body>
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
// 获取地址栏 painting_id
function getQueryVariable(variable) {
  var urls = window.location.href.split("?");

  if (urls.length > 1) {
    var query = urls[1];

    console.log(query);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
  return false;
}
// 调用方法

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!isvalidUsername(value)) {
      if (!value) {
        callback(new Error("用户名不合法，请重新输入"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        code: [{ trigger: "blur" }]
      },
      passwordType: "password",
      loading: false,
      showDialog: false,
      text: "请输入邀请码"
    };
  },
  created() {
    var code = getQueryVariable("code");
    if (code) {
      this.loginForm.code = code;
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
      this.loading = true;

      var myreg = /^[1][3,4,5,7,8,9,6][0-9]{9}$/;
      if (!myreg.test(this.loginForm.username)) {
        this.loading = false;
        this.$notify({
          title: "注册失败",
          message: "请输入正确的手机号"
        });
      } else {
        // this.loginForm.username =  + this.loginForm.username;
        // var obj = this.loginForm
        // obj.username = "zyyc"+ this.loginForm.username;
        if (this.loginForm.code == "") {
          this.loading = false;
          this.$notify({
            title: "注册失败",
            message: "请输入邀请码"
          });
          return false;
        }
        this.$axios({
          method: "post",
          url: this.url + "user/register",
          params: {
            username: "zyyc" + this.loginForm.username,
            password: this.loginForm.password,
            code: this.loginForm.code
          }
        }).then(res => {
          if (res.data.code == 0) {
            const h = this.$createElement;
            this.loading = false;
            this.$notify({
              title: "注册失败",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
          } else {
            this.loading = false;
            var that=this
            localStorage.setItem("token", res.data.data.userinfo.token);
            const h = this.$createElement;
            that.$notify({
                  title: "",
                  message: h(
                    "i",
                    { style: "color: teal" },
                    "将为您跳到下载页面"
                  )
                });
                setTimeout(function() {
                  that.$router.push({ path: "/download" });
                }, 1000);

            // sessionStorage.setItem("pay", res.data.data.userinfo.vip);
            // this.$router.push({ path: "/editmsg" });
            
          }
        });
      }

      // if(this.loginForm.username.indexOf('zyyc')==-1){
      //   this.loading = false;
      //     this.$notify({
      //       title: "注册失败",
      //       message: h("i", { style: "color: teal" }, '用户名请以"zyyc"开头')
      //     });
      // }
    },
    gotoLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="less">
.name-reg {
  position: relative;
  padding: 0 15px;
}
.name-reg::before {
  content: "zyyc";
  position: absolute;
  top: 0px;
  left: 0;
  color: #fff;
  text-align: center;
  height: 47px;
  line-height: 48px;
}
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
  .gotoLogin {
    float: right;
    color: #fff;
  }
}
</style>
