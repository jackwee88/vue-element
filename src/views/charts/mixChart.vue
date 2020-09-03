<template>
  <div class="mixChart">
    <header>
      <span>个人中心</span>
      <span>我的下级</span>
    </header>
    <div class="mixChart-info">
      <div class="top">
        <span @click="toggleTab('all')" :class=" (id=='all'?'active btn':'btn')">全部会员({{num.all}}人)</span>
        <span @click="toggleTab(1)" :class=" (id==1?'active btn':'btn')">一级会员({{num.oneLevel}}人)</span>
        <!-- <span @click="toggleTab(2)" :class="id== 2?'active btn':'btn'">二级会员({{num.twoLevel}}人)</span> -->
        <span
          @click="toggleTab(3)"
          :class="id== 3?'active btn':'btn'"
          v-if="num.cityStatus"
        >{{num.cityName}}会员({{num.city}}人)</span>
        <el-input
          placeholder="搜索用户"
          v-model="mobile"
          :size="isshow==false ? 'mini' : ''"
          @input="search"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

      <div class="members">
        <div v-for="(item,index) in membersInfo" :key="index">
          <div
            v-if="isshow"
            class="membersInfo"
            @click="gotoDetail($event)"
            :data-id="item.id"
            :data-index="index"
            :data-visible="item.visible"
          >
            <div class="head">
              <div class="photo">
                <img :src="item.avatar" alt />
              </div>
              <div class="name">{{item.nickname}}</div>
            </div>
            <div class="foot">
              <!-- <div>推荐人：{{item.referees}}</div> -->
              <div>关注时间：{{item.createtime}}</div>
              <div>成交单：{{item.count}}单</div>
              <div>成交额：￥{{item.money}}元</div>
              <div>我的学员：{{item.child.length}}</div>
            </div>
            <transition name="fade">
              <div v-if="item.visible" class="transition" transiton="fade">
                <div v-for="(members,index) in item.child" :key="index">
                  <div class="head headt">
                    <div class="photo">
                      <img :src="members.avatar" alt />
                    </div>
                    <div class="name">{{members.nickname}}</div>
                  </div>
                  <div class="foot footT">
                    <div>关注时间：{{members.createTxt}}</div>
                    <div>成交单：{{members.count}}单</div>
                    <div>成交额：￥{{members.money}}元</div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div
            v-else
            class="phone"
            @click="gotoDetail($event)"
            :data-id="item.id"
            :data-index="index"
            :data-visible="item.visible"
          >
            <div class="head">
              <div class="photo">
                <img :src="item.avatar" alt />
              </div>
              <div class="right">
                <div class="name">{{item.nickname}}</div>
                <!-- <div>推荐人：{{item.referees}}</div> -->
                <div>关注时间：{{item.createtime}}</div>
              </div>
            </div>
            <div class="foot">
              <div>我的学员：{{item.child.length}}</div>

              <div>学员名字：{{item.bank.username}}</div>
            </div>
            <transition name="fade">
              <div v-if="item.visible" class="transition" transiton="fade">
                <div v-for="(members,index) in item.child" :key="index">
                  <div class="head headt">
                    <div class="photo">
                      <img :src="members.avatar" alt />
                    </div>
                    <div class="right">
                      <div class="name">{{members.nickname}}</div>
                      <div>关注时间：{{members.createTxt}}</div>
                      <div>学员名字：{{members.bank.username}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: center;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="handleCurrentChange"
        :page-size="page_size"
      ></el-pagination>
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
      id: "all",
      membersInfo: [],
      isshow: true,
      screenWidth: document.body.clientWidth,
      mobile: "",
      page: 1,
      page_size: 10,
      count: 0, //分页总数
      num: {},
      currentId: 0,
      formLabelAlign: {},
      NextMemberInfo: [],
    };
  },
  mounted() {
    this.vip();
    const that = this;
    window.onresize = () => {
      return () => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      };
    };
    // 获取所有孩子
    this.allChild();
    this.childNum();
    this.getCityPerson();
  },
  methods: {
    getCityPerson() {
      var that = this;
      // this.id = 3;
      this.$axios({
        method: "post",
        url: this.url + "user/childCity",
        params: { token: localStorage.getItem("token") },
      }).then((res) => {
        var membersInfo = res.data.data.child;
        for (var i = 0; i < res.data.data.child.length; i++) {
          membersInfo[i]["visible"] = false;
          for (var j = 0; j < res.data.data.child[i].child.length; j++) {
            membersInfo[i].child[j]["createTxt"] = that.timestampToTimes(
              res.data.data.child[i].child[j].createtime
            );
          }
        }
        that.membersInfo = membersInfo;
        that.count = parseInt(res.data.data.total);
      });
    },
    getUserInfo() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/userInfo",
        params: { token: localStorage.getItem("token") },
      }).then((res) => {
        that.formLabelAlign = res.data.data.bank;
      });
    },
    timestampToTimes: function (timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + " " + h + m + s;
    },
    gotoDetail(e) {
      var index = e.currentTarget.dataset.index;
      var membersInfo = this.membersInfo;
      var visible = e.currentTarget.dataset.visible;
      for (var i = 0; i < this.membersInfo.length; i++) {
        if (i == index) {
          this.membersInfo[i].visible = !visible;
        } else {
          this.membersInfo[i].visible = false;
        }
      }
    },
    childNum() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/childNum",
        params: { token: localStorage.getItem("token") },
      }).then((res) => {
        that.num = res.data.data;
      });
    },
    // 点击1级2级时是切换
    toggleTab(id) {
      this.id = id;
      if (id == "2") {
        this.getMyChildSec();
      } else if (id == 1) {
        this.allChild();
      } else if (id == 3) {
        this.getCityPerson();
      } else {
        this.allChild();
      }
    },
    // 获取2级
    getMyChildSec() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/childSe",
        params: {
          token: localStorage.getItem("token"),
          mobile: that.mobile,
          page: this.page,
          page_size: this.page_size,
        },
      }).then((res) => {
        var membersInfo = res.data.data.child;
        for (var i = 0; i < res.data.data.child.length; i++) {
          membersInfo[i]["visible"] = false;
          for (var j = 0; j < res.data.data.child[i].child.length; j++) {
            membersInfo[i].child[j]["createTxt"] = that.timestampToTimes(
              res.data.data.child[i].child[j].createtime
            );
          }
        }
        that.membersInfo = membersInfo;
        that.count = parseInt(res.data.data.total);
      });
    },
    getWidth(val) {
      if (!this.timer) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        this.screenWidth = val; // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        if (this.screenWidth <= 992) {
          this.isshow = false;
        } else {
          this.isshow = true;
        }
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // //console.log(that.screenWidth); // 打印screenWidth变化的值
          that.timer = false;
        }, 400);
      }
    },
    // 获取一级
    getMyChild() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/child",
        params: {
          token: localStorage.getItem("token"),
          mobile: that.mobile,
          page: this.page,
          page_size: this.page_size,
        },
      }).then((res) => {
        var membersInfo = res.data.data.child;
        for (var i = 0; i < res.data.data.child.length; i++) {
          membersInfo[i]["visible"] = false;
          for (var j = 0; j < res.data.data.child[i].child.length; j++) {
            membersInfo[i].child[j]["createTxt"] = that.timestampToTimes(
              res.data.data.child[i].child[j].createtime
            );
          }
        }
        that.membersInfo = membersInfo;
        that.count = parseInt(res.data.data.total);
      });
    },
    allChild() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/allChild",
        params: {
          token: localStorage.getItem("token"),
          mobile: that.mobile,
          page: this.page,
          page_size: this.page_size,
        },
      }).then((res) => {
        var membersInfo = res.data.data.child;
        for (var i = 0; i < res.data.data.child.length; i++) {
          membersInfo[i]["visible"] = false;
          if(res.data.data.child[i].child.length>0){
            for (var j = 0; j < res.data.data.child[i].child.length; j++) {
            membersInfo[i].child[j]["createTxt"] = that.timestampToTimes(res.data.data.child[i].child[j].createtime);
           
          }
          }
          
        }
        that.membersInfo = membersInfo;
        that.count = parseInt(res.data.data.total);
      });
    },
    // 搜索我的下级
    search() {
      if (this.id == 1) {
        this.getMyChild();
      } else if (this.id == 2) {
        this.getMyChildSec();
      } else {
        this.allChild();
      }
    },

    handleCurrentChange: function (currentPage) {
      this.page = currentPage;
      if (this.id == 1) {
        this.getMyChild();
      } else if (this.id == 2) {
        this.getMyChildSec();
      } else if (this.id == 3) {
        this.getCityPerson();
      } else {
        this.allChild();
      }
    },
  },
  created(val) {
    this.getWidth(this.screenWidth);
  },
};
</script>

