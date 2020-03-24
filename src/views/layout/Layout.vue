<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- <tags-view></tags-view> -->
      <app-main class="appMain"></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/css/mixin.less";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .main-container{
      background-color: #f6fafd;
    }
    // .appMain{
    //   margin: 20px;
    //   background-color: #F6FAFDFF;
    //   border-top: 5px solid #4187bd;
    //   padding-left:8px;
    // }
  }
  @media only screen and (max-width: 768px) {
    .main-container{
      width: 100%;
    }
  }
</style>
