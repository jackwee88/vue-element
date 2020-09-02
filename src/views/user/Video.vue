<template>
  <div class="table-container index">
    <p style="padding-left:10px">
      <span class="title-one">学员中心</span>
      <span class="title-sec">视频教学</span>
    </p>
    <div style=" overflow-y: auto;height:40rem">
      <div :key="index" v-for="(item,index) in video" style="mragin-bottom:10px;margin-left:2rem;">
        <p style>{{index+1}}.{{item.title}}</p>
        <video-player
          class="video-player-box ovideo"
          ref="videoPlayer"
          :options="playerOptions[index]"
          :playsinline="true"
          style=" width:20rem;height:10rpx"
        ></video-player>
      </div>
    </div>
    <!-- <div v-for="(item,i) in video" :key="i" style="margin-bottom: 30px">
        <p>{{item.title}}</p>
      <video :id="'myVideo'+item.id" class="video-js" autoplay="autoplay">
        <source :src="item.video">
      </video>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "video",

  data() {
    return {
      video: {},

      playerOptions: []
    };
  },
  mounted() {},
  created() {
    this.getUrl();
  },

  methods: {
    getUrl(val) {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/video",
        params: {
          token: localStorage.getItem("token")
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(res => {
        that.video = res.data.data;

        //console.log(that.video);
        for (let i of that.video) {
          //console.log(999);
          let arrStr = {
            //         playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
            //   autoplay : false, //如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            //   loop : false, // 视频一结束就重新开始。
            //   preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: "zh-CN",
            //   aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            //   fluid : true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                type: "video/mp4",
                src: i.video
              }
            ],

            //   poster : "../../common/img/Loading/background.png", //你的封面地址
            // width: document.documentElement.clientWidth / 3,
            // height: document.documentElement.clientWidth / 9,
            notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            controlBar: {
              timeDivider: false, //当前时间和持续时间的分隔符
              durationDisplay: true, //显示持续时间
              remainingTimeDisplay: false, //是否显示剩余时间功能
              fullscreenToggle: true //全屏按钮
            }
          };
          that.playerOptions.push(arrStr);
        }
        // that.$previewRefresh()
        //console.log(that.playerOptions);
        // that.initVideo();
        // playerOptions.sources.src=res.data.data.video
      });
    }
  }
};
</script>

<style lang="less" scoped>
//label复选框
video {
  width: 100%;
  height: 4rem;
}
.block {
  display: inline-block !important;
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
  width: 99%;
  margin: 0 auto;
  min-height: 88vh;
}
.type {
  display: flex;
  // flex-direction: column;
  min-height: 60px;
  // align-items: center;
  justify-content: flex-start;
  // flex-wrap: wrap;
}
.type > div {
  display: flex;
  // align-items: center;
}

.type-title {
  // margin-right: 4px;
  font-size: 14px;
  width: 75px;
  margin: 5px 0;
}
.bottom-type-box {
  display: flex;
  padding-right: 50px;
  justify-content: space-between;
}

.generating-number-box {
  width: 100%;
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
}
.base-num {
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding-top: 18px;
  padding-bottom: 18px;
}
.base-num span {
  margin-right: 4px;
}
.clears,
.clears-two {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  background-color: lightskyblue;
  color: #fff;
  font-size: 6px;
  // padding: 1px;
  position: absolute;
  right: 10px;
  justify-content: center;
  // bottom: 7px;
  display: flex;
  align-items: center;
}
.clears-two {
  height: 25px;
  bottom: 6px;
}
.show-num .el-checkbox {
  width: 40px;
}
textarea {
  width: 80vw;
  margin: 0 8px 0 10px;
  border: 0.5px solid #f5f5f5;
  height: auto;
  min-height: 118px;
  // padding-left:12px;padding-top:8px;padding-bottom:8px;
}
hr {
  border: 1px solid#f5f5f5;
  position: relative;
  width: 100vw;
  right: 10px;
}
.sure-box {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  color: #fff;
  padding-right: 10px;
}
.sure-box p,
.p2 {
  padding: 6px 12px;
}
.sure-box .p1 {
  margin-left: 4px;
  display: inline-block;
  background-color: #4187bd;
  height: auto;
}
.p2 {
  background-color: #4187bd;
  color: #fff;
  margin-right: 10px;
  float: right;
  margin-bottom: 10px;
}
.p2:active,
.copy-todata:active,
.change-type p:active {
  color: yellow;
  transform: scale(0.97);
  -ms-transform: rotate(0.97); /* IE 9 */
  -moz-transform: rotate(0.97); /* Firefox */
  -webkit-transform: rotate(0.97); /* Safari 和 Chrome */
  -o-transform: rotate(0.97); /* Opera */
}
.copy-todata {
  display: inline-block;
  background-color: #44d7b6;
  padding: 3px 5px;
  color: #fff;
}
.change-type p {
  background-color: bisque;
  padding: 5px 0px;
  width: 100px;
  color: grey;
}

.base-color {
  color: #fff;
  background-color: #4187bd;
  width: 20px;
  height: 20px;
  border-radius: 50% 50%;
  padding: 2px;
}
.base-red {
  background-color: red;
}
@media (max-width: 320px) {
  /*0~320*/
  .type {
    flex-direction: column;
    margin-bottom: 14px;
    min-height: 46px;
  }
  .type > div {
    flex-direction: column;
  }
  .box {
    display: flex;
    flex-wrap: wrap;

    // padding-left:13px;
  }
  .base-num {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .base-num-text {
    margin-bottom: 8px;
  }
  .clears {
    height: 20px;
  }
}
.bottom-type-box {
  flex-wrap: wrap;
}
@media (min-width: 321px) and (max-width: 375px) {
  .clears {
    height: 20px;
    bottom: 5px;
  }
  /*321~768*/
  .type {
    flex-direction: column;
    margin-bottom: 14px;
    min-height: 46px;
  }
  .type > div {
    flex-direction: column;
  }
  .box {
    // padding-left:13px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
  .base-num {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .base-num-text {
    margin-bottom: 8px;
  }
  .bottom-type-box {
    flex-direction: column;
  }
}
@media (min-width: 376px) and (max-width: 425px) {
  .clears {
    height: 20px;
    bottom: 5px;
  }
  /*376~425*/
  .type {
    flex-direction: column;
    margin-bottom: 14px;
    min-height: 46px;
  }
  .type > div {
    flex-direction: column;
  }
  .box {
    // padding-left:13px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .base-num {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  .base-num-text {
    margin-bottom: 8px;
  }
  .bottom-type-box {
    flex-direction: column;
  }
}
@media (min-width: 426px) and (max-width: 768px) {
  .clears {
    height: 20px;
    bottom: 5px;
  }
  /*426~768*/
  .type {
    flex-direction: row;
  }
  .bottom-type-box {
    // flex-direction: column;
  }
}

@media (min-width: 769px) {
  /*769~+∞*/
  .type {
    flex-direction: row;
  }
  .base-num span {
    margin-right: 6px;
  }
  .clears {
    height: 24px;
    top: -4px;
  }
  .show-wrap {
    margin-left: 30px;
  }
}
</style>