<style scoped>
.person-info {
  background-color: #fff;
  margin-top: 2%;
  border-top: 5px solid #4187bd;
}
.person header span {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}
.person header span:last-child {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 5px;
}
.mine {
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
  font-size: 16px;
  color: #666;
}
.el-form {
  padding: 10px;
  border-bottom: 1px solid #f3f3f3;
}
.el-form-item__label {
  line-height: 0px;
}
.mixChart {
  padding: 20px;
}
.mixChart-info {
  padding: 17px 28px;
  background-color: #fff;
  margin-top: 2%;
  border-top: 5px solid #4187bd;
  min-height: 87vh;
}
.mixChart header span {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}
.mixChart header span:last-child {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 5px;
}
.top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.el-radio-button {
  margin-right: 30px;
}
.el-input {
  margin-left: 9px;
}

.btn {
  padding: 6px 0px;
  width: 140px;
  display: flex;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
  color: #fff;
  min-width: 112px;
  margin-bottom: 8px;
}
.active {
  background-color: #4187bd;
}
.members {
  width: 80%;
  margin: 40px auto 0;
}
.membersInfo {
  box-shadow: 0px 2px 2px 1px #e0e0e0;
  margin-bottom: 20px;
  padding: 10px 15px;
}
.membersInfo .head,
.foot {
  display: flex;
  align-items: center;
}
.headt{
  padding: 10px 0;
}
.photo {
  width: 40px;
  height: 40px;
  border: 1px solid #979797;
  border-radius: 50%;
}
.photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.name {
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  margin-left: 8px;
}
.foot {
  margin-top: 19px;
  display: flex;
  justify-content: space-between;
}
.foot div {
  font-size: 14px;
  color: #333333;
  line-height: 20px;
}
.tipsTitle {
  padding: 5px 0;
}
/* 移动端页面样式 */
.phone {
  box-shadow: 0px 2px 2px 1px #e0e0e0;
  margin-bottom: 20px;
  padding: 10px 10px 20px;
}
.phone .head {
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
  display: -webkit-box;
  /* display: flex; */
}
.phone .photo {
  width: 70px;
  height: 70px;
  border: 3px solid #979797;
  border-radius: 50%;
}
.phone .photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.phone .name {
  margin-left: 0;
  font-weight: 600;
}
.right {
  margin-left: 15px;
  width: 70%;
}
.right div {
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  margin-top: 5px;
}
.right .name {
  font-size: 16px;
  color: #333333;
  line-height: 22px;
  font-weight: 600;
}
.phone .foot {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
}
.phone .foot div {
  margin-right: 0;
}

