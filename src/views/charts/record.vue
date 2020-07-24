 <template>
  <div :style="'height:'+winH">
    <div class="change">
    <div class="top-header">可用积分：{{record}}</div>
    <div class="input-item">
      <div class="inputdiv"><input
        type="text"
        placeholder="请输入需要划转积分"
        class="input"
        v-model="number"
        oninput="value=value.replace(/[^\d]/g,'')"
      /></div>
      
      <div class="inputdiv">
      <span>ZYYC</span>
      <input type="text" placeholder="请输入接收账号" class="input " v-model="member"/>
      </div>
      <div style="color:#999;font-size:14px;padding:5px 0">当前可用积分{{record}}，可划转积分{{record}}</div>
      <div class="button11" @click="went()">划转</div>
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
    <div class="bg" v-if="visible" @click="visibleChange()" >
      
    </div>
    <div class="modalP" v-if="visible">
<div class="modal" >
      <div style="width:100%;height:100%;position:relative;box-sizing:border-box;">
        <div style="padding:10px;font-size:14px;line-height:30px;">
          <div>请核对以下信息，确认无误后点击确认</div>
        <div style="color:#999">转入账号：{{member}}</div>
        <div style="color:#999">转入数量：{{number}}</div>
        <div style="color:#999">到账时间：立即到账</div>
        </div>
        
        <div class="bottom-item">
          <span @click="change()">确认</span>
          <span @click="visibleChange">取消</span>
        </div>
      </div>
    </div>
    </div>
    
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
      number: "",
      visible:false,
      winH:''
    };
  },
  mounted() {
    var timestamp1 = Date.parse(new Date()) / 1000;
    this.getRecord();
    var winH=document.body.clientHeight
    this.winH=winH
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
    went(){
      const h = this.$createElement;
      console.log(this.member)
      console.log(this.number)
      
      if(this.member==''||this.number==''){
         this.$notify({
          title: "",
          message: h("i", { style: "color: teal" }, '请输入账号或积分')
        })
      }else{
        this.visibleChange()
      }
    },
    visibleChange(){
      var visible=this.visible
      this.visible=!visible
    },
    change() {
      var that = this;
      const h = this.$createElement;
        var param = {
        token: localStorage.getItem("token"),
        username: 'ZYYC'+this.member,
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
        this.visibleChange()
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

<style scoped>
.bottom-item{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid rgb(202, 198, 198);
  box-sizing: border-box;
  display: flex;
}
.bottom-item span{
  display: inline-block;
  width: 50%;
  text-align: center;
}
.bottom-item span:nth-child(1){
  background-color: rgb(29, 108, 167);
  border-radius: 0 0 0 10px;
  color: white;
}
.bottom-item span:nth-child(2){
  background-color: #e02020;
  border-radius: 0 0 10px 0;
  color: white;
}
.bg{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.1);
  position: fixed;
  top:0;
  left: 0;
}
.change{
  padding:0 20px;
  position: relative;
}
.modalP{
 width: 100%;
 height: 200px;
position: absolute;
left: 0;
bottom: -50px;

}
.modal{
  width: 300px;
  height: 178px;
  background-color: white;
  border-radius:10px;
  margin: 0 auto;
}
.top-header {
  height: 100px;
  font-size: 18px;
  line-height: 100px;
}
ul {
  margin: 0;
  padding: 0;
}
.inputdiv{
  border-bottom:1px solid rgb(202, 198, 198);
  width: 320px;
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
  /* width: 320px; */
  height: 40px;
  background-color: #f6fafd;
}
input:focus{
  outline: none;
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