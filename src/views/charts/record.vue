 <template>
  <div style="padding:0 20px">
    <div class="top-header">可用积分：{{record}}</div>
    <div class="input-item">
      <input
        type="text"
        placeholder="请输入需要划转积分"
        class="input"
        v-model="number"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <br />
      <input type="text" placeholder="请输入接收账号" class="input" v-model="member" />
      <div style="color:#999;font-size:14px;padding:5px 0">当前可用积分{{record}}，可划转积分{{record}}</div>
      <div class="button11" @click="change()">划转</div>
    </div>
    <div>
      <p style="font-weight:bolder">划转记录</p>
      <ul>
        <li class="li" v-for="(item,index) in recordHistory" :key="index">
          <div class="li-top">
            <span class="p1" style="font-size:14px">{{item.memo}}</span>
            <span class="p2" style="color: red;">-{{item.score}}</span>
          </div>
          <div class="time">{{item.createTxt}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: "",
      recordHistory: {},
      member: "",
      number: ""
    };
  },
  mounted() {
    var timestamp1 = Date.parse(new Date()) / 1000;
    this.getRecord();
  },
  methods: {
    getRecord() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "user/record",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.record = res.data.data.score;
        that.recordHistory = res.data.data.score_log;
        for(var i=0;i<res.data.data.score_log.length;i++){
          this.recordHistory[i]['createTxt']=this.timestampToTime(res.data.data.score_log[i].createtime)
        }
      });
    },

    change() {
      var that = this;
      const h = this.$createElement;
        var param = {
        token: localStorage.getItem("token"),
        username: this.member,
        score_num: this.number
      };
      this.$axios({
        method: "post",
        url: this.url + "user/scoreSubmit",
        params: param
      }).then(res => {

        this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, res.data.msg)
        });
        this.member=''
        this.number=''
      });
      
    },
    timestampToTime: function(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
};
</script>

<style>
.top-header {
  height: 100px;
  font-size: 18px;
  line-height: 100px;
}
ul {
  margin: 0;
  padding: 0;
}
.li-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.time {
  color: #999;
  font-size: 14px;
}
li {
  list-style: none;
}
.li {
  border-bottom: 1px solid rgb(202, 198, 198);
  width: 320px;
  padding: 8px 0;
}
.input {
  border: none;
  border-bottom: 1px solid rgb(202, 198, 198);
  width: 320px;
  height: 40px;
  background-color: #f6fafd;
}

.button11 {
  margin: 15px 0;
  background-color: rgb(29, 108, 167);
  height: 40px;
  color: white;
  border-radius: 20px;
  text-align: center;
  line-height: 40px;
  width: 320px;
}
</style>