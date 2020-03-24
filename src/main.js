// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import i18n from './lang' // Internationalization
import './icons'
import './permission' // permission control

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'


import './axios'
import $ from 'jquery'
import { post, get } from '@/utils/ajax.js';

import Axios from 'axios'  //导入axios


import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
//将axios挂载到原型上
Vue.prototype.$axios = Axios;
Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.prototype.vip = function () {
  var that = this;
  that.$axios({
    method: "post",
    url: this.url + "user/userInfo",
    params: { token: localStorage.getItem('token') }
  })
    .then(ress => {

      if (ress.data.data.vip == 0) {
        that.$router.push({ path: "/pay" });
      }
     

    });
}
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.url = 'http://www.zyyccppx.com/api/'
Vue.prototype.maxs = 0;
Vue.prototype.totals = 0
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
