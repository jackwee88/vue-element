import axios from 'axios'
import router from '../router'
axios.defaults.timeout = 5000 // 请求超时5秒
axios.defaults.baseURL = '' // 请求base url
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 设置post请求是的header信息
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      //  config.headers = {
      //  'token': token
      //  }

    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.data.code === 4003) {
      //  Toast({
      //  mes: '您没有权限操作！',
      //  timeout: 1500,
      //  callback: () => {
      //   router.go(-1);
      //  }
      //  });

      return false
    }
    if (response.data.code === 3) {
      router.push({
        path: '/editmsg',
        querry: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
      })
    }
    console.log('data', response.data)
    if (response.data.code === -1 || response.data.code == 401) {
      localStorage.removeItem('token')
      router.push({
        path: '/login',
        querry: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
      })
    }
    return response
  },
  err => {
    console.log(err)
    if (err.response.status == 401) {
      localStorage.removeItem('token')
      router.push({
        path: '/login',
        querry: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
      })
    }
    if (err.response.status == 403) {
      localStorage.removeItem('token')
      router.push({
        path: '/login',
        querry: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
      })
    }
    if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
      alert('网络异常，连接超时...')
    }
    return Promise.reject(err)
  }
)

/**
* 封装get方法
* @param url
* @param data
* @returns {Promise}
*/

export function get (url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios.get('http://cp.xutavip.com/api/Caipiao/' + url, {
      params: params,
      headers: headers
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
* 封装post请求
* @param url
* @param data
* @returns {Promise}
*/

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post('http://cp.xutavip.com/api/Caipiao/' + url, { headers: { token: 'd96e49a5-6441-4916-900f-efe146f350ff' }, data })
      .then(response => {
        resolve(response.data)
      }, err => {
        console.log(err)
        reject(err)
      })
  })
}
