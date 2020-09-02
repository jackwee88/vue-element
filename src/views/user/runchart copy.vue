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
      <div style="width:99%;overflow:auto;margin:0 auto">
        <!-- <el-table :data="tableData" style="width: 100%;text-align:center;overflow: auto;"  :max-height="curHeight" stripe :row-style="tableRowStyle"
          :header-cell-style="tableHeaderColor" :cell-class-name="addClass" >
          <el-table-column prop="issueno" label="期号" height="80" width="100"></el-table-column>
          <el-table-column prop="show_number" label="开奖号码" width="120"></el-table-column>

          <el-table-column label="开奖号码发布">
            <el-table-column prop="obj.one" label="01" class="active-td"></el-table-column>
            <el-table-column prop="obj.two" label="02"></el-table-column>
            <el-table-column prop="obj.three" label="03"></el-table-column>
            <el-table-column prop="obj.four" label="04"></el-table-column>
            <el-table-column prop="obj.five" label="05"></el-table-column>
            <el-table-column prop="obj.six" label="06"></el-table-column>
            <el-table-column prop="obj.seven" label="07"></el-table-column>
            <el-table-column prop="obj.eight" label="08"></el-table-column>
            <el-table-column prop="obj.nine" label="09"></el-table-column>
            <el-table-column prop="obj.ten" label="10"></el-table-column>
            <el-table-column prop="obj.ten1" label="11"></el-table-column>
          </el-table-column>
          <el-table-column label="大小比">
            <el-table-column prop="obj1.05" label="0:5"></el-table-column>
            <el-table-column prop="obj1.14" label="1:4"></el-table-column>
            <el-table-column prop="obj1.23" label="2:3"></el-table-column>
            <el-table-column prop="obj1.41" label="4:1"></el-table-column>
            <el-table-column prop="obj1.50" label="5:0"></el-table-column>
          </el-table-column>
          <el-table-column label="奇偶比">
            <el-table-column prop="obj1.05" label="0:5"></el-table-column>
            <el-table-column prop="obj1.14" label="1:4"></el-table-column>
            <el-table-column prop="obj1.23" label="2:3"></el-table-column>
            <el-table-column prop="obj1.41" label="4:1"></el-table-column>
            <el-table-column prop="obj1.50" label="5:0"></el-table-column>
          </el-table-column>
          <el-table-column label="质合比">
            <el-table-column prop="obj1.05" label="0:5"></el-table-column>
            <el-table-column prop="obj1.14" label="1:4"></el-table-column>
            <el-table-column prop="obj1.23" label="2:3"></el-table-column>
            <el-table-column prop="obj1.41" label="4:1"></el-table-column>
            <el-table-column prop="obj1.50" label="5:0"></el-table-column>
          </el-table-column>
        </el-table>-->
      </div>
    </div>
    <div style="overflow:auto;margin:0 auto" class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%;text-align:center;overflow-x: auto"
        :max-height="curHeight"
        stripe
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        :cell-class-name="addClass"
      >
        <el-table-column prop="issueno" label="期号" width="80" height="80"></el-table-column>
        <el-table-column prop="show_number" label="开奖号码" width="110"></el-table-column>

        <el-table-column label="开奖号码发布">
          <el-table-column prop="obj.one" label="01" class="active-td"></el-table-column>
          <el-table-column prop="obj.two" label="02"></el-table-column>
          <el-table-column prop="obj.three" label="03"></el-table-column>
          <el-table-column prop="obj.four" label="04"></el-table-column>
          <el-table-column prop="obj.five" label="05"></el-table-column>
          <el-table-column prop="obj.six" label="06"></el-table-column>
          <el-table-column prop="obj.seven" label="07"></el-table-column>
          <el-table-column prop="obj.eight" label="08"></el-table-column>
          <el-table-column prop="obj.nine" label="09"></el-table-column>
          <el-table-column prop="obj.ten" label="10"></el-table-column>
          <el-table-column prop="obj.ten1" label="11"></el-table-column>
        </el-table-column>
        <el-table-column label="大小比">
          <el-table-column prop="obj1.05" label="0:5"></el-table-column>
          <el-table-column prop="obj1.14" label="1:4"></el-table-column>
          <el-table-column prop="obj1.23" label="2:3"></el-table-column>
          <el-table-column prop="obj1.41" label="4:1"></el-table-column>
          <el-table-column prop="obj1.50" label="5:0"></el-table-column>
        </el-table-column>
        <el-table-column label="奇偶比">
          <el-table-column prop="obj1.05" label="0:5"></el-table-column>
          <el-table-column prop="obj1.14" label="1:4"></el-table-column>
          <el-table-column prop="obj1.23" label="2:3"></el-table-column>
          <el-table-column prop="obj1.41" label="4:1"></el-table-column>
          <el-table-column prop="obj1.50" label="5:0"></el-table-column>
        </el-table-column>
        <el-table-column label="质合比">
          <el-table-column prop="obj1.05" label="0:5"></el-table-column>
          <el-table-column prop="obj1.14" label="1:4"></el-table-column>
          <el-table-column prop="obj1.23" label="2:3"></el-table-column>
          <el-table-column prop="obj1.41" label="4:1"></el-table-column>
          <el-table-column prop="obj1.50" label="5:0"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
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
      //福建11选5
      options1: [],
      value1: "",
      curHeight: ""
    };
  },
  created() {
    this.vip();
    var h = document.documentElement.clientHeight || document.body.clientHeight;

    this.curHeight = h - 150; //减去页面上固定高度height
    this.cate();
  },
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
  methods: {
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
        var len = res.data.data.length;
        var arr = [];
        for (var i = 0; i < len; i++) {
          var obj = {
            one: "01",
            two: "02",
            three: "03",
            four: "04",
            five: "05",
            six: "06",
            seven: "07",
            eight: "08",
            nine: "09",
            ten: "10",
            ten1: "11"
          };
          var obj1 = {
            "05": "0:5",
            "14": "1:4",
            "23": "2:3",
            "41": "4:1",
            "50": "5:0"
          };

          res.data.data[i].obj = obj;
          res.data.data[i].obj1 = obj1;
        }
        //  res.data.data.push({'issueno':'出现'},{'issueno':'出现'},{'issueno':'出现'})
        that.tableData = res.data.data;
      });
    },
    // rowIndex是第几行，columnIndex是第几列
    addClass({ row, column, rowIndex, columnIndex }) {
      if (column.label == "01" && row.num_array[0] == true) {
        return "cell-grey";
      }
      if (column.label == "02" && row.num_array[1] == true) {
        return "cell-grey";
      }
      if (column.label == "03" && row.num_array[2] == true) {
        return "cell-grey";
      }
      if (column.label == "04" && row.num_array[3] == true) {
        return "cell-grey";
      }
      if (column.label == "05" && row.num_array[4] == true) {
        return "cell-grey";
      }
      if (column.label == "06" && row.num_array[5] == true) {
        return "cell-grey";
      }
      if (column.label == "07" && row.num_array[6] == true) {
        return "cell-grey";
      }
      if (column.label == "08" && row.num_array[7] == true) {
        return "cell-grey";
      }

      if (column.label == "09" && row.num_array[8] == true) {
        return "cell-grey";
      }
      if (column.label == "10" && row.num_array[9] == true) {
        return "cell-grey";
      }
      if (column.label == "11" && row.num_array[10] == true) {
        return "cell-grey";
      }
      //  积偶

      if (column.label == "0:5" && row.odd_even_array[0] == true) {
        return "cell-grey";
      }
      if (column.label == "1:4" && row.odd_even_array[1] == true) {
        return "cell-grey";
      }
      if (column.label == "2:3" && row.odd_even_array[2] == true) {
        return "cell-grey";
      }
      if (column.label == "4:1" && row.odd_even_array[3] == true) {
        return "cell-grey";
      }
      if (column.label == "5:0" && row.odd_even_array[4] == true) {
        return "cell-grey";
      }

      if (column.label == "0:5" && row.big_small_array[0] == true) {
        return "cell-grey";
      }
      if (column.label == "1:4" && row.big_small_array[1] == true) {
        return "cell-grey";
      }
      if (column.label == "2:3" && row.big_small_array[2] == true) {
        return "cell-grey";
      }
      if (column.label == "4:1" && row.big_small_array[3] == true) {
        return "cell-grey";
      }
      if (column.label == "5:0" && row.big_small_array[4] == true) {
        return "cell-grey";
      }
      if (column.label == "0:5" && row.prime_composite_array[0] == true) {
        return "cell-grey";
      }
      if (column.label == "1:4" && row.prime_composite_array[1] == true) {
        return "cell-grey";
      }
      if (column.label == "2:3" && row.prime_composite_array[2] == true) {
        return "cell-grey";
      }
      if (column.label == "4:1" && row.prime_composite_array[3] == true) {
        return "cell-grey";
      }
      if (column.label == "5:0" && row.prime_composite_array[4] == true) {
        return "cell-grey";
      }
    },
    //表格行样式
    tableRowStyle({ row, rowIndex }) {
      return "background-color:#F5F5F5;font-size:14px;color:#333;height:40px;border-color:#D7D7D7";
    },
    //表头行样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return "background-color:#FFE8A9;color:#333;font-size:14px;text-align:center;height:40px;border-color:#D7D7D7";
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
      //console.log(v);
      this.number = v;
      //console.log(this.number);
    },
    // 切换任选5等
    caipiaoidChange(v) {
      this.caipiaoid = v;
    },
    typeSure() {
      this.getData();
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
      });
    }
  }
};
</script>
<style scoped>
.el-table .cell {
  text-align: center !important;
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
</style>