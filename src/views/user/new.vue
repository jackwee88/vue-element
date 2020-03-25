<template>
  <div class="table-container index">
    <p style="padding-left:10px">
      <span class="title-one">学员中心</span>
      <span class="title-sec">彩票做号</span>
    </p>
    <div class="box-big">
      <p style="color:#666666FF">彩票做号</p>
      <p class="base-num">
        <span class="type-title base-num-text">基础号码</span>
        <span style>
          <span class="base-blue base-color">01</span>
          <span class="base-blue base-color">02</span>
          <span class="base-blue base-color">03</span>
          <span class="base-blue base-color">04</span>
          <span class="base-blue base-color">05</span>
          <span class="base-red base-color">06</span>
          <span class="base-blue base-color">07</span>
          <span class="base-blue base-color">08</span>
          <span class="base-blue base-color">09</span>
          <span class="base-blue base-color">10</span>
          <span class="base-blue base-color">11</span>
        </span>
      </p>

      <div class="type" style="position:relative">
        <div>
          <span class="type-title dan1">一号胆</span>
          <el-checkbox-group
            v-model="checkedDans1"
            @change="handleCheckedCitiesChange1"
            class="box"
          >
            <el-checkbox
              v-for="(city,i) in dans1"
              :label="city"
              :key="city"
              :checked="checkedDans1.indexOf(city)>=0"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
        </div>
        <div class="show-wrap">
          <span class="type-title">出现</span>
          <el-checkbox-group
            v-model="checkedDansShow1"
            @change="handleCheckedCitiesShow1"
            class="show-num"
          >
            <el-checkbox
              v-for="city in dansShow1"
              :label="city"
              :key="city"
              :checked="checkedDansShow1.indexOf(city)>=0"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
          <!-- <div class="block">
            <label
              :style="city.tivk?'color:#409eff':''"
              for="label"
              @click.stop="clickMe(city.name,'dan1')"
              v-for="(city,index) in dansShow1"
            >
              <input type="checkbox" id="label" v-bind:checked="city.tivk" />
              {{city.name}}
            </label>
          </div>-->
          <span class="clears" @click="clearAll('one')">清</span>
        </div>
      </div>

      <div class="type" style="position:relative">
        <div>
          <span class="type-title" style="margin-bottom:8px;">二号胆</span>
          <el-checkbox-group v-model="checkedDans2" @change="handleCheckedCitiesChange2">
            <el-checkbox v-for="city in dans2" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
        </div>
        <div class="show-wrap">
          <span class="type-title">出现</span>
          <el-checkbox-group
            v-model="checkedDansShow2"
            @change="handleCheckedCitiesShow2"
            class="show-num"
          >
            <el-checkbox v-for="city in dansShow2" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <span class="clears" @click="clearAll('two')">清</span>
        </div>
      </div>

      <div class="type" style="position:relative">
        <div>
          <span class="type-title" style="margin-bottom:8px;">三号胆</span>
          <el-checkbox-group v-model="checkedDans3" @change="handleCheckedCitiesChange3">
            <el-checkbox v-for="city in dans3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="checkAll3" @change="handleCheckAllChange3">全选</el-checkbox>
        </div>
        <div class="show-wrap">
          <span class="type-title">出现</span>
          <el-checkbox-group
            v-model="checkedDansShow3"
            @change="handleCheckedCitiesShow3"
            class="show-num"
          >
            <el-checkbox v-for="city in dansShow3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <span class="clears" @click="clearAll('three')">清</span>
        </div>
      </div>

      <div class="type" style="position:relative">
        <div>
          <span class="type-title" style="margin-bottom:8px;">四号胆</span>
          <el-checkbox-group v-model="checkedDans4" @change="handleCheckedCitiesChange4">
            <el-checkbox v-for="city in dans4" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="checkAll4" @change="handleCheckAllChange4">全选</el-checkbox>
        </div>
        <div class="show-wrap">
          <span class="type-title">出现</span>
          <el-checkbox-group
            v-model="checkedDansShow4"
            @change="handleCheckedCitiesShow4"
            class="show-num"
          >
            <el-checkbox v-for="city in dansShow4" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <span class="clears" @click="clearAll('four')">清</span>
        </div>
      </div>

      <div class="type" style="position:relative">
        <div>
          <span class="type-title" style="margin-bottom:8px;">五号胆</span>
          <el-checkbox-group v-model="checkedDans5" @change="handleCheckedCitiesChange5">
            <el-checkbox v-for="city in dans5" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="checkAll5" @change="handleCheckAllChange5">全选</el-checkbox>
        </div>
        <div class="show-wrap">
          <span class="type-title">出现</span>
          <el-checkbox-group
            v-model="checkedDansShow5"
            @change="handleCheckedCitiesShow5"
            class="show-num"
          >
            <el-checkbox v-for="city in dansShow3" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          <span class="clears" @click="clearAll('five')">清</span>
        </div>
      </div>

      <div class="bottom-type-box" style="position:relative">
        <div class="type show-num">
          <span class="type-title" style="margin-bottom:8px;">偶数个数</span>
          <el-checkbox-group v-model="checkedEven" @change="handleEven" class="bottom-wrap">
            <el-checkbox
              v-for="city in evens"
              :label="city"
              :key="city"
              :checked="checkedEven.indexOf(city)>=0"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
          <!-- <div class="block">
            <label
              :style="city.tivk?'color:#409eff':''"
              for="label"
              @click.stop="clickMe(city.name,'even')"
              v-for="(city,index) in evens"
            >
              <input type="checkbox" id="label" v-bind:checked="city.tivk" />
              {{city.name}}
            </label>
          </div>-->
        </div>
        <div class="type show-num">
          <span class="type-title" style="margin-bottom:8px;">合数个数</span>
          <el-checkbox-group v-model="checkedOdd" @change="handleOdd" class="bottom-wrap">
            <el-checkbox
              v-for="city in odds"
              :label="city"
              :key="city"
              :checked="checkedOdd.indexOf(city)>=0"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
          <!-- <div class="block">
            <label
              :style="city.tivk?'color:#409eff':''"
              for="label"
              @click.stop="clickMe(city.name,'odd')"
              v-for="(city,index) in odds"
            >
              <input type="checkbox" id="label" v-bind:checked="city.tivk" />
              {{city.name}}
            </label>
          </div>-->
        </div>
        <div class="type show-num">
          <span class="type-title" style="margin-bottom:8px;">小数个数</span>
          <el-checkbox-group v-model="checkedSmall" @change="handleSmall" class="bottom-wrap">
            <el-checkbox
              v-for="city in smalls"
              :label="city"
              :key="city"
              :checked="checkedSmall.indexOf(city)>=0"
            >{{city}}</el-checkbox>
          </el-checkbox-group>
          <!-- <div class="block">
            <label
              :style="city.tivk?'color:#409eff':''"
              for="label"
              @click.stop="clickMe(city.name,'big')"
              v-for="(city,index) in smalls"
            >
              <input type="checkbox" id="label" v-bind:checked="city.tivk" />
              {{city.name}}
            </label>
          </div>-->
        </div>
        <div class="type show-num" style="margin-bottom:0px;">
          <span class="type-title">连数个数</span>
          <el-checkbox-group v-model="checkedHyphen" @change="handleHyphen" class="bottom-wrap">
            <el-checkbox v-for="city in hyphens" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <span class="clears-two" @click="clearAll('other')">清</span>
      </div>

      <hr />

      <div>
        <span @click="sure" class="p2">生成号码</span>
        <p class="generating-number-box">
          <span>
            号码
            <span v-if="totalShow" style="color:red;margin-left:12px;">共 {{total}} 注</span>
          </span>
          <span @click="copy" class="copy-todata">复制</span>
        </p>
        <div style="text-align:center;display:flex;">
          <textarea name id="textValue" rows="10" v-model="returnArr"></textarea>

          <div class="change-type">
            <p @click="replaceKongGe">以空格分隔</p>
            <p @click="replaceDouHao">以逗号分隔</p>
          </div>
        </div>
        <div class="sure-box">
          <p class="p1" @click="toData">前往智能数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MDinput from "@/components/MDinput";
