<template>
  <div class="chart-container" :style="'height:' + windowHeight + 'px'">
    <p style="padding-left:10px">
      <span class="title-one">下载app</span>
    </p>
    <div class="box-big">
      <div class="url-box">
        <div style="padding-left:10px" class="qrcode">
          <div style="padding:10px">
          <a href="http://d.7short.com/zb4y">http://d.7short.com/zb4y</a>
            <div>如二维码实效，请点击链接下载app</div>
          </div>
          <img
            src="../../utils/code.png"
            width="150px"
            height="150px"
            style="margin-left:10px"
          />
          
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
  methods: {
    draw() {
		// 这里可以添加一个loading
		//console.log('123')
		let qrImg = new Image()  // 创建二维码图片对象
		qrImg.src = this.info.url  // 二维码 base64 链接码

		let goodsImg = ''
		goodsImg =  document.querySelector('.goodsImg')
		goodsImg.src = this.info.goodsImg  // 网络图片地址

		// 开始绘制
		goodsImg.onload = () => {
			let canvas = document.getElementById('mycanvas')
			let ctx = canvas.getContext('2d', {
                 antialias: true  // 是画质更清晰  其他配置可以参考文档
            })
			
			// 绘制价格
			ctx.fillStyle = '#E85700'  // 设置字体颜色
            ctx.font = '24px PingFang SC'  // 字体、字体大小
            ctx.fillText('￥', 50, 720)  // 文字内容和位置  相当于绝对定位left 和top值  定位参照位置是canvas区域左上角
            ctx.font = '36px PingFang SC'
            ctx.fillText(`${this.info.sharePrice1}${this.info.sharePrice2}`, 75, 720)  // 价格涉及到小数点，所以对价格做了处理，拼在一起是一个完整的价格
            ctx.fillStyle = 'rgba(153,153,153,1)'   // 切换颜色 绘制原价
            ctx.font = '24px PingFangSC-Regular,PingFang SC'
            ctx.fillText(`原价：￥${this.info.afterPrice1}${this.info.afterPrice2}`, 220, 720)
			
			// 绘制标题
			ctx.fillStyle = 'rgba(0, 0, 0, 1)'
			ctx.font = '36px PingFangSC-Regular,PingFang SC'
			let first = this.autoAddEllipsis(this.info.title, 28)
			ctx.fillText(first, 50, 780)
			let second = this.info.title.substr(first.length)
			let strSecond = this.autoAddEllipsis(this.info.title.substr(first.length), 26)

			if (second == strSecond) {
				ctx.fillText(second, 50, 830)
			} else {
				ctx.fillText(strSecond + '...', 50, 830)
			}
			
			// 绘制提示语
			ctx.fillStyle = 'rgba(153,153,153,1)'
			ctx.font = '24px PingFangSC-Regular,PingFang SC'
			ctx.fillText('长按或扫描查看', 232, 1110)

			ctx.drawImage(qrImg, 211, 872, 209, 209)  
			ctx.drawImage(proImg, 0, 0, 650, 650) 
			let Url = document.getElementById('mycanvas').toDataURL('image/png')  // 转base64
			document.querySelector('.postImg').src = Url  
			
			qrImg.onload = () => {
				ctx.drawImage(qrImg, 211, 872, 209, 209)
				ctx.drawImage(proImg, 0, 0, 650, 650)
				let Url = document.getElementById('mycanvas').toDataURL('image/png')
				document.querySelector('.postImg').src = Url
			}
    }
    },
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
      var img = $(".box")
        .children("img")
        .attr("src");
      //console.log(img);
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
  /* background: url("../../utils/bg.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
}
.qrcode {
  width: 100%;
  padding-left: 20px;
  text-align: left;
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
