<template>
  <div class="runchart">
    <header>
      <span class="title-one">学员中心</span>
      <span class="title-sec">综合走势</span>
    </header>
    <div class="pc">
      <div class="top">
        <span>平面走势</span>

        <div v-cloak v-clickoutside="outsideClose" class="dropmain">
          <el-select v-model="value" placeholder="请选择" @change="TypeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div v-clickoutside="outsideClose" class="dropmain">
          <el-select v-model="value1" placeholder="请选择" @change="caipiaoidChange">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <span @click="typeSure">提交</span>
        <!-- <button>取消</button> -->
        <img src="../../assets/img/sx@2x.png" alt class="refresh" @click="reload" />
      </div>
    </div>

    <div class="phone">
      <div class="top">
        <span>平面走势</span>
        <div v-cloak v-clickoutside="outsideClose" class="dropmain">
          <el-select v-model="value" placeholder="请选择" @change="TypeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div v-clickoutside="outsideClose" class="dropmain">
          <el-select v-model="value1" placeholder="请选择" @change="caipiaoidChange">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <span @click="typeSure">提交</span>

        <img src="../../assets/img/sx@2x.png" alt class="refresh" @click="reload" />
      </div>
      <div style="width:99%;overflow:auto;margin:0 auto"></div>
    </div>
    <div style="overflow:auto;margin:0 auto" class="table-box">
      <table class="gridtable" cellspacing="0" cellpadding="0">
        <thead class="theadSticky">
          <tr>
            <th style="min-width:80px;">期号</th>
            <th style="min-width:110px;">开奖号码</th>
            <th class="two-row">
              <table class="table-sec" border="0" cellspacing="0" cellpadding="0">
                <tr class="table-sec-firstr">
                  <td colspan="11">开奖号码发布</td>
                </tr>
                <tr class="table-sec-sectr">
                  <td style="border-left:none">01</td>
                  <td>02</td>
                  <td>03</td>
                  <td>04</td>
                  <td>05</td>
                  <td>06</td>
                  <td>07</td>
                  <td>08</td>
                  <td>09</td>
                  <td>10</td>
                  <td style="border-right:none">11</td>
                </tr>
              </table>
            </th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-firstr">
                  <td colspan="11">大小比</td>
                </tr>
                <tr class="table-sec-sectr">
                  <td style="border-left:none">0:5</td>
                  <td>1:4</td>
                  <td>2:3</td>
                  <td>3:2</td>
                  <td>4:1</td>
                  <td style="border-right:none">5:0</td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-odd">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-firstr">
                  <td colspan="11">奇偶比</td>
                </tr>
                <tr class="table-sec-sectr">
                  <td style="border-left:none">0:5</td>
                  <td>1:4</td>
                  <td>2:3</td>
                  <td>3:2</td>
                  <td>4:1</td>
                  <td style="border-right:none">5:0</td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-zh">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-firstr">
                  <td colspan="11">质合比</td>
                </tr>
                <tr class="table-sec-sectr">
                  <td style="border-left:none">0:5</td>
                  <td>1:4</td>
                  <td>2:3</td>
                  <td>3:2</td>
                  <td>4:1</td>
                  <td style="border-right:none">5:0</td>
                </tr>
              </table>
            </th>
          </tr>
        </thead>
        <tbody style="height: 150px;overflow-y: scroll;">
          <tr v-for="(item,key) in tableData" class="sec-body">
            <td>{{item.issueno}}</td>
            <td>{{item.show_number}}</td>
            <td>
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    v-for="(v,k) in item.num_array"
                    :class="v.status==true?'actives':''"
                    :style="v.num=='01'?'border-left:none':''"
                  >
                    <span
                      :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''"
                    >{{v.num}}</span>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr bg-big" style="background-color:antiquewhite">
                  <td
                    v-for="(v,k) in item.big_small_array"
                    :class="v.status==true?'actives-big active':''"
                    :style="v.num=='0:5'?'border-left:none':''"
                  >
                    <span
                      :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''"
                    >{{v.num}}</span>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <table cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    v-for="(v,k) in item.odd_even_array"
                    :class="v.status==true?'actives-even active':''"
                    :style="v.num=='0:5'?'border-left:none':''"
                  >
                    <span
                      :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''"
                    >{{v.num}}</span>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr bg-big" style="background-color:mistyrose">
                  <td
                    v-for="(v,k) in item.prime_composite_array"
                    :class="v.status==true?'actives-com active':''"
                    :style="v.num=='0:5'?'border-left:none':''"
                  >
                    <span
                      :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''"
                    >{{v.num}}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <th style="min-width:80px;color:#fff;">
              <span @click="sub" style="background-color:#e02020;padding:5px">提交</span>
              <span @click="cancle" style="background-color:rgb(29, 108, 167);padding:5px">清除</span>
            </th>
            <th style="min-width:110px;">条件选择</th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    style="border-left:none"
                    @click="select('01','num')"
                    :class="this.selectArr.indexOf('01')>=0?'bg-red':''"
                  >01</td>
                  <td
                    @click="select('02','num')"
                    :class="this.selectArr.indexOf('02')>=0?'bg-red':''"
                  >02</td>
                  <td
                    @click="select('03','num')"
                    :class="this.selectArr.indexOf('03')>=0?'bg-red':''"
                  >03</td>
                  <td
                    @click="select('04','num')"
                    :class="this.selectArr.indexOf('04')>=0?'bg-red':''"
                  >04</td>
                  <td
                    @click="select('05','num')"
                    :class="this.selectArr.indexOf('05')>=0?'bg-red':''"
                  >05</td>
                  <td
                    @click="select('06','num')"
                    :class="this.selectArr.indexOf('06')>=0?'bg-red':''"
                  >06</td>
                  <td
                    @click="select('07','num')"
                    :class="this.selectArr.indexOf('07')>=0?'bg-red':''"
                  >07</td>
                  <td
                    @click="select('08','num')"
                    :class="this.selectArr.indexOf('08')>=0?'bg-red':''"
                  >08</td>
                  <td
                    @click="select('09','num')"
                    :class="this.selectArr.indexOf('09')>=0?'bg-red':''"
                  >09</td>
                  <td
                    @click="select('10','num')"
                    :class="this.selectArr.indexOf('10')>=0?'bg-red':''"
                  >10</td>
                  <td
                    style="border-right:none"
                    @click="select('11','num')"
                    :class="this.selectArr.indexOf('11')>=0?'bg-red':''"
                  >11</td>
                </tr>
              </table>
            </th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    style="border-left:none"
                    @click="select('0:5','big')"
                    :class="this.big.indexOf('0:5')>=0?'bg-red':''"
                  >0:5</td>
                  <td
                    @click="select('1:4','big')"
                    :class="this.big.indexOf('1:4')>=0?'bg-red':''"
                  >1:4</td>
                  <td
                    @click="select('2:3','big')"
                    :class="this.big.indexOf('2:3')>=0?'bg-red':''"
                  >2:3</td>
                  <td
                    @click="select('3:2','big')"
                    :class="this.big.indexOf('3:2')>=0?'bg-red':''"
                  >3:2</td>
                  <td
                    @click="select('4:1','big')"
                    :class="this.big.indexOf('4:1')>=0?'bg-red':''"
                  >4:1</td>
                  <td
                    style="border-right:none"
                    @click="select('5:0','big')"
                    :class="this.big.indexOf('5:0')>=0?'bg-red':''"
                  >5:0</td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-odd">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    style="border-left:none"
                    @click="select('0:5','even')"
                    :class="this.even.indexOf('0:5')>=0?'bg-red':''"
                  >0:5</td>
                  <td
                    @click="select('1:4','even')"
                    :class="this.even.indexOf('1:4')>=0?'bg-red':''"
                  >1:4</td>
                  <td
                    @click="select('2:3','even')"
                    :class="this.even.indexOf('2:3')>=0?'bg-red':''"
                  >2:3</td>
                  <td
                    @click="select('3:2','even')"
                    :class="this.even.indexOf('3:2')>=0?'bg-red':''"
                  >3:2</td>
                  <td
                    @click="select('4:1','even')"
                    :class="this.even.indexOf('4:1')>=0?'bg-red':''"
                  >4:1</td>
                  <td
                    style="border-right:none"
                    @click="select('5:0','even')"
                    :class="this.even.indexOf('5:0')>=0?'bg-red':''"
                  >5:0</td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-zh">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td
                    style="border-left:none"
                    @click="select('0:5','he')"
                    :class="this.he.indexOf('0:5')>=0?'bg-red':''"
                  >0:5</td>
                  <td @click="select('1:4','he')" :class="this.he.indexOf('1:4')>=0?'bg-red':''">1:4</td>
                  <td @click="select('2:3','he')" :class="this.he.indexOf('2:3')>=0?'bg-red':''">2:3</td>
                  <td @click="select('3:2','he')" :class="this.he.indexOf('3:2')>=0?'bg-red':''">3:2</td>
                  <td @click="select('4:1','he')" :class="this.he.indexOf('4:1')>=0?'bg-red':''">4:1</td>
                  <td
                    style="border-right:none"
                    @click="select('5:0','he')"
                    :class="this.he.indexOf('5:0')>=0?'bg-red':''"
                  >5:0</td>
                </tr>
              </table>
            </th>
          </tr>
          <tr class="table-bottom">
            <th style="min-width:80px;">出现</th>
            <th style="min-width:110px;"></th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[0].number">
                    <span :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''">{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[0].big_small">
                    <span :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''">{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-odd">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[0].odd_even">
                    <span :style="v.num=='06'&&v.status==true?'background-color:#1D6CA7':''">{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-zh">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[0].prime_composite">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
          </tr>
          <tr class="table-bottom">
            <th style="min-width:80px;">连出</th>
            <th style="min-width:110px;"></th>
            <th class="two-row">
              <table cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[1].number">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row">
              <table cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[1].big_small">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-odd">
              <table cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[1].odd_even">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-zh">
              <table cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[1].prime_composite">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
          </tr>
          <tr class="table-bottom">
            <th style="min-width:80px;">遗漏</th>
            <th style="min-width:110px;"></th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[2].number">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[2].big_small">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-odd">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[2].odd_even">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
            <th class="two-row bg-zh">
              <table cellspacing="0" cellpadding="0" class="table-sec" border="0">
                <tr class="table-sec-sectr">
                  <td v-for="(v,k) in tableDataC[2].prime_composite">
                    <span>{{v}}</span>
                  </td>
                </tr>
              </table>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      all: {},
      selectArr: [],
      tableData: [],
      tableDataC: [
        { number: [], big_small: [], odd_even: [], prime_composite: [] },
        { number: [], big_small: [], odd_even: [], prime_composite: [] },
        { number: [], big_small: [], odd_even: [], prime_composite: [] }
      ],
      show: false,
      number: "50",
      caipiaoid: "",
      options: [
        {
          value: "20",
          label: "20期"
        },
        {
          value: "30",
          label: "30期"
        },
        {
          value: "50",
          label: "50期"
        },
        {
          value: "100",
          label: "100期"
        }
      ],
      value: "50",
      // 福建11选5
      options1: [],
      value1: "",
      curHeight: "",
      // big: "",
      // even: "",
      // he: ""
      big: [],
      even: [],
      he: [],
      dan1Arr: []
    };
  },

  created() {
    this.vip();
    var h = document.documentElement.clientHeight || document.body.clientHeight;

    this.curHeight = h - 150; // 减去页面上固定高度height
    this.cate();
    this.timer = setInterval(() => {
      this.getData();
      this.getTrendCount();
    }, 60000);
  },

  mounted() {
    // window.addEventListener('scroll', this.scrollToTop)
  },
  // destroyed () {
  //   window.removeEventListener('scroll', this.scrollToTop)
  // },

  // 下拉菜单
  directives: {
    clickoutside: {
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }

        function KeyUp(e) {
          if (e.keyCode == 27) {
            if (binding.expression) {
              binding.value(e);
            }
          }
        }
        el.__vueClickOutSize__ = documentHandler;
        el.__vueKeyup__ = KeyUp;

        document.addEventListener("keyup", KeyUp);
        document.addEventListener("click", documentHandler);
      },
      unbind(el, binding) {
        document.removeEventListener("click", el.__vueClickOutSize__);
        delete el.__vueClickOutSize__;

        document.removeEventListener("keyup", el.__vueKeyup__);
        delete el.__vueKeyup__;
      }
    }
  },
  computed: {
    ...mapState("user", ["allData"])
  },
  methods: {
    ...mapActions("user", ["updateAllData"]),
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      let nowTop =
        document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
      console.log(nowTop);
      if (nowTop > 0) {
        window.requestAnimationFrame(this.goUp);
        window.scrollTo(0, nowTop - nowTop / 5);
      }
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },

    getData(val) {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/trend",
        params: {
          token: localStorage.getItem("token"),
          number: this.number,
          caipiaoid: this.caipiaoid
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(res => {
        that.tableData = res.data.data;
      });
    },
    getTrendCount() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "caipiao/trend_count",
        params: {
          token: localStorage.getItem("token"),
          number: this.number,
          caipiaoid: this.caipiaoid
        },
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(res => {
        that.tableDataC = res.data.data;
      });
    },
    outsideClose() {
      this.show = false;
    },
    run() {},
    // 刷新当前页面
    reload() {
      location.reload();
    },
    // 切换期号
    TypeChange(v) {
      this.number = v;
    },
    // 切换任选5等
    caipiaoidChange(v) {
      this.caipiaoid = v;
    },
    typeSure() {
      this.getData();
      this.getTrendCount();
    },

    cate() {
      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/cate",
        params: { token: localStorage.getItem("token") }
      }).then(res => {
        that.options1 = res.data.data;
        that.value1 = res.data.data[0].name;
        that.caipiaoid = res.data.data[0].id;
        that.getData();
        that.getTrendCount();
      });
    },
    cancle() {
      this.selectArr = [];
      this.big = [];
      this.he = [];
      this.even = [];
    },
    select(v, type) {
      if (type == "num") {
        // if (sessionStorage.getItem("numArr")&&JSON.parse(sessionStorage.getItem("numArr").length>0)) {

        //   var num = JSON.parse(sessionStorage.getItem("numArr"));
        //   var maxnum = Math.max(...num);
        //   if(maxnum == 5){
        //     this.$message({
        //         message: "不得超过5个选项",
        //         type: "warning"
        //       });
        //       return false;
        //   }
        // }
        if (this.selectArr.length > 0) {
          if (this.selectArr.indexOf(v) >= 0) {
            var i = this.selectArr.indexOf(v);
            this.selectArr.splice(i, 1);
          } else {
            if (this.selectArr.length >= 5) {
              this.$message({
                message: "不得超过5个选项",
                type: "warning"
              });
              return false;
            }
            this.selectArr.push(v);
          }
        } else {
          this.selectArr.push(v);
        }
      }

      if (type == "big") {
        // this.big = v;
        if (this.big.length > 0) {
          if (this.big.indexOf(v) >= 0) {
            var i = this.big.indexOf(v);
            this.big.splice(i, 1);
          } else {
            this.big.push(v);
          }
        } else {
          this.big.push(v);
        }
      }
      if (type == "he") {
        // this.he = v;
        if (this.he.length > 0) {
          if (this.he.indexOf(v) >= 0) {
            var i = this.he.indexOf(v);
            this.he.splice(i, 1);
          } else {
            this.he.push(v);
          }
        } else {
          this.he.push(v);
        }
      }
      if (type == "even") {
        // this.even = v;
        if (this.even.length > 0) {
          if (this.even.indexOf(v) >= 0) {
            var i = this.even.indexOf(v);
            this.even.splice(i, 1);
          } else {
            this.even.push(v);
          }
        } else {
          this.even.push(v);
        }
      }
    },
    sub() {
      console.log(this.selectArr);
      console.log(this.allData);
      // return false;
      let obj = JSON.parse(JSON.stringify(this.allData));
      if (this.selectArr.length > 0) {
        // sessionStorage.setItem("selectarr", JSON.stringify(this.selectArr));
        // for (var i = 0; i < this.selectArr.length; i++) {
        //   var id = i + 1;
        //   this.dan1Arr.push(id + "");
        // }
        // console.log(this.dan1Arr);
        let flag = true;
        for (let i = 0; i < 5; i++) {
          if (obj["dan" + (i + 1)].length === 0) {
            obj["dan" + (i + 1)] = this.selectArr;
            flag = false;
            break;
          }
        }
        flag && alert("操作失败");
        // sessionStorage.setItem("no1", 1);
      }
      if (this.big) {
        console.log("big", this.big);
        sessionStorage.setItem("big", this.big);
        obj.big = this.big;
        sessionStorage.setItem("big", JSON.stringify(this.big));
      }
      if (this.he) {
        sessionStorage.setItem("he", this.he);
        obj.big = this.he;
        sessionStorage.setItem("he", JSON.stringify(this.he));
      }
      if (this.even) {
        sessionStorage.setItem("even", this.even);
        obj.big = this.even;
        sessionStorage.setItem("even", JSON.stringify(this.even));
      }
      this.updateAllData({
        data: obj
      });
      this.selectArr = [];
      this.big = [];
      this.he = [];
      this.even = [];
      this.dan1Arr = [];
      this.$router.push({ path: "/user" });
    }
  }
};
</script>
<style scoped>
.bg-red {
  background-color: #e02020 !important;
}
.title-one {
  color: #333333;
  font-size: 18px;
  margin-right: 10px;
  margin-left: 20px;
}
header {
  margin-top: 20px;
}
.title-sec {
  color: #666666;
  font-size: 14px;
}
.pc,
.phone {
  display: none;
  border-top: 5px solid #4187bd;
  margin-top: 20px;
}
/* 手机端 */
.phone .top span {
  width: 62px;
  height: 28px;
  margin-right: 8px;
}
.pc .dropmain {
  width: 100px;
}
.phone .dropmain {
  width: 85px;
  margin-right: 8px;
}
.phone .top button {
  width: 42px;
  margin-right: 8px;
  height: 26px;
}
.phone .refresh {
  width: 62px;
  height: 26px;
  position: absolute;
  right: 4px;
  bottom: 90px;
}
.top {
  padding: 20px 9px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
}
.top span {
  width: 126px;
  height: 40px;
  background-color: #ff9219;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 21px;
}
.top button {
  width: 57px;
  height: 28px;
  background-color: #11c448;
  border-radius: 2px;
  font-size: 14px;
  color: #ffffff;
  line-height: 20px;
  border: none;
  margin-right: 12px;
}