@media only screen and (max-width: 600px) {
  .mixChart {
    padding: 5px 10px;
  }
  .el-radio-button {
    margin-right: 5px;
  }
  .el-input {
    margin-left: 0;
  }
  .members {
    width: 100%;
    margin: 20px auto 0;
  }
  .btn {
    width: 112px;
    font-size: 14px;
  }
}
@media only screen and (width: 768px) {
  .phone {
    padding: 10px 40px 20px;
  }
  .phone .photo {
    width: 100px;
    height: 100px;
    border: 5px solid #979797;
    border-radius: 50%;
  }
  .right {
    margin-left: 55px;
    width: 70%;
  }
  .right div {
    margin-top: 15px;
  }
  .phone .foot {
    width: 90%;
    margin: 16px auto 0;
    justify-content: space-between;
  }
  .btn {
    width: 112px;
    font-size: 14px;
  }
}
@media only screen and (min-width: 768px) {
  .phone {
    padding: 10px 20px 23px;
  }
  .right {
    margin-left: 30px;
  }
  .phone .foot {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 16px auto 0;
  }
  .phone .photo {
    width: 100px;
    height: 100px;
    border: 5px solid #979797;
  }
  .right div {
    margin-top: 15px;
  }
  .btn {
    margin-right: 20px;
    min-width: 120px;
  }
  .footT{
    margin: 0;
  }
}
</style>