import Sticky from "@/components/Sticky"; // 粘性header组件
import userSave from "./save.vue";
const dan1S = [
  { name: "01", tivk: false },
  { name: "02", tivk: false },
  { name: "03", tivk: false },
  { name: "04", tivk: false },
  { name: "05", tivk: false },
  { name: "06", tivk: false },
  { name: "07", tivk: false },
  { name: "08", tivk: false },
  { name: "09", tivk: false },
  { name: "10", tivk: false },
  { name: "01", tivk: false },
  { name: "11", tivk: false }
];

// const even = [
//   { name: "0", tivk: false },
//   { name: "1", tivk: false },
//   { name: "2", tivk: false },
//   { name: "3", tivk: false },
//   { name: "4", tivk: false },
//   { name: "5", tivk: false }
// ];
// const small = [
//   { name: "0", tivk: false },
//   { name: "1", tivk: false },
//   { name: "2", tivk: false },
//   { name: "3", tivk: false },
//   { name: "4", tivk: false },
//   { name: "5", tivk: false }
// ];
// const odd = [
//   { name: "0", tivk: false },
//   { name: "1", tivk: false },
//   { name: "2", tivk: false },
//   { name: "3", tivk: false },
//   { name: "4", tivk: false },
//   { name: "5", tivk: false }
// ];
// const danshow1 = [
//   { name: "0", tivk: false },
//   { name: "1", tivk: false },
//   { name: "2", tivk: false },
//   { name: "3", tivk: false },
//   { name: "4", tivk: false },
//   { name: "5", tivk: false }
// ];
const dan1 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const dan2 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const dan3 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const dan4 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const dan5 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
const danshow1 = ["0", "1", "2", "3", "4", "5"]; //胆一出现的次数
const danshow2 = ["0", "1", "2", "3", "4", "5"];
const danshow3 = ["0", "1", "2", "3", "4", "5"]; //
const danshow4 = ["0", "1", "2", "3", "4", "5"]; //
const danshow5 = ["0", "1", "2", "3", "4", "5"]; //
const even = ["0", "1", "2", "3", "4", "5"]; //偶数

const odd = ["0", "1", "2", "3", "4", "5"];
const small = ["0", "1", "2", "3", "4", "5"]; //小数
const hyphen = ["0", "1", "2", "3", "4", "5"]; //连数