[v-cloak] {
  display: none;
}

.dropmain {
  width: 75px;
  /* height: 28px; */
  margin-right: 20px;
}

.dropbutton {
  width: 100%;
  padding: 5px 6px;
  color: #333333;
  background-color: #fff;
  border: 0.1px solid #000000;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;
}
.dropbutton img {
  width: 8px;
  height: 6px;
  position: absolute;
  right: 6px;
}
.dropdown {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  text-align: left;
  margin-top: 2px;
}
.refresh {
  width: 90px;
  height: 40px;
  position: absolute;
  right: 44px;
}

.content {
  margin-top: 21px;
}

@media (max-width: 320px) {
  .phone {
    display: block;
  }
}
@media (min-width: 321px) and (max-width: 375px) {
  .phone {
    display: block;
  }
}
@media (min-width: 376px) and (max-width: 425px) {
  .phone {
    display: block;
  }
}
@media (min-width: 426px) and (max-width: 768px) {
  .phone {
    display: block;
  }
}

@media (min-width: 769px) {
  .pc {
    display: block;
  }
  .table-box {
    width: 99%;
  }
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #f9f9f9;
  border-collapse: collapse;
  min-width: 100%;
}
table.gridtable th {
  border-width: 1px;
  padding: 0px 0.5px;
  border-style: solid;
  border-color: #f9f9f9;
  background-color: #ffe8a9;
  min-width: 30px;
}
table.gridtable .table-bottom .table-sec td,
table.gridtable .table-bottom th {
  background-color: #fff;
  min-width: 30px;
}

