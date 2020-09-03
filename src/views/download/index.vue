<template>
  <div class="chart-container" :style="'height:' + windowHeight + 'px'">
     <p style="padding-left:10px">
      <span class="title-one" style="font-size:20px">下载app</span>
    </p>
    <div class="box-big">
      <div class="url-box">
        <div style="padding-left:10px" class="qrcode">
          <div style="padding:10px">
            <div style="font-size:20px">请使用浏览器扫描二维码下载App,如遇二维码失效，请点击下方链接下载</div>
          </div>
          <img
            src="../../utils/code.png"
            width="200px"
            height="200px"
            style="margin-left:10px;"
          />
          <a href="http://d.7short.com/zb4y" style="font-size:20px;color: #FF0000">http://d.7short.com/zb4y</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script>
export default {
  name: "qrcode",
  data() {
    return {
      windowHeight: "",
      windowWidth: ""
    };
  },
  created() {
    // this.vip();
    // this.getCode();
    var windowHeight = document.body.clientHeight;
    var windowWidth = document.body.clientWidth;
    this.windowHeight = windowHeight;
    this.windowWidth = windowWidth;
  },

  mounted() {
   
  },
  
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  /* background: url("../../utils/bg.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
}
.qrcode {
  width: 100%;
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.box-big {
  /* border-top: 4px solid #4187bd; */
  position:absolute;
  width:100%;
  height: 88vh;
  left:0
}
.url-box {
  margin-top: 8px;
  width: 400px;
  flex-wrap: wrap;
  margin: 0 auto;
  text-align: center;
}
</style>
