import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    max: 0,
    total: 0,
    moreArr: '',
    arr: [{name: '01', tivk: false}, {name: '02', tivk: false}, {name: '03', tivk: false}, {name: '04', tivk: false}, {name: '05', tivk: false}, {name: '06', tivk: false}, {name: '07', tivk: false}, {name: '08', tivk: false}, {name: '09', tivk: false}, {name: '10', tivk: false}, {name: '01', tivk: false}, {name: '11', tivk: false}]
  },
  getters
})

export default store