table.gridtable td {
  border-width: 1px;
  text-align: center;
  border-style: solid;
  border-color: #f9f9f9;
  background-color: #ffffff;
  min-width: 30px;
}

.table-sec {
  border-collapse: collapse;
  width: 100%;
  border: none;
}
table.gridtable .table-sec td {
  background-color: #ffe8a9;
  min-width: 30px;
}

table.gridtable .sec-body .table-sec td {
  background-color: #fff;
  border-top: none;
  min-width: 28px;
  min-width: 30px;
}
table.gridtable .sec-body .table-sec .bg-big td {
  /* background-color: antiquewhite; */
  background-color: transparent;
  min-width: 30px;
}
table.gridtable .sec-body table {
  width: 100.5%;
}
.table-sec .table-sec-firstr,
.table-sec .table-sec-sectr {
  height: 30px;
}
.table-sec .table-sec-firstr td {
  border-top: none;
  border-left: none;
  border-right: none;
  min-width: 30px;
}
.table-sec .table-sec-sectr td {
  border-bottom: none;
  min-width: 30px;
}

.active span {
  background: #e02020;
  color: #fff;
  font-size: 8px;
  border-radius: 50% 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: normal !important;
  margin: 0 auto;
}

.actives-big span,
.actives-even span,
.actives-com span {
  border-radius: 0 0;
  width: 100%;
  height: 100%;
}
.actives-big span,
.actives-com span {
  background-color: #1d6ca7;
}
.actives span {
  background: #e02020;
  color: #fff;
  font-size: 8px;
  border-radius: 50% 50%;
  width: 24px;
  height: 24px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: normal !important;
  margin: 0 auto;
}
.table-sec-sectr td:last-child {
  border-right: none;
}
.table-sec-sectr td:first-child {
  border-left: none;
}

.theadSticky {
  position: sticky;
  top: 0px;
}
</style>
