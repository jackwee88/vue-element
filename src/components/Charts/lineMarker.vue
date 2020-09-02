<template>
  <div :class="className" :id="id" style="width:100%;height:40vh"></div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  name: "lineMarker",
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
      default: "500px"
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      dataQihao: [],
      avg: []
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
      var data = sessionStorage.getItem("missed");
      var obj = {
        token: localStorage.getItem("token"),
        array: [data],
        type:localStorage.getItem("type")
      };
      if (sessionStorage.getItem("caipiaoid")) {
        obj.caipiaoid = sessionStorage.getItem("caipiaoid");
      }
      if (sessionStorage.getItem("type")) {
        obj.type = sessionStorage.getItem("type");
      }
      this.$axios({
        method: "post",
        url: this.url + "Caipiao/missed1",
        params: obj,
        traditional: true //必须指定为true
      }).then(res => {
        var arr = [];
        var arrQihao = [];
        var avg = [];
        if (res.data.data) {
          // Object.getOwnPropertyNames(res.data.data).forEach(function(key) {
          //   //console.log(key+ '---'+res.data.data[key].number)
          //   arr.push(res.data.data[key].num);
          //   arrQihao.push(res.data.data[key].number);
          // });
          res.data.data.forEach(function(key) {
            arr.push(key.num);
            arrQihao.push(key.number);
            avg.push(key.avge);
          });
        }
        that.data = arr;
        that.dataQihao = arrQihao;
        that.avg = avg;
        //console.log(that.avg);
        this.chart = echarts.init(document.getElementById(this.id));

        // 当没有数据时undefined改显示为暂无数据
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
            legend: {
              top: 20,
              icon: "rect",
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ["遗漏值", "平均值"],
              right: "4%",
              textStyle: {
                fontSize: 12,
                color: "#000"
              }
            },
            xAxis: [
              {
                type: "category",

                data: that.dataQihao
              }
            ],
            yAxis: [
              {
                type: "value",

                scale: true,

                // max: 1800,
                // min: 0,
                // splitNumber : 18,
                axisLabel: {
                  formatter: function() {
                    return "";
                  },
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
                label: {
                  show: true //开启显示
                },
                itemStyle: { normal: { label: { show: true } } }
              },
              {
                name: "平均值",
                type: "line",

                data: that.avg,
                label: {
                  show: true //开启显示
                }
                // itemStyle : { normal: {label : {show: true}}},
                // showAllSymbol:true//优化折线图上的数值显示不完整
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
            legend: {
              top: 20,
              icon: "rect",
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ["遗漏值", "平均值"],
              right: "4%",
              textStyle: {
                fontSize: 12,
                color: "#000"
              }
            },
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
            // dataZoom: [
            //   //给x轴设置滚动条
            //   {
            //     start: 0, //默认为0
            //     //  end: 100-1500/31,//默认为100
            //     end: 3000, //默认为100
            //     type: "slider",
            //     show: true,
            //     xAxisIndex: [0],
            //     handleSize: 0, //滑动条的 左右2个滑动条的大小
            //     height: 8, //组件高度
            //     left: 50, //左边的距离
            //     right: 40, //右边的距离
            //     bottom: 26, //右边的距离
            //     handleColor: "#ddd", //h滑动图标的颜色
            //     handleStyle: {
            //       borderColor: "#cacaca",
            //       borderWidth: "1",
            //       shadowBlur: 2,
            //       background: "#ddd",
            //       shadowColor: "#ddd"
            //     },
            //     fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            //       {
            //         //给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
            //         //给第一个设置0，第四个设置1，就是垂直渐变
            //         offset: 0,
            //         color: "#1eb5e5"
            //       },
            //       {
            //         offset: 1,
            //         color: "#5ccbb1"
            //       }
            //     ]),
            //     backgroundColor: "#ddd", //两边未选中的滑动条区域的颜色
            //     showDataShadow: false, //是否显示数据阴影 默认auto
            //     showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
            //     handleIcon:
            //       "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z",
            //     filterMode: "filter"
            //   },
            //   //下面这个属性是里面拖到
            //   {
            //     type: "inside",
            //     show: true,
            //     xAxisIndex: [0],
            //     start: 0, //默认为1
            //     end: 100 - 1500 / 31 //默认为100
            //   }
            // ],
            xAxis: [
              {
                type: "category",

                data: that.dataQihao,
                show: false
              }
            ],
            yAxis: [
              {
                type: "value",

                scale: true,

                // max: 1800,
                // min: 0,
                // splitNumber : 18,
                axisLabel: {
                  formatter: function() {
                    return "";
                  },
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
                label: {
                  show: true //开启显示
                },
                itemStyle: { normal: { label: { show: true } } }
              },
              {
                name: "平均值",
                type: "line",

                data: that.avg,
                label: {
                  show: true //开启显示
                }
                // itemStyle : { normal: {label : {show: true}}},
                // showAllSymbol:true
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
            legend: {
              top: 20,
              icon: "rect",
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ["遗漏值", "平均值"],
              right: "4%",
              textStyle: {
                fontSize: 12,
                color: "#000"
              }
            },
            xAxis: [
              {
                type: "category",

                data: that.dataQihao,
                show: false
              }
            ],
            yAxis: [
              {
                type: "value",

                scale: true,

                // max: 1800,
                // min: 0,
                // splitNumber : 18,
                axisLabel: {
                  formatter: function() {
                    return "";
                  },
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
                label: {
                  show: true //开启显示
                },
                itemStyle: { normal: { label: { show: true } } }
              },
              {
                name: "平均值",
                type: "line",

                data: that.avg,
                label: {
                  show: true //开启显示
                }
                // itemStyle : { normal: {label : {show: true}}},
                // showAllSymbol:true//优化折线图上的数值显示不完整
              }
            ]
          });
        }
      });
    }
  }
};
</script>
