<template>
  <div class="chart-container" :style="'height:' + windowHeight + 'px'">
    <canvas
      id="aa"
      :width="windowWidth + 'px'"
      :height="windowHeight + 'px'"
      style="display: none;;"
    ></canvas>
    <div class="box-big" style="width: 370px;height: 667px"></div>
    <input
      type="button"
      value="下载画报"
      style="margin-left: 150px;margin-top: 20px;"
      @click="downloadimg()"
    />
    <div class="box-big">
      <div class="url-box">
        <div style="padding:10px 0" class="qrcode">
          <img
            src="../../utils/download.png"
            width="170px"
            height="150px"
            style="padding-left:20px"
          />
          <div>
            <div>1.保存图片至相册</div>
            <div>2.使用浏览器扫描下载</div>
          </div>
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
    var aa = document.getElementById("aa");
    var bb = aa.getContext("2d");

    var imgone = new Image();
    imgone.src = "../../utils/download.png";

    imgone.onload = function() {
      bb.drawImage(imgone, 10, 100, 350, 200);

      bb.fillStyle = "#fff"; // 文字填充颜色
      bb.font = "16px Adobe Ming Std";
      bb.fillText("1.长按保存图片", 170, 420);

      bb.fillStyle = "#fff";
      bb.font = "16px Adobe Ming Std";
      bb.fillText("2.打开浏览器扫一扫", 170, 450);

      bb.fillStyle = "#fff";
      bb.font = "16px Adobe Ming Std";
      bb.fillText("3.注册账号", 170, 480);
      var lineWidth = 0;
      var canvasWidth = aa.width - 50; //计算canvas的宽度
      var initHeight = 400; //绘制字体距离canvas顶部初始的高度
      var lastSubStrIndex = 0; //每次开始截取的字符串的索引
    };

    window.onload = function() {
      var img = this.convertCanvasToImage(aa);
      $(".box").append(img);
      console.log(img);
    };
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
      });
    },
    convertCanvasToImage(canvas) {
      var image = new Image();
      image.src = canvas.toDataURL("image/png");
      return image;
    },
    downloadimg() {
      var img = $(".box").children("img")
        .attr("src");
      var alink = document.createElement("a");
      alink.href = img;
      alink.download = "新年快乐.png";
      alink.click();
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  background: url("../../utils/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.qrcode {
  position: absolute;
  width: 100%;
  bottom: 105px;
  padding-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.box-big {
  /* border-top: 4px solid #4187bd; */
  height: 88vh;
}
.url-box {
  margin-top: 8px;
  width: 100%;
  /* display: flex; */
  flex-wrap: wrap;
}
</style>
