<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    
  },
  methods:{
    
  }
}
</script>

<style lang="less">

@import "assets/css/index";
#app{
  overflow-x: hidden;
  max-width:100vw;
}
#app .hideSidebar .main-container{
  margin-left:0;
}
#app .hideSidebar .sidebar-container{
  width:0!important;
}
// .content .el-table th{
//   height:60px!important;
// }
.index .el-checkbox+.el-checkbox{
  margin-left:0;
  margin-right:0;
}
// 推荐页面的图表列
.yuijian .el-table__expand-column{
  // width:80px!important;
}
.el-table__expanded-cell[class*=cell] {
    padding: 0px 50px;
    height: auto!important;
    background-color: #fefdf9;
}
.tuijian .el-table{
  background-color:#f6fafd;
  
}
.tuijian .el-table{
 border :none;
 
}
.tuijian .is-scrolling-none{
  // position: relative!important;
 
}
.tuijian .is-scrolling-none .el-table__empty-block{
  right:50%;
}
.el-icon-arrow-right:before {
  right:-20px;
}
.el-checkbox__label{
  font-size: 16px;
  padding-left:8px;
}
.el-checkbox__inner{
  width:14px;
  height:14px;
  border:1px solid gray;
}
.el-dialog--center .el-dialog__body{
  padding-bottom:0
}
.el-checkbox__inner::after{
  // top:0px;
  // left:1px;
  // width:2px;
  // height:4px;
}
//runchart页面手机端样式
.phone .el-input__inner{
  height:28px;
  line-height: 28px;
  padding:0 5px;
}
.tuijian .el-icon-arrow-right:before {
    content: " ";
    background: url('https://farm-shop.oss-cn-beijing.aliyuncs.com/uploads/b61a1805efafc11f316bcaf792106f7.png') no-repeat bottom right /24px 24px;/*兼容没测*/
        position: absolute;
        bottom: -15px;
        z-index: 2;
        width: 32px;
        height: 32px;
}
.el-checkbox+.el-checkbox{
  margin-left:2px;
}
 .el-table__expanded-cell{
height:500px;
 }
 
.el-checkbox{
    width:66px;
  }
.show-num .el-checkbox{
  width:40px;
}

.content .el-table .cell{
  line-height:40px;
}
.content .el-table__header-wrapper,.content .el-table__body-wrapper{
  display: flex;
  width:100%;
  justify-content: center;

}
.content-phone .el-table__header thead tr th,.content-phone .el-table td{
  font-size: 14px!important;
}
// 登录页的弹出框遮罩
.v-modal{
  display: none;
}
.el-dialog{
  background-color: rgba(255, 255, 255, 0.9);
  margin-top:5vh!important;
}
@media (max-width: 320px) {
  .el-table .caret-wrapper{
  width:10px;
}
  /*0~320*/
  .el-checkbox{
    width:66px;
    margin-bottom:4px;
  }
   .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0;
}
 .show-num .el-checkbox{
 margin-bottom:4px;
 margin-top:5px;
}
.bottom-wrap .el-checkbox{
  margin-top:0;
}

.el-table .cell{
  padding:0;
}
.el-table td{
   padding:0;
}
.hamburger{
  width:17px;
  height:17px;
}
}



@media (min-width: 321px) and (max-width: 375px) {
  .el-table .caret-wrapper{
  width:10px;
}
  /*321~768*/
 .el-checkbox{
    width:70px;
     margin-bottom:4px;
  }
   .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0;
}
  .show-num .el-checkbox{
 margin-bottom:4px;
 margin-top:5px;
}
 .bottom-wrap{
     flex-direction: row!important;
   }
   .bottom-wrap .el-checkbox{
  margin-top:0;
}

.el-table .cell{
  padding:0;
}
.el-table td{
   padding:0;
}
.hamburger{
  width:17px;
  height:17px;
}
}

@media (min-width: 376px) and (max-width: 425px) {
  .el-table .caret-wrapper{
  width:10px;
}

  /*376~425*/
 .el-checkbox{
    width:70px;
     margin-bottom:4px;
  }
   .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0;
}
  .show-num .el-checkbox{
 margin-bottom:4px;
 margin-top:5px;
}
.bottom-wrap{
     flex-direction: row!important;
   }
   .bottom-wrap .el-checkbox{
  margin-top:0;
}

.el-table .cell{
  padding:0;
}
.el-table td{
   padding:0;
}
}

@media (min-width: 426px) and (max-width: 768px) {
  .el-table .caret-wrapper{
  width:10px;
}
  /*426~768*/
 .el-checkbox{
    width:66px;
     margin-bottom:4px;
  }
  .show-num .el-checkbox{
 margin-bottom:4px;
 margin-top:5px;
}
.bottom-wrap .el-checkbox{
  margin-top:0;
  
.el-table .cell{
  padding:0;
}
.el-table td{
   padding:0;
}

 .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0;
}
.bottom-wrap{
     flex-direction: row!important;

   }
   
.el-table .cell{
  padding:0;
}
.el-table td{
   padding:0;
}
}
}

@media (min-width: 769px) {
  /*769~+∞*/
 
}






.actives-td{
  background-color: red
}

.cell {
  margin: 0 auto;
}



.el-checkbox + .el-checkbox{
  margin-left:0;
}
.el-table__expanded-cell{
  padding:0 50px;
}

.el-table .sort-caret.descending{
  left: 2px;
}

.moneyC .sec-box label{
  width:70px!important;
}
.moneyC  .sec-box .el-form-item__content{
  margin-left: 70px!important;
}
.moneyC .money-box label{
  width:50px!important;
}
.moneyC .money-box .el-form-item__content{
  margin-left: 50px!important;
}
.moneyC .el-input__inner{
  height:28px;
  line-height: 28px;
  padding:0 1px;
  width:70%;
}
.moneyC .radio-wrap .el-form-item__content{
  margin-left:0px!important;
}
.moneyC .radio-wrap .el-input{
  width:50%;
}
.moneyC .el-form-item{
  margin-bottom:0;
  padding-top:5px;
  padding-bottom:5px;
}
// .vjs_video_3-dimensions{
//   height:10rem;
// }
.video-player>div{
  height:10rem;
  width:20rem;
}
.video-js .vjs-big-play-button{
  width:3rem;
  left:42%;
  top:36%;
}
</style>
