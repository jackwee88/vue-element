<template>
  <div class="container">
    <div class="title">
      <!-- <span>会员充值</span> -->
    </div>
    <div style="text-align:center;">
      <!-- <div class="money">
        会员价:
        <span>{{money}}元</span>
      </div>-->
      <!-- <span class="pay"  @click="handelPay" v-if="ifPc==false">立即充值</span>
      <span class="pay"  @click="payOrder" v-if="ifPc">立即充值</span>-->
      <!-- <span>支付功能暂未开放</span> -->
      <br />
      <!-- <span class="enter"  @click="enter" style="font-size:20px;color:pink">直接进入系统</span> -->
    </div>

    <div v-if="ifPc">
      <div class="code-img" v-if="closeImg">
        <img src alt />
        <span class="el-icon-close" @click="close"></span>
      </div>
    </div>

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
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span v-html="legal">{{legal}}</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="surePay">支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "pay",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("Please enter the correct user name"));
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
      money: "",
      closeImg: false,
      ifPc: false, //判断是手机还是pc
      wechatpayType: false, //判断是否是微信浏览器
      legal: "",
      title: "",
      showDialog: false,
      centerDialogVisible: false //法律声明是否出现
    };
  },
  // beforeCreate(){
  //   window.location.replace("http://xy.zyyccppx.com/?#/pay")
    
  // },
  created() {
    this.getVipPrice();
    this.getPay();
    if (this._isMobile()) {
      this.ifPc = false;
      // alert("手机端");
      // this.$router.replace('/m_index');
    } else {
      this.ifPc = true;

      // this.$router.replace('/pc_index');
    }
    this.wechatpayType = this._isWeixn();

  },
  methods: {
    getPay() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/getPay",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        console.log(res.data.data);
        that.legal = res.data.data.value;
        that.title = res.data.data.desc;
        that.centerDialogVisible = true;
      });
    },
    surePay() {
      window.location.href =
        "http://www.zyyccppx.com/api/order/placeOrder?token=" +
        localStorage.getItem("token");
    },
    getVipPrice() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "money/getVipPrice",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        console.log(res.data.data);
        that.money = res.data.data;
      });
    },
    //App.vue
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    //判断是否微信
    _isWeixn() {
      var ua = navigator.userAgent.toLowerCase();
      console.log(ua);
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "wxpay";
      } else {
        return "wxpay_php";
      }
    },

    //网页微信支付
    payOrder() {
      this.$axios(this.url + "/pay/generalQRCode", {
        sessionId: this.sessionId,
        userId: localStorage.getItem("userId")
      })
        .then(res => {
          if (res.data.code === 0) {
            const pay_params = res.data.data;
            if (typeof WeixinJSBridge === "undefined") {
              if (document.addEventListener) {
                document.addEventListener(
                  "WeixinJSBridgeReady",
                  this.onBridgeReady,
                  false
                );
              } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
                document.attachEvent(
                  "onWeixinJSBridgeReady",
                  this.onBridgeReady
                );
              }
            } else {
              this.onBridgeReady(pay_params);
            }
          } else {
            alert("微信支付调起失败！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  onBridgeReady(params) {
    //     var that = this
    //     WeixinJSBridge.invoke(
    //       'getBrandWCPayRequest', {
    //         "appId": params.appId,  //公众号名称，由商户传入
    //         "timeStamp": params.timeStamp, //支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //         "nonceStr": params.nonceStr,  //支付签名随机串，不长于 32 位
    //         "package": params.package,//统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //         "signType": 'MD5',  //签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //         "paySign": params.sign, //支付签名
    //       },
    //       function (res) {
    //         if (res.err_msg === "get_brand_wcpay_request:ok") {
    //           alert('支付成功！');
    //           that.$router.push({path: '/myOrder'})
    //         } else if (res.err_msg === "get_brand_wcpay_request:fail") {
    //           alert('支付失败！');
    //         }
    //       });
    //   },

    // 关闭pc端的时候的支付二维码
    close() {
      this.closeImg = false;
    },

    //判断是否微信
    // is_weixn(){
    //   var ua = window.navigator.userAgent.toLowerCase();
    //   console.log(ua)
    //   if (ua.match(/MicroMessenger/i) == 'micromessenger'){
    //     return 'wxpay';
    //   } else {
    //     return 'wxpay_php';
    //   }
    // },

    handelPay() {
      console.log(this.wechatpayType);
      if (this.wechatpayType == "wxpay") {
        // console.log("微信内支付")
        let data = {
          amount: this.number
        };
        this.$http.insideWeChatPay(data).then(res => {
          if (res.data.code === 200) {
            this.weChatParameter = res.data.data;
            // console.log(this.weChatParameter,"微信内支付需要参数")
            this.weixinPay();
          } else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 1000
            });
          }
        });
      } else if (this.wechatpayType == "wxpay_php") {
        // console.log("微信外支付")
        let data = {
          amount: this.number
        };
        this.$http.outsideWeChatPay(data).then(res => {
          if (res.data.code === 200) {
            let url = res.data.data;
            window.location.replace(url); //这里是后端返回的URL直接进行跳转即可完成微信外支付
          } else {
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 1000
            });
          }
        });
      }
    },

    //解决微信内置对象报错
    weixinPay(data) {
      var vm = this;
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            vm.onBridgeReady(data),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", vm.onBridgeReady(data));
          document.attachEvent("onWeixinJSBridgeReady", vm.onBridgeReady(data));
        }
      } else {
        vm.onBridgeReady();
      }
    },
    //微信内置浏览器类，weChatParameter对象中的参数是3.步骤代码中从后端获取的数据
    onBridgeReady() {
      var vm = this;
      var timestamp = Math.round(vm.weChatParameter.timeStamp).toString();
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          debug: true,
          appId: vm.weChatParameter.appId, //公众号名称，由商户传入
          timeStamp: timestamp, //时间戳，自1970年以来的秒数
          nonceStr: vm.weChatParameter.nonceStr, //随机串
          package: vm.weChatParameter.package,
          signType: vm.weChatParameter.signType, //微信签名方式：
          paySign: vm.weChatParameter.paySign, //微信签名
          jsApiList: ["chooseWXPay"]
        },
        function(res) {
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            Toast({
              message: "支付成功",
              position: "middle",
              duration: 3000
            });
            vm.number = null;
            vm.$router.go(-1);
            //window.location.href = vm.BASE_URL + 'index.html#/depositResult'
          } else {
            Toast({
              message: "支付失败",
              position: "middle",
              duration: 3000
            });
          }
        }
      );
    },

    enter() {
      this.$router.replace({ path: "/user" });
    }
  }
};
// 在调起支付的页面监听从其他页面返回的事件，进行一些刷新业务逻辑的实现即可，至此微信外支付已经完成。
// document.addEventListener("visibilitychange", function() {
//     //需要的操作
// });
</script>

<style lang="less">
.el-dialog--center {
  background-color: #f5f5f5;
}
.el-icon-close {
  position: absolute;
  top: 4px;
  right: 4px;
}
.title {
  margin: auto;
  width: 100vw;
  text-align: center;
  position: fixed;
  top: 30px;
  left: 0;
  color: #000;
  text-shadow: -1px -1px 0 #fff, 1px 1px 0 #333, 1px 1px 0 #444;
  font-size: 28px;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.money {
  text-align: center;
  margin-bottom: 60px;
}
.money span {
  color: red;
  font-weight: bold;
}

.pay {
  padding: 8px 12px;
  text-align: center;
  color: #fff;
  background-color: #11c448;
  border-radius: 2px;
  display: inline-block;
  margin-top: 30px;
}
.code-img {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 54vw;
  height: 34vh;
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  margin-left: -27vw;
  margin-top: -17vh;
}
.code-img img {
  width: 80%;
  height: auto;
}
</style>
