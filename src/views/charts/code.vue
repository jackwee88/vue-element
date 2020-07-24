<template>
  <div class="chart-container">
    <div class="header">
      <span class="title-one">学员中心</span>
      <span class="title-sec">我的邀请链接</span>
    </div>
    <div class="box-big">
      <div class="title-one">我的邀请链接:</div>
      <div class="url-box">
        <span id="myUrl">{{myUrl}}</span>
        <span class="myUrl" @click="copy">点我地址复制</span>
      </div>
      <div style="margin:30px 0">
        <img :src="Qrcode" width="200px" height="200px"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      myUrl: "",
      Qrcode:""
    };
  },
  created() {
    this.vip();
    this.getCode();
  },
  methods: {
    getCode() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/yaoqing",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.myUrl = res.data.data;
        var code1=that.myUrl.split('?')
        var code2=code1[1].split('=')
        var code=code2[1]
        this.Qrcode='http://www.zyyccppx.com/api/index/yaoqing?code='+code
      });
    },
    copy() {
      var Url2 = document.getElementById("myUrl").innerHTML;
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      const h = this.$createElement;

      this.$notify({
        title: "",
        message: h("i", { style: "color: teal" }, "复制成功")
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
#myUrl {
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}
.myUrl {
  padding: 2px 4px;
  background-color: #11c448;
  color: #fff;
  border-radius: 2px;

  font-size: 14px;
}
.header {
  margin-bottom: 20px;
  /* padding-left:10px; */
}
.title-one {
  font-size: 18px;
  color: #333333;
}
.title-sec {
  color: #666666;
  font-size: 14px;
}

.box-big {
  border-top: 4px solid #4187bd;
  padding-left: 8px;
  background-color: #fff;
  height: 88vh;
  padding-top: 10px;
}
.url-box {
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
