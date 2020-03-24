<template>
  <div :class="className" :id="id" style="width:100%;height:50vh"></div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      dataQihao: []
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var that = this;
      var data = sessionStorage.getItem("missedMore");
      var obj = {
        token: localStorage.getItem("token")
      };
      if (sessionStorage.getItem("limit")) {
        obj.limit = sessionStorage.getItem("limit");
      } else {
        obj.limit = 100;
      }
      if (sessionStorage.getItem("caipiaoidmore")) {
        obj.caipiaoid = sessionStorage.getItem("caipiaoidmore");
      }
      var array_new = [];
      if (data) {
        var newData = data.split("\n");

        for (var i = 0; i < newData.length; i++) {
          array_new.push(newData[i]);
        }

        obj.array = array_new;
        this.$axios({
          method: "post",
          url: this.url + "Caipiao/missed",
          params: obj,
          traditional: true //必须指定为true
        }).then(res => {
          var arr = [];
          var arrQihao = [];
          if (res.data.data.max) {
            this.$store.state.max = res.data.data.max;
            this.$store.state.total = res.data.data.total;
          }

          if (res.data.data.list) {
            res.data.data.list.forEach(function(key) {
              arr.push(key.num);

              arrQihao.push(key.number);

              // sessionStorage.removeItem("missedMore");

              // sessionStorage.removeItem("limit");

              // sessionStorage.removeItem("caipiaoidmore");
              //  this.$store.state.moreArr ='';
              // this.$store.state.total = res.data.data.total;
            });
          }
          that.data = arr;
          that.dataQihao = arrQihao;
          this.chart = echarts.init(document.getElementById(this.id));
          if (this.data.length == 0) {
            that.dataQihao = ["暂无数据"];
            this.chart.setOption({
              backgroundColor: "#fefdf9",
              title: {
                top: 20,
                text: "",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 16,
                  color: "#F1F1F3"
                },
                left: "1%"
              },
              tooltip: {
                trigger: "axis"
              },

              xAxis: [
                {
                  type: "category",
                  minInterval: 4,
                  data: that.dataQihao,
                  boundaryGap: true,
                  show: true,
                  interval: 0,
                  rotate: 40,
                  textStyle: {
                    color: "#333"
                  },
                  formatter: function() {
                    return "";
                  },
                  showAllSymbol: true,
                  interval: {
                    min: 100
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",

                  scale: true,

                  axisLabel: {
                    axisLine: {
                      lineStyle: {
                        color: "#4A5675" // width:2
                      }
                    },
                    name: "百分比",
                    type: "value",
                    splitLine: {
                      show: false
                    },
                    scale: true
                  }
                }
              ],
              series: [
                {
                  name: "遗漏值",
                  type: "line",
                  data: that.data,
                  itemStyle: { normal: { label: { show: true } } },
                  showAllSymbol: true
                }
              ]
            });
            return;
          }
          if (this.data.length > 10) {
            this.chart.setOption({
              backgroundColor: "#fefdf9",
              title: {
                top: 20,
                text: "",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 16,
                  color: "#F1F1F3"
                },
                left: "1%"
              },
              tooltip: {
                trigger: "axis"
              },
              // dataZoom: [
              //   {
              //     type: "slider",
              //     show: true,
              //     start: 94,
              //     end: 15000,
              //     handleSize: 8
              //   }
              // ],
              dataZoom: [
                {
                  type: "slider",
                  show: true,
                  start: 94,
                  end: 100,
                  handleSize: 8
                },
                {
                  type: "inside",
                  start: 94,
                  end: 100
                },
                {
                  type: "slider",
                  show: true,
                  yAxisIndex: 0,
                  filterMode: "empty",
                  width: 12,
                  height: "70%",
                  handleSize: 8,
                  showDataShadow: false,
                  left: "93%"
                }
              ],
              xAxis: [
                {
                  type: "category",
                  data: that.dataQihao,
                  boundaryGap: true,
                  show: false,
                  rotate: 40,
                  textStyle: {
                    color: "#333"
                  },

                  showAllSymbol: true,
                  minInterval: 200,
                  axisLabel: {
                    interval: 300
                  },
                  splitNumber: 5
                }
              ],
              yAxis: [
                {
                  type: "value",

                  scale: true,

                  axisLabel: {
                    axisLine: {
                      lineStyle: {
                        color: "#4A5675" // width:2
                      }
                    },
                    name: "百分比",
                    type: "value",
                    splitLine: {
                      show: false
                    },
                    scale: true
                  }
                }
              ],
              series: [
                {
                  name: "遗漏值",
                  type: "line",
                  data: that.data,
                  itemStyle: {
                    normal: {
                      color: "#3a99d9"
                    }
                  },
                  itemStyle: { normal: { label: { show: true } } },
                  showAllSymbol: true
                }
              ]
            });
          } else {
            this.chart.setOption({
              backgroundColor: "#fefdf9",
              title: {
                top: 20,
                text: "",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 16,
                  color: "#F1F1F3"
                },
                left: "1%"
              },
              tooltip: {
                trigger: "axis"
              },

              xAxis: [
                {
                  type: "category",
                  minInterval: 4,
                  data: that.dataQihao,
                  boundaryGap: true,
                  show: false,
                  interval: 0,
                  rotate: 40,
                  textStyle: {
                    color: "#333"
                  },
                  formatter: function() {
                    return "";
                  },
                  showAllSymbol: true,
                  interval: {
                    min: 100
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",

                  scale: true,

                  axisLabel: {
                    axisLine: {
                      lineStyle: {
                        color: "#4A5675" // width:2
                      }
                    },
                    name: "百分比",
                    type: "value",
                    splitLine: {
                      show: false
                    },
                    scale: true
                  }
                }
              ],
              series: [
                {
                  name: "遗漏值",
                  type: "line",
                  data: that.data,
                  itemStyle: { normal: { label: { show: true } } },
                  showAllSymbol: true
                }
              ]
            });
          }
        });
      }
    }
  }
};
</script>
