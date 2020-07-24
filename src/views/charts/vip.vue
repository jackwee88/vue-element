 <template>
  <div class="body" id="body" :style="'height:' + windowHeight + 'px'">
    <div class="avatar-item">
      <img src="../../utils/timg.jpg" class="avatar" />
      <div class="avatar-right">
        <div>{{userinfo.username}}</div>
        <div>可用积分:{{userinfo.score}}</div>
      </div>
    </div>
    <div>
      <p style="font-size:18px;font-weight:bolder">购买套餐</p>
      <div class="choose-item">
        <span class="top">{{vipdata.name}}</span>
        <!-- <div style="font-size:14px">1个彩种</div> -->
        <div style="font-weight:bolder;height:100px;line-height:65px">
          <span style="font-size:28px;">{{vipdata.vip_price}}</span>.0元
        </div>
        <!-- <div class="line">599.0</div> -->
        <span class="bottom">√</span>
      </div>
      <div class="button" @click="openScoreVip()">开通</div>
      <!-- <div class="desc">加入VIP赠送模拟币：月度送1万</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "vip",
  data() {
    return {
      windowHeight: "",
      userinfo: {},
      vipdata: {}
    };
  },
  created() {
    var windowHeight = document.body.clientHeight;
    this.windowHeight = windowHeight - 50;
  },
  mounted() {
    this.getVip();
  },
  methods: {
    openScoreVip() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "user/openScoreVip",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        const h = this.$createElement;
        if (res.data.code == 1) {
        } else {
          this.$notify({
            title: "",
            message: h(
              "i",
              { style: "color: teal" },
              "积分不足抵扣当月会员，将为您直接跳转到支付页面"
            )
          });
          setTimeout(() => {
        this.$router.push({ path: "/pay" });
      }, 2000);
        }
      });
      
    },
    getVip() {
      this.$axios({
        method: "post",
        url: this.url + "user/vip",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        this.userinfo = res.data.data.userdata;
        this.vipdata = res.data.data.vipdata;
      });
    }
  }
};
</script>

<style scoped>
.desc {
  color: #999;
  font-size: 14px;
  padding-left: 20px;
}
.bottom {
  position: absolute;
  bottom: -20px;
  right: -20px;
  padding: 10px;
  border-radius: 25px;
  background-color: rgb(243, 83, 55);
  color: white;
  width: 50px;
  height: 50px;
  text-align: left;
}
.avatar-right {
  margin-left: 20px;
}
.choose-item {
  width: 130px;
  height: 130px;
  border-radius: 5px;
  border: 1px solid rgb(153, 153, 153, 0.5);
  position: relative;
  overflow: hidden;
  background-color: rgb(245, 222, 179, 0.3);
  padding-top: 30px;
  text-align: center;
  align-items: center;
}
.choose-item div {
  padding: 2px 0;
}
.avatar-right div {
  padding: 5px;
  width: 250px;
}
.body {
  padding: 10px 20px;
  background-color: #fff;
  height: 100%;
  /* background-image: url('../../utils/bg.jpg'); */
  background-size: cover;
}
.avatar-item {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 25px;
  background-color: pink;
}
.line {
  text-decoration: line-through;
  color: #999;
  font-size: 18px;
}
.top .bottom {
  display: inline-block;
}
.top {
  background-color: #304156;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 10px;
  border-radius: 0 0 10px 0;
}
.button {
  margin: 15px 0;
  background-color: #304156;
  height: 40px;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  width: 325px;
}
</style>