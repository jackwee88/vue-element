import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
    if (!permissionRoles) return true
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = [
        '/login',
        '/reg',
        '/editmsg',
        '/pay',
        '/create',
        '/runchart',
        '/intelligentrecommendation',
        '/intelligentdata',
        '/money',
        // '/keyboard',
        '/user',
        '/new',
        '/icon',
        '/keyboard',
        '/line',
        '/cart',
        '/vip',
        '/record',
        '/mixchart',
        '/code',
        '/person',
        '/qrcode',
        '/example/mixin',
        '/example/tab',
        '/example/back-to-top',
        '/example/drag-dialog',
        // '/401',
        '/video',
        '/resetpassword',
        '/soccer',
        '/shop',
        '/download',
        '/score',
        '/other'

    ] // no redirect whitelist

router.beforeEach((to, from, next) => {
    //console.log(to.path, 'hhhhhhhhhhhhhhhhhhhhhh', localStorage.getItem('token'))
    NProgress.start()
        // 在没有token的情况下跳转至登录页
    if (!localStorage.getItem('token')) {
        if (to.path === '/login' || to.path === '/reg' || to.path === '/resetpassword' || to.path === '/download') { // 这就是跳出循环的关键
            next()
        } else {
            next('/login')
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
            return
        }
    }

    if (whiteList.indexOf(to.path) != -1) { // 在免登录白名单，直接进入
        next()
    } else {
        next('/login') // 否则全部重定向到登录页
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})