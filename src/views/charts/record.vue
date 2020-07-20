 <template>
  <div style="padding:0 20px">
    <div class="top-header">可用积分：100000</div>
    <div class="input-item">
      <input type="text" placeholder="请输入需要划转积分" class="input" v-model="number" oninput="value=value.replace(/[^\d]/g,'')"/>
      <br />
      <input type="text" placeholder="请输入接收账号" class="input" v-model="member" />
      <div style="color:#999;font-size:14px;padding:5px 0">当前可用积分10000，可划转积分8800</div>
      <div class="button11" @click="change()">划转</div>
    </div>
    <div>
      <p style="font-weight:bolder">划转记录</p>
      <ul>
        <li class="li">
          <div class="li-top">
            <span class="p1">划转账号:111132113</span>
            <span class="p2" style="color: red;">-8888</span>
          </div>
          <div class="time">2019-01-01：17：48</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: [],
      recordHistory:[],
      member: "",
      number: ""
    };
  },
  mounted() {
      var timestamp1 = Date.parse(new Date())/1000;
      console.log(timestamp1)
      console.log(this.timestampToTime(timestamp1))
  },
  methods: {
    getRecord() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "",
        params: { token: localStorage.getItem("token") }
      }).then(res => {});
    },
    getRecordHistory() {
      var that = this;
      this.$axios({
        method: "post",
        url: this.url + "",
        params: { token: localStorage.getItem("token") }
      }).then(res => {});
    },
    change() {
      var that = this;
      const h = this.$createElement;
      if (this.member || this.number == "") {
        this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, "请输入账号和要划转的积分")
        });
      }

      this.$axios({
        method: "post",
        url: this.url + "",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.record = res.data.data;
      });
    },
    timestampToTime:function (timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },
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