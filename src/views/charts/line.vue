<template>
  <div class="line">
    <header>
      <span>个人中心</span>
      <span>我的上级</span>
    </header>
    <div class="line-info">
      <div class="user">
        <div>
          <div class="user-photo">
            <img :src="userInfo.avatar" alt />
          </div>
          <div class="user-name">{{userInfo.nickname}}</div>
        </div>
      </div>
      <div class="connect">
        <div class="vertical"></div>
        <div class="ellipse">推荐人</div>
      </div>
      <div class="referees" v-if="Object.keys(parent).length!=0">
        <div class="referees-photo">
          <img :src="parent.avatar" alt />
        </div>
        <div class="text">
          <div>昵称:{{parent.nickname}}</div>
          <!-- <div>销售额：¥{{parent}}</div> -->
          <div>关注时间：{{parent.createtime}}</div>
          <!-- <div>邀请码：{{parent.}}</div> -->
        </div>
      </div>
      <div class="referees" v-if="Object.keys(parent).length==0">
        <div class="text" style="text-align:center;">您还暂无推荐人</div>
      </div>
      <!-- <div class="connect">
        <div class="vertical"></div>
        <div class="ellipse">二级推荐人</div>
      </div>-->
      <!-- <div class="referees">
        <div class="referees-photo">
          <img src="../../assets/img/tx.jpg" alt />
        </div>
        <div class="text">
          <div>ID:色哦齁空额肆无忌惮</div>
          <div>销售额：¥2900.50</div>
          <div>关注时间：2019-02-30 10:38:10</div>
          <div>邀请码：Es29384</div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "lineChart",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      userInfo: {},
      parent: {}
    };
  },
  created() {
    this.vip();
    this.getMyParent();
  },
  methods: {
    getMyParent() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "user/parent",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.userInfo = res.data.data.userInfo;
        that.parent = res.data.data.parent;
      });
    },

    // 刷新当前页面
    reload() {
      location.reload();
    }
  }
};
</script>

<style scoped>

.line-info {
  background-color: #fff;
  padding-top: 6vh;
  margin-top: 2%;
  border-top: 5px solid #4187bd;
  height: 88vh;
}
header {
  padding-left: 10px;
  padding-top: 10px;
}
.line header span {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}
.line header span:last-child {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 5px;
}
.user {
  width: 549px;
  height: 216px;
  box-shadow: 0px 2px 2px 2px #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #979797;
}
.user-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.user-name {
  margin-top: 29px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
  text-align: center;
}

.connect {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 549px;
}
.vertical {
  width: 10px;
  height: 170px;
  background-color: #4187bd;
  margin: 0 auto;
}
.ellipse {
  width: 180px;
  height: 60px;
  background-color: #4187bd;
  border-radius: 45px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}

.referees {
  width: 549px;
  height: 228px;
  box-shadow: 0px 2px 2px 2px #e0e0e0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.referees-photo {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  border: 5px solid #979797;
  margin-left: 30px;
}
.referees-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.text {
  margin-left: 26px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 22px;
}
.text div {
  margin-top: 22px;
}
.text div:first-child {
  margin-top: 0;
}

@media only screen and (max-width: 767px) {
  .line {
    padding-left: 0;
  }
  .user,
  .connect,
  .referees {
    width: 90%;
    height: auto;
    margin: 0 auto;
  }
  .user,
  .referees {
    padding: 10px;
  }
  .referees-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-left: 0;
  }
  .text {
    margin-left: 10px;
    width: 55%;
  }
  .text div {
    margin-top: 10px;
  }
}
@media only screen and (min-width: 767px) and(max-width: 992px) {
  .line {
    padding-left: 10%;
  }
}
@media screen and (min-width: 767px) {
  .line-info {
    padding-left: 50px;
  }
}
</style>