export default {
  name: "userIndex",
  components: { MDinput, Sticky, userSave },
  data() {
    return {
      smallS: -2,
      evenS: -2,
      oddS: -2,
      dan1S: dan1S,
      loading: false,
      checkAll1: false, //胆1全选
      checkAll2: false,
      checkAll3: false,
      checkAll4: false,
      ckeckVal: 1,
      checkAll5: false,
      checkedDans1: [], //胆一全选的数值
      dans1: dan1, //胆一
      checkedDans2: [],
      dans2: dan2,
      checkedDans3: [],
      dans3: dan3,
      checkedDans4: [],
      dans4: dan4,
      checkedDans5: [],
      dans5: dan5,
      checkedEven: [],
      evens: even,
      checkedOdd: [],
      odds: odd,
      checkedSmall: [],
      smalls: small,
      checkedHyphen: [],
      hyphens: hyphen,

      checkedDansShow1: [], //胆一出现的次数
      dansShow1: danshow1, //胆一
      checkedDansShow2: [], //胆一出现的次数
      dansShow2: danshow2, //胆一
      checkedDansShow3: [], //胆一出现的次数
      dansShow3: danshow3, //胆一
      checkedDansShow4: [], //胆一出现的次数
      dansShow4: danshow4, //胆一
      checkedDansShow5: [], //胆一出现的次数
      dansShow5: danshow5, //胆一

      returnArr: "", //做号的结果
      returnArrO: "", //做号的结果,用于由逗号切换为空格
      totalShow: false,
      total: 0,
      c: "f",
      flagS: false,
      flagB: false,
      flagE: false,
      flag1: false,
      new_num: []
    };
  },
//   brforeRouteLeave(to,from,next){
// let position=$(window).scrollTop();
// localStorage.setItem("scrollTop",position);
// if(to.path== "/runchart"){
// if(!from.mata.keepAlive){
//   from.meta.keepAlive = true;
// }
// next();
// }else{
//   from.meta.keepAlive = false;
//   to.meta.keepAlive = false;
//   next();
//   window.location.reload()
// }
//   },
  mounted() {
    console.log('大傻逼')

    var a =sessionStorage.getItem("one")
    if (sessionStorage.getItem("selectarr")) {
      
      var selectArr = JSON.parse(sessionStorage.getItem("selectarr")); //胆一
      // 判断已选中的胆
      if (
        sessionStorage.getItem("numArr") &&
        JSON.parse(sessionStorage.getItem("numArr").length > 0)
      ) {
        var num = JSON.parse(sessionStorage.getItem("numArr"));
        // var num = this.new_num
        console.log(num.length, 1111);
        if (num.length == 0) {
          this.checkedDans1 = selectArr; //从综合走势获取到的值

          sessionStorage.setItem("one", JSON.stringify(selectArr));

          var ary = [1];
          this.new_num = [1];
          sessionStorage.setItem("numArr", JSON.stringify(ary));
          sessionStorage.setItem("oneA", JSON.stringify(dan1arr));
          var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          this.checkedDansShow1 = dan1arr;
          return;
        }
        var maxnum = Math.max(...num);

        if (maxnum == 1) {
          console.log(maxnum, 111111);
          this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
          this.checkedDans2 = selectArr; //从综合走势获取到的值

          num.push(2);
          this.new_num = [1, 2];
          sessionStorage.setItem("two", JSON.stringify(selectArr));

          var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          sessionStorage.setItem("twoA", JSON.stringify(dan1arr));
          this.checkedDansShow1 = JSON.parse(sessionStorage.getItem("oneA"));
          this.checkedDansShow2 = dan1arr;
        } else if (maxnum == 2) {
          if (
            JSON.parse(sessionStorage.getItem("one")) &&
            JSON.parse(sessionStorage.getItem("one")).length > 0
          ) {
            this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
          }
          if (
            JSON.parse(sessionStorage.getItem("two")) &&
            JSON.parse(sessionStorage.getItem("two")).length > 0
          ) {
            this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
          }

          this.checkedDans3 = selectArr; //从综合走势获取到的值
          console.log(this.checkedDans3);
          this.new_num = [1, 2, 3];
          num.push(3);

          sessionStorage.setItem("three", JSON.stringify(selectArr));

          if (
            JSON.parse(sessionStorage.getItem("oneA")) &&
            JSON.parse(sessionStorage.getItem("oneA")).length > 0
          ) {
            this.checkedDansShow1 = JSON.parse(sessionStorage.getItem("oneA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("twoA")) &&
            JSON.parse(sessionStorage.getItem("twoA")).length > 0
          ) {
            this.checkedDansShow2 = JSON.parse(sessionStorage.getItem("twoA"));
          }

          var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          sessionStorage.setItem("threeA", JSON.stringify(dan1arr));
          this.checkedDansShow3 = dan1arr;
        } else if (maxnum == 3) {
          if (
            JSON.parse(sessionStorage.getItem("one")) &&
            JSON.parse(sessionStorage.getItem("one")).length > 0
          ) {
            this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
          }
          if (
            JSON.parse(sessionStorage.getItem("two")) &&
            JSON.parse(sessionStorage.getItem("two")).length > 0
          ) {
            this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
          }
          if (
            JSON.parse(sessionStorage.getItem("three")) &&
            JSON.parse(sessionStorage.getItem("three")).length > 0
          ) {
            this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
          }

          this.checkedDans4 = selectArr; //从综合走势获取到的值

          this.new_num = [1, 2, 3, 4];
          sessionStorage.setItem("four", JSON.stringify(selectArr));
          num.push(4);
          if (
            JSON.parse(sessionStorage.getItem("oneA")) &&
            JSON.parse(sessionStorage.getItem("oneA")).length > 0
          ) {
            this.checkedDansShow1 = JSON.parse(sessionStorage.getItem("oneA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("twoA")) &&
            JSON.parse(sessionStorage.getItem("twoA")).length > 0
          ) {
            this.checkedDansShow2 = JSON.parse(sessionStorage.getItem("twoA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("threeA")) &&
            JSON.parse(sessionStorage.getItem("threeA")).length > 0
          ) {
            this.checkedDansShow3 = JSON.parse(
              sessionStorage.getItem("threeA")
            );
          }
          var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          sessionStorage.setItem("fourA", JSON.stringify(dan1arr));
          this.checkedDansShow4 = dan1arr;
        } else if (maxnum == 4) {
          if (
            JSON.parse(sessionStorage.getItem("one")) &&
            JSON.parse(sessionStorage.getItem("one")).length > 0
          ) {
            this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
          }
          if (
            JSON.parse(sessionStorage.getItem("two")) &&
            JSON.parse(sessionStorage.getItem("two")).length > 0
          ) {
            this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
          }
          if (
            JSON.parse(sessionStorage.getItem("three")) &&
            JSON.parse(sessionStorage.getItem("three")).length > 0
          ) {
            this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
          }
          if (
            JSON.parse(sessionStorage.getItem("four")) &&
            JSON.parse(sessionStorage.getItem("four")).length > 0
          ) {
            this.checkedDans4 = JSON.parse(sessionStorage.getItem("four"));
          }

          this.checkedDans5 = selectArr; //从综合走势获取到的值

          this.new_num = [1, 2, 3, 4, 5];
          sessionStorage.setItem("five", JSON.stringify(selectArr));
          num.push(5);

          if (
            JSON.parse(sessionStorage.getItem("oneA")) &&
            JSON.parse(sessionStorage.getItem("oneA")).length > 0
          ) {
            this.checkedDansShow1 = JSON.parse(sessionStorage.getItem("oneA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("twoA")) &&
            JSON.parse(sessionStorage.getItem("twoA")).length > 0
          ) {
            this.checkedDansShow2 = JSON.parse(sessionStorage.getItem("twoA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("threeA")) &&
            JSON.parse(sessionStorage.getItem("threeA")).length > 0
          ) {
            this.checkedDansShow3 = JSON.parse(
              sessionStorage.getItem("threeA")
            );
          }
          if (
            JSON.parse(sessionStorage.getItem("fourA")) &&
            JSON.parse(sessionStorage.getItem("fourA")).length > 0
          ) {
            this.checkedDansShow4 = JSON.parse(sessionStorage.getItem("fourA"));
          }
          var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          sessionStorage.setItem("fiveA", JSON.stringify(dan1arr));
          this.checkedDansShow5 = dan1arr;
        } else if (maxnum == 5) {
          if (
            JSON.parse(sessionStorage.getItem("one")) &&
            JSON.parse(sessionStorage.getItem("one")).length > 0
          ) {
            this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
          }
          if (
            JSON.parse(sessionStorage.getItem("two")) &&
            JSON.parse(sessionStorage.getItem("two")).length > 0
          ) {
            this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
          }
          if (
            JSON.parse(sessionStorage.getItem("three")) &&
            JSON.parse(sessionStorage.getItem("three")).length > 0
          ) {
            this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
          }
          if (
            JSON.parse(sessionStorage.getItem("four")) &&
            JSON.parse(sessionStorage.getItem("four")).length > 0
          ) {
            this.checkedDans4 = JSON.parse(sessionStorage.getItem("four"));
          }
          if (
            JSON.parse(sessionStorage.getItem("five")) &&
            JSON.parse(sessionStorage.getItem("five")).length > 0
          ) {
            this.checkedDans5 = JSON.parse(sessionStorage.getItem("five"));
          }

          if (
            JSON.parse(sessionStorage.getItem("oneA")) &&
            JSON.parse(sessionStorage.getItem("oneA")).length > 0
          ) {
            this.checkedDansShow1 = JSON.parse(sessionStorage.getItem("oneA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("twoA")) &&
            JSON.parse(sessionStorage.getItem("twoA")).length > 0
          ) {
            this.checkedDansShow2 = JSON.parse(sessionStorage.getItem("twoA"));
          }
          if (
            JSON.parse(sessionStorage.getItem("threeA")) &&
            JSON.parse(sessionStorage.getItem("threeA")).length > 0
          ) {
            this.checkedDansShow3 = JSON.parse(
              sessionStorage.getItem("threeA")
            );
          }
          if (
            JSON.parse(sessionStorage.getItem("fourA")) &&
            JSON.parse(sessionStorage.getItem("fourA")).length > 0
          ) {
            this.checkedDansShow4 = JSON.parse(sessionStorage.getItem("fourA"));
          }

          if (
            JSON.parse(sessionStorage.getItem("fiveA")) &&
            JSON.parse(sessionStorage.getItem("fiveA")).length > 0
          ) {
            this.checkedDansShow5 = JSON.parse(sessionStorage.getItem("fiveA"));
          }
        }

        sessionStorage.setItem("numArr", JSON.stringify(num));
      } else {
        this.checkedDans1 = selectArr; //从综合走势获取到的值

        sessionStorage.setItem("one", JSON.stringify(selectArr));
        var ary = [1];
        this.new_num = [1];
        sessionStorage.setItem("numArr", JSON.stringify(ary));

        var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
        this.checkedDansShow1 = dan1arr;
        sessionStorage.setItem("oneA", JSON.stringify(dan1arr));
      }

      // if (selectArr.length > 0) {
      //   this.flag1 = selectArr.length;
      //   var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
      //   this.checkedDansShow1 = dan1arr;
      // }

      if (sessionStorage.getItem("big")) {
        var big = JSON.parse(sessionStorage.getItem("big")); //胆一
        for (var i = 0; i < big.length; i++) {
          if (big[i] == "0:5") {
            this.smallS = "5";
          } else if (big[i] == "1:4") {
            this.smallS = "4";
          } else if (big[i] == "2:3") {
            this.smallS = "3";
          } else if (big[i] == "3:2") {
            this.smallS = "2";
          } else if (big[i] == "5:0") {
            this.smallS = "0";
          } else if (big[i] == "4:1") {
            this.smallS = "1";
          }
          this.checkedSmall.push(this.smallS);
        }
      }
      if (sessionStorage.getItem("even")) {
        var evenn = JSON.parse(sessionStorage.getItem("even")); //胆一
        for (var i = 0; i < evenn.length; i++) {
          if (evenn[i] == "0:5") {
            this.evenS = "5";
          } else if (evenn[i] == "1:4") {
            this.evenS = "4";
          } else if (evenn[i] == "2:3") {
            this.evenS = "3";
          } else if (evenn[i] == "3:2") {
            this.evenS = "2";
          } else if (evenn[i] == "5:0") {
            this.evenS = "0";
          } else if (evenn[i] == "4:1") {
            this.evenS = "1";
          }
          this.checkedEven.push(this.evenS);
        }
      }
      if (sessionStorage.getItem("he")) {
        var oddd = JSON.parse(sessionStorage.getItem("he")); //胆一
        for (var i = 0; i < oddd.length; i++) {
          if (oddd[i] == "0:5") {
            this.oddS = "5";
          } else if (oddd[i] == "1:4") {
            this.oddS = "4";
          } else if (oddd[i] == "2:3") {
            this.oddS = "3";
          } else if (oddd[i] == "3:2") {
            this.oddS = "2";
          } else if (oddd[i] == "5:0") {
            this.oddS = "0";
          } else if (oddd[i] == "4:1") {
            this.oddS = "1";
          }
          this.checkedOdd.push(this.oddS);
        }
      }
    }
  },
  created() {
    this.vip();
  },

  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      // 拿到目标参数 to.query.id 去再次请求数据接口
      // 　　　　this.loadPageData(to.query.id)

      (this.checkAll1 = false), //胆1全选
        (this.checkAll2 = false),
        (this.checkAll3 = false),
        (this.checkAll4 = false),
        (this.checkAll5 = false),
        (this.checkedDans1 = []), //胆一全选的数值
        (this.dans1 = dan1), //胆一
        (this.checkedDans2 = []),
        (this.dans2 = dan2),
        (this.checkedDans3 = []),
        (this.dans3 = dan3),
        (this.checkedDans4 = []),
        (this.dans4 = dan4),
        (this.checkedDans5 = []),
        (this.dans5 = dan5),
        (this.checkedEven = []),
        (this.evens = even),
        (this.checkedOdd = []),
        (this.odds = odd),
        (this.checkedSmall = []),
        (this.smalls = small),
        (this.checkedHyphen = []),
        (this.hyphens = hyphen),
        (this.checkedDansShow1 = []), //胆一出现的次数
        (this.dansShow1 = danshow1), //胆一
        (this.checkedDansShow2 = []), //胆一出现的次数
        (this.dansShow2 = danshow2), //胆一
        (this.checkedDansShow3 = []), //胆一出现的次数
        (this.dansShow3 = danshow3), //胆一
        (this.checkedDansShow4 = []), //胆一出现的次数
        (this.dansShow4 = danshow4), //胆一
        (this.checkedDansShow5 = []), //胆一出现的次数
        (this.dansShow5 = danshow5), //胆一
        (this.returnArr = ""), //做号的结果
        (this.returnArrO = ""), //做号的结果,用于由逗号切换为空格
        (this.totalShow = false),
        (this.total = 0);
      if (selectArr == undefined) {
        this.flag1 = 0;
      }

      if (sessionStorage.getItem("selectarr")) {
        var selectArr = JSON.parse(sessionStorage.getItem("selectarr")); //胆一
        // 判断已选中的胆

        if (from.name == "runchart" && from) {
          if (
            sessionStorage.getItem("numArr") &&
            JSON.parse(sessionStorage.getItem("numArr").length > 0)
          ) {
            var num = JSON.parse(sessionStorage.getItem("numArr"));

            // var num = this.new_num
            console.log(num.length, 1111);
            if (num.length == 0) {
              this.checkedDans1 = selectArr; //从综合走势获取到的值

              sessionStorage.setItem("one", JSON.stringify(selectArr));

              var ary = [1];
              this.new_num = [1];
              sessionStorage.setItem("numArr", JSON.stringify(ary));
              sessionStorage.setItem("oneA", JSON.stringify(dan1arr));
              var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
              this.checkedDansShow1 = dan1arr;
              return;
            }
            var maxnum = Math.max(...num);

            if (maxnum == 1) {
              console.log(maxnum, 111111);
              this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
              this.checkedDans2 = selectArr; //从综合走势获取到的值

              num.push(2);
              this.new_num = [1, 2];
              sessionStorage.setItem("two", JSON.stringify(selectArr));

              var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
              sessionStorage.setItem("twoA", JSON.stringify(dan1arr));
              this.checkedDansShow1 = JSON.parse(
                sessionStorage.getItem("oneA")
              );
              this.checkedDansShow2 = dan1arr;
            } else if (maxnum == 2) {
              if (
                JSON.parse(sessionStorage.getItem("one")) &&
                JSON.parse(sessionStorage.getItem("one")).length > 0
              ) {
                this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
              }
              if (
                JSON.parse(sessionStorage.getItem("two")) &&
                JSON.parse(sessionStorage.getItem("two")).length > 0
              ) {
                this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
              }

              this.checkedDans3 = selectArr; //从综合走势获取到的值
              console.log(this.checkedDans3);
              this.new_num = [1, 2, 3];
              num.push(3);

              sessionStorage.setItem("three", JSON.stringify(selectArr));

              if (
                JSON.parse(sessionStorage.getItem("oneA")) &&
                JSON.parse(sessionStorage.getItem("oneA")).length > 0
              ) {
                this.checkedDansShow1 = JSON.parse(
                  sessionStorage.getItem("oneA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("twoA")) &&
                JSON.parse(sessionStorage.getItem("twoA")).length > 0
              ) {
                this.checkedDansShow2 = JSON.parse(
                  sessionStorage.getItem("twoA")
                );
              }

              var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
              sessionStorage.setItem("threeA", JSON.stringify(dan1arr));
              this.checkedDansShow3 = dan1arr;
            } else if (maxnum == 3) {
              if (
                JSON.parse(sessionStorage.getItem("one")) &&
                JSON.parse(sessionStorage.getItem("one")).length > 0
              ) {
                this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
              }
              if (
                JSON.parse(sessionStorage.getItem("two")) &&
                JSON.parse(sessionStorage.getItem("two")).length > 0
              ) {
                this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
              }
              if (
                JSON.parse(sessionStorage.getItem("three")) &&
                JSON.parse(sessionStorage.getItem("three")).length > 0
              ) {
                this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
              }

              this.checkedDans4 = selectArr; //从综合走势获取到的值

              this.new_num = [1, 2, 3, 4];
              sessionStorage.setItem("four", JSON.stringify(selectArr));
              num.push(4);
              if (
                JSON.parse(sessionStorage.getItem("oneA")) &&
                JSON.parse(sessionStorage.getItem("oneA")).length > 0
              ) {
                this.checkedDansShow1 = JSON.parse(
                  sessionStorage.getItem("oneA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("twoA")) &&
                JSON.parse(sessionStorage.getItem("twoA")).length > 0
              ) {
                this.checkedDansShow2 = JSON.parse(
                  sessionStorage.getItem("twoA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("threeA")) &&
                JSON.parse(sessionStorage.getItem("threeA")).length > 0
              ) {
                this.checkedDansShow3 = JSON.parse(
                  sessionStorage.getItem("threeA")
                );
              }
              var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
              sessionStorage.setItem("fourA", JSON.stringify(dan1arr));
              this.checkedDansShow4 = dan1arr;
            } else if (maxnum == 4) {
              if (
                JSON.parse(sessionStorage.getItem("one")) &&
                JSON.parse(sessionStorage.getItem("one")).length > 0
              ) {
                this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
              }
              if (
                JSON.parse(sessionStorage.getItem("two")) &&
                JSON.parse(sessionStorage.getItem("two")).length > 0
              ) {
                this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
              }
              if (
                JSON.parse(sessionStorage.getItem("three")) &&
                JSON.parse(sessionStorage.getItem("three")).length > 0
              ) {
                this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
              }
              if (
                JSON.parse(sessionStorage.getItem("four")) &&
                JSON.parse(sessionStorage.getItem("four")).length > 0
              ) {
                this.checkedDans4 = JSON.parse(sessionStorage.getItem("four"));
              }

              this.checkedDans5 = selectArr; //从综合走势获取到的值

              this.new_num = [1, 2, 3, 4, 5];
              sessionStorage.setItem("five", JSON.stringify(selectArr));
              num.push(5);

              if (
                JSON.parse(sessionStorage.getItem("oneA")) &&
                JSON.parse(sessionStorage.getItem("oneA")).length > 0
              ) {
                this.checkedDansShow1 = JSON.parse(
                  sessionStorage.getItem("oneA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("twoA")) &&
                JSON.parse(sessionStorage.getItem("twoA")).length > 0
              ) {
                this.checkedDansShow2 = JSON.parse(
                  sessionStorage.getItem("twoA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("threeA")) &&
                JSON.parse(sessionStorage.getItem("threeA")).length > 0
              ) {
                this.checkedDansShow3 = JSON.parse(
                  sessionStorage.getItem("threeA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("fourA")) &&
                JSON.parse(sessionStorage.getItem("fourA")).length > 0
              ) {
                this.checkedDansShow4 = JSON.parse(
                  sessionStorage.getItem("fourA")
                );
              }
              var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
              sessionStorage.setItem("fiveA", JSON.stringify(dan1arr));
              this.checkedDansShow5 = dan1arr;
            } else if (maxnum == 5) {
              if (
                JSON.parse(sessionStorage.getItem("one")) &&
                JSON.parse(sessionStorage.getItem("one")).length > 0
              ) {
                this.checkedDans1 = JSON.parse(sessionStorage.getItem("one"));
              }
              if (
                JSON.parse(sessionStorage.getItem("two")) &&
                JSON.parse(sessionStorage.getItem("two")).length > 0
              ) {
                this.checkedDans2 = JSON.parse(sessionStorage.getItem("two")); //从综合走势获取到的值
              }
              if (
                JSON.parse(sessionStorage.getItem("three")) &&
                JSON.parse(sessionStorage.getItem("three")).length > 0
              ) {
                this.checkedDans3 = JSON.parse(sessionStorage.getItem("three"));
              }
              if (
                JSON.parse(sessionStorage.getItem("four")) &&
                JSON.parse(sessionStorage.getItem("four")).length > 0
              ) {
                this.checkedDans4 = JSON.parse(sessionStorage.getItem("four"));
              }
              if (
                JSON.parse(sessionStorage.getItem("five")) &&
                JSON.parse(sessionStorage.getItem("five")).length > 0
              ) {
                this.checkedDans5 = JSON.parse(sessionStorage.getItem("five"));
              }

              if (
                JSON.parse(sessionStorage.getItem("oneA")) &&
                JSON.parse(sessionStorage.getItem("oneA")).length > 0
              ) {
                this.checkedDansShow1 = JSON.parse(
                  sessionStorage.getItem("oneA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("twoA")) &&
                JSON.parse(sessionStorage.getItem("twoA")).length > 0
              ) {
                this.checkedDansShow2 = JSON.parse(
                  sessionStorage.getItem("twoA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("threeA")) &&
                JSON.parse(sessionStorage.getItem("threeA")).length > 0
              ) {
                this.checkedDansShow3 = JSON.parse(
                  sessionStorage.getItem("threeA")
                );
              }
              if (
                JSON.parse(sessionStorage.getItem("fourA")) &&
                JSON.parse(sessionStorage.getItem("fourA")).length > 0
              ) {
                this.checkedDansShow4 = JSON.parse(
                  sessionStorage.getItem("fourA")
                );
              }

              if (
                JSON.parse(sessionStorage.getItem("fiveA")) &&
                JSON.parse(sessionStorage.getItem("fiveA")).length > 0
              ) {
                this.checkedDansShow5 = JSON.parse(
                  sessionStorage.getItem("fiveA")
                );
              }
            }

            sessionStorage.setItem("numArr", JSON.stringify(num));
          } else {
            this.checkedDans1 = selectArr; //从综合走势获取到的值

            sessionStorage.setItem("one", JSON.stringify(selectArr));
            var ary = [1];
            this.new_num = [1];
            sessionStorage.setItem("numArr", JSON.stringify(ary));

            var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
            this.checkedDansShow1 = dan1arr;
            sessionStorage.setItem("oneA", JSON.stringify(dan1arr));
          }

          // if (selectArr.length > 0) {
          //   this.flag1 = selectArr.length;
          //   var dan1arr = JSON.parse(sessionStorage.getItem("dan1arr"));
          //   this.checkedDansShow1 = dan1arr;
          // }
        }

        if (sessionStorage.getItem("big")) {
          var big = JSON.parse(sessionStorage.getItem("big")); //胆一
          for (var i = 0; i < big.length; i++) {
            if (big[i] == "0:5") {
              this.smallS = "5";
            } else if (big[i] == "1:4") {
              this.smallS = "4";
            } else if (big[i] == "2:3") {
              this.smallS = "3";
            } else if (big[i] == "3:2") {
              this.smallS = "2";
            } else if (big[i] == "5:0") {
              this.smallS = "0";
            } else if (big[i] == "4:1") {
              this.smallS = "1";
            }
            this.checkedSmall.push(this.smallS);
          }
        }
        if (sessionStorage.getItem("even")) {
          var evenn = JSON.parse(sessionStorage.getItem("even")); //胆一
          for (var i = 0; i < evenn.length; i++) {
            if (evenn[i] == "0:5") {
              this.evenS = "5";
            } else if (evenn[i] == "1:4") {
              this.evenS = "4";
            } else if (evenn[i] == "2:3") {
              this.evenS = "3";
            } else if (evenn[i] == "3:2") {
              this.evenS = "2";
            } else if (evenn[i] == "5:0") {
              this.evenS = "0";
            } else if (evenn[i] == "4:1") {
              this.evenS = "1";
            }
            this.checkedEven.push(this.evenS);
          }
        }
        if (sessionStorage.getItem("he")) {
          var oddd = JSON.parse(sessionStorage.getItem("he")); //胆一
          for (var i = 0; i < oddd.length; i++) {
            if (oddd[i] == "0:5") {
              this.oddS = "5";
            } else if (oddd[i] == "1:4") {
              this.oddS = "4";
            } else if (oddd[i] == "2:3") {
              this.oddS = "3";
            } else if (oddd[i] == "3:2") {
              this.oddS = "2";
            } else if (oddd[i] == "5:0") {
              this.oddS = "0";
            } else if (oddd[i] == "4:1") {
              this.oddS = "1";
            }
            this.checkedOdd.push(this.oddS);
          }
        }
      }

      // this.checkedSmall = big; //从综合走势获取到的值
    }
  },

  methods: {
    // 胆1-胆5全选
    handleCheckAllChange1(val) {
      this.checkedDans1 = val ? dan1 : [];
    },
    handleCheckAllChange2(val) {
      this.checkedDans2 = val ? dan2 : [];
    },
    handleCheckAllChange3(val) {
      this.checkedDans3 = val ? dan3 : [];
    },
    handleCheckAllChange4(val) {
      this.checkedDans4 = val ? dan4 : [];
    },
    handleCheckAllChange5(val) {
      this.checkedDans5 = val ? dan5 : [];
    },
    // 胆1到胆5的每个复选值
    handleCheckedCitiesChange1(value) {
      console.log(value);
      this.checkedDans1 = value ? value : [];
      sessionStorage.setItem('one',JSON.stringify(this.checkedDans1))
      //  var num = JSON.parse(sessionStorage.getItem("numArr"));
      //  console.log(num)
      //  if(value){
      //    if(num.indexOf("1")==-1||num.indexOf(1)==-1){
      //      num.push(1)
      //      console.log('123')
      //    };

      //  }else{
      //     for(var i=0;i<num.length;i++){
      //     if(num[i].i==1){
      //       num.splice(i,1)
      //     }
      //   }
      //  }

      // sessionStorage.setItem('numArr',JSON.stringify(num))

      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.dans1.length;
    },
    handleCheckedCitiesChange2(value) {
      console.log(value);
      this.checkedDans2 = value ? value : [];
      //  var num = JSON.parse(sessionStorage.getItem("numArr"));
      //  sessionStorage.setItem('two',JSON.stringify(this.checkedDans2))
      //   if(value){
      //    if(num.indexOf("2")==-1||num.indexOf(2)==-1){
      //      num.push(2)
      //    };

      //  }else{
      //     for(var i=0;i<num.length;i++){
      //     if(num[i].i==2){
      //       num.splice(i,1)
      //     }
      //   }
      //  }
       sessionStorage.setItem('numArr',JSON.stringify(this.checkedDans2))
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.dans2.length;
    },
    handleCheckedCitiesChange3(value) {
      console.log(value);
      this.checkedDans3 = value ? value : [];
      var num = JSON.parse(sessionStorage.getItem("numArr"));
      //  sessionStorage.setItem('three',JSON.stringify(this.checkedDans3))
      //   if(value){
      //    if(num.indexOf("3")==-1||num.indexOf(3)==-1){
      //      num.push(3)
      //    };

      //  }else{
      //     for(var i=0;i<num.length;i++){
      //     if(num[i].i==3){
      //       num.splice(i,1)
      //     }
      //   }
      //  }
        sessionStorage.setItem('numArr',JSON.stringify(this.checkedDans3))
      let checkedCount = value.length;
      this.checkAll3 = checkedCount === this.dans3.length;
    },
    handleCheckedCitiesChange4(value) {
      console.log(value);
      this.checkedDans4 = value ? value : [];
      sessionStorage.setItem("four", JSON.stringify(this.checkedDans4));
      let checkedCount = value.length;
      this.checkAll4 = checkedCount === this.dans4.length;
    },
    handleCheckedCitiesChange5(value) {
      console.log(value);
      this.checkedDans5 = value ? value : [];
      sessionStorage.setItem("five", JSON.stringify(this.checkedDans5));
      let checkedCount = value.length;
      this.checkAll5 = checkedCount === this.dans5.length;
    },
    // 胆1到胆5的每个复选值出现次数
    handleCheckedCitiesShow1(value) {
      console.log(value, "bbbbbbbbb");
      this.checkedDansShow1 = value ? value : [];
    },
    handleCheckedCitiesShow2(value) {
      console.log(value);
      this.checkedDansShow2 = value ? value : [];
    },
    handleCheckedCitiesShow3(value) {
      console.log(value);
      this.checkedDansShow3 = value ? value : [];
    },
    handleCheckedCitiesShow4(value) {
      console.log(value);
      this.checkedDansShow4 = value ? value : [];
    },
    handleCheckedCitiesShow5(value) {
      console.log(value);
      this.checkedDansShow5 = value ? value : [];
    },
    //偶数
    handleEven(value) {
      this.checkedEven = value ? value : [];
    },
    //合数
    handleOdd(value) {
      this.checkedOdd = value ? value : [];
    },
    //小数
    handleSmall(value) {
      this.checkedSmall = value ? value : [];
    },
    //连数
    handleHyphen(value) {
      this.checkedHyphen = value ? value : [];
    },

    //清
    clearAll(options) {
      if (options == "one") {
        this.checkAll1 = false;
        this.checkedDans1 = [];

        this.checkedDansShow1 = [];
        sessionStorage.removeItem("one");
        sessionStorage.removeItem("oneA");
        console.log(JSON.parse(sessionStorage.getItem("numArr")));
        var num = this.new_num; //JSON.parse(sessionStorage.getItem("numArr"));
        for (var i = 0; i < num.length; i++) {
          console.log(num[i]);
          if (num[i] == 1) {
            console.log(num[i]);
            num.splice(i, 1);
          }
        }
        console.log(num);
        sessionStorage.setItem("numArr", JSON.stringify(num));
      }
      if (options == "two") {
        this.checkAll2 = false;
        this.checkedDans2 = [];
        this.checkedDansShow2 = [];
        sessionStorage.removeItem("two");
        sessionStorage.removeItem("twoA");
        var num = JSON.parse(sessionStorage.getItem("numArr"));
        for (var i = 0; i < num.length; i++) {
          if (num[i] == 2) {
            num.splice(i, 1);
          }
        }
        sessionStorage.setItem("numArr", JSON.stringify(num));
      }
      if (options == "three") {
        this.checkAll3 = false;
        this.checkedDans3 = [];
        this.checkedDansShow3 = [];
        sessionStorage.removeItem("three");
        sessionStorage.removeItem("threeA");
        var num = JSON.parse(sessionStorage.getItem("numArr"));
        for (var i = 0; i < num.length; i++) {
          if (num[i] == 3) {
            num.splice(i, 1);
          }
        }
        sessionStorage.setItem("numArr", JSON.stringify(num));
      }
      if (options == "four") {
        this.checkAll4 = false;
        this.checkedDans4 = [];
        this.checkedDansShow4 = [];
        sessionStorage.removeItem("four");
        sessionStorage.removeItem("fourA");
        var num = JSON.parse(sessionStorage.getItem("numArr"));
        for (var i = 0; i < num.length; i++) {
          if (num[i] == 4) {
            num.splice(i, 1);
          }
        }
        sessionStorage.setItem("numArr", JSON.stringify(num));
      }
      if (options == "five") {
        this.checkAll5 = false;
        this.checkedDans5 = [];
        this.checkedDansShow5 = [];
        sessionStorage.removeItem("five");
        sessionStorage.removeItem("fiveA");
        var num = JSON.parse(sessionStorage.getItem("numArr"));
        for (var i = 0; i < num.length; i++) {
          if (num[i] == 5) {
            num.splice(i, 1);
          }
        }
        sessionStorage.setItem("numArr", JSON.stringify(num));
      }
      this.new_num = num;
      if (options == "other") {
        this.checkedEven = [];
        this.checkedOdd = [];
        this.checkedSmall = [];
        this.checkedHyphen = [];
      }
    },
    // 生成号码
    sure() {
      this.loading = true;
      let pramp = { token: localStorage.getItem("token") };
      if (this.checkedDansShow1.length > 0) {
        pramp.dan1cx = this.checkedDansShow1;
      }

      if (this.checkedDansShow2.length > 0) {
        pramp.dan2cx = this.checkedDansShow2;
      }
      if (this.checkedDansShow3.length > 0) {
        pramp.dan3cx = this.checkedDansShow3;
      }
      if (this.checkedDansShow4.length > 0) {
        pramp.dan4cx = this.checkedDansShow4;
      }
      if (this.checkedDansShow5.length > 0) {
        pramp.dan5cx = this.checkedDansShow5;
      }

      if (this.checkedDans1.length > 0) {
        pramp.dan1 = this.checkedDans1;
      }
      if (this.checkedDans2.length > 0) {
        pramp.dan2 = this.checkedDans2;
      }
      if (this.checkedDans3.length > 0) {
        pramp.dan3 = this.checkedDans3;
      }
      if (this.checkedDans4.length > 0) {
        pramp.dan4 = this.checkedDans4;
      }
      if (this.checkedDans5.length > 0) {
        pramp.dan5 = this.checkedDans5;
      }

      if (this.checkedSmall.length > 0) {
        console.log(this.checkedSmall, "bbbb");
        pramp.decimal = this.checkedSmall;
      }
      if (this.checkedEven.length > 0) {
        pramp.even = this.checkedEven;
      }
      if (this.checkedOdd.length > 0) {
        pramp.composite = this.checkedOdd;
      }
      if (this.checkedHyphen.length > 0) {
        pramp.lianhao = this.checkedHyphen;
      }

      var that = this;

      this.$axios({
        method: "post",
        url: this.url + "Caipiao/zuohao",
        params: pramp
      }).then(res => {
        if (res.data.data.data.length > 0) {
          that.returnArr = res.data.data.data;
          that.returnArrO = res.data.data.data;
          that.total = res.data.data.total;
          that.totalShow = true;
        } else {
          that.returnArr = "暂无数据";
          that.totalShow = true;
        }
      });
      console.log(this.evenS);
      console.log(this.smallS);
      console.log(this.oddS);
      sessionStorage.removeItem("big");
      sessionStorage.removeItem("he");
      sessionStorage.removeItem("even");
      sessionStorage.removeItem("selectarr");
      sessionStorage.removeItem("dan1arr");
      sessionStorage.removeItem("numArr");
      sessionStorage.removeItem("one");
      sessionStorage.removeItem("two");
      sessionStorage.removeItem("three");
      sessionStorage.removeItem("four");
      sessionStorage.removeItem("five");
      sessionStorage.removeItem("oneA");
      sessionStorage.removeItem("twoA");
      sessionStorage.removeItem("threeA");
      sessionStorage.removeItem("fourA");
      sessionStorage.removeItem("fiveA");
    },
    //复制到智能数据
    copy() {
      // var Url2 = document.getElementById("textValue").value;
      var Url2 = this.returnArr;
      var oInput = document.createElement("textarea");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
    },
    // 前往智能数据的按钮
    toData() {
      this.$store.state.moreArr = this.returnArr;
      // sessionStorage.setItem('zuohao',this.returnArr)
      this.copy();

      this.$router.push({ path: "/intelligentdata" });
    },
    // 以逗号分隔
    replaceDouHao() {
      if (!this.returnArr) {
        return;
      }

      this.returnArr = this.returnArr.replace(/ /g, ",");
    },
    // 以空格分隔
    replaceKongGe() {
      if (!this.returnArr) {
        return;
      }
      this.returnArr = this.returnArrO;
    }
  }
};
</script>

<style lang="less" scoped>
//label复选框
.block label {
  font-weight: 400;
  font-size: 14px;
  color: #606266;
  width: 40px;
  margin-bottom: 4px;
  display: inline-block;
  position: relative;
  text-align: center;
}
.block {
  display: inline-block !important;
}
input[type="checkbox"] {
  // width: 10px;
  // height: 10px;
  // display: inline-block;
  // text-align: center;
  // vertical-align: middle;
  // line-height: 18px;
  // position: relative;
  // margin: 0 5px 0 0;
  background-color: #fff;
  -webkit-appearance: none;
  width: 0;
  height: 0;
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  background: #fff;
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}
input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #409eff;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 14px;
  border-color: #409eff;
  color: #fff;
  font-size: 14px;
  margin: auto;
  display: flex;
  align-items: center;
}

.table-container {
  .opBtns {
    margin-bottom: 20px;
  }
  .searchItem {
    width: 100%;
  }
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
