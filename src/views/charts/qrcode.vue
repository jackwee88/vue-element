<template>
  <div class="chart-container" :style="'height:' + windowHeight + 'px'">
      <canvas id="aa"  width="370px" :height="windowHeight + 'px'" style="display: none;;"></canvas>
    <div class="box-big">
      <div class="url-box">
        <div style="padding:10px 0" class="qrcode">
          <img src="../../utils/timg.jpg" width="150px" height="150px" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "qrcode",
  data() {
    return {
      windowHeight:''
    };
  },
  created() {
    // this.vip();
    // this.getCode(); 
    var windowHeight=document.body.clientHeight
      this.windowHeight=windowHeight-50
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
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 85vh;
  background: url("../../utils/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.qrcode {
  position: absolute;
  width: 100%;
  bottom: 105px;
  text-align: center;
}

.box-big {
  /* border-top: 4px solid #4187bd; */
  padding-left: 8px;
  height: 88vh;
  padding-top: 10px;
}
.url-box {
  margin-top: 8px;
  width: 100%;
  /* display: flex; */
  flex-wrap: wrap;
}
</style>
