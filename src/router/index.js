import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import Layout from '@/views/layout/Layout'
import { Form } from 'element-ui'

// Vue.prototype.$http = axios
Vue.use(Router)

export const constantRouterMap = [

    // {
    //   path: '',
    //   component: Layout,
    //   redirect: '/login',
    //   // children: [{
    //   //   path: 'login',
    //   //   component: resolve => require(['@/views/errorPage/404'], resolve),
    //   //   name: 'login',
    //   //   meta: {title: '404'}
    //   // }],
    //   hidden: true
    // },

    {
        path: '',
        component: Layout,
        redirect: '401',
        children: [{
            path: '401',
            component: resolve => require(['@/views/errorPage/401'], resolve),
            name: '401',
            meta: { title: '401' }
        }],
        hidden: true
    },
    { path: '/login', component: resolve => require(['@/views/login'], resolve), name: 'login', hidden: true },
    { path: '/resetpassword', component: resolve => require(['@/views/resetpassword'], resolve), hidden: true },
    { path: '/reg', component: resolve => require(['@/views/reg'], resolve), hidden: true },
    { path: '/editmsg', component: resolve => require(['@/views/editmsg'], resolve), hidden: true },
    { path: '/pay', component: resolve => require(['@/views/pay'], resolve), hidden: true },
    { path: '/download', component: resolve => require(['@/views/download'], resolve), hidden: true },
    {
        path: '',
        component: Layout,
        redirect: 'user',
        meta: {
            title: '11选5数据',
            icon: 'choose'
        },
        children: [{
                path: 'user',
                component: resolve => require(['@/views/user'], resolve),
                name: 'user',
                meta: { title: '彩票做号', icon: 'cir', noCache: true, keepAlive: true }

            },
            // {path: 'caipiaozh', component: resolve => require(['@/views/charts/caipiaozh'], resolve), name: 'caipiaozh', meta: { title: '彩票做号',  icon: 'user',noCache: true }},
            { path: 'runchart', component: resolve => require(['@/views/user/runchart'], resolve), name: 'runchart', meta: { title: '综合走势', icon: 'cir', noCache: true } },
            { path: 'intelligentrecommendation', component: resolve => require(['@/views/user/intelligentrecommendation'], resolve), name: 'intelligentrecommendation', meta: { title: '智能推荐', icon: 'cir', noCache: true } },
            { path: 'intelligentdata', component: resolve => require(['@/views/user/intelligentdata'], resolve), name: 'intelligentdata', meta: { title: '智能数据', icon: 'cir', noCache: true } },
            { path: 'money', component: resolve => require(['@/views/user/money'], resolve), name: 'money', meta: { title: '资金计算器', icon: 'cir', noCache: true } },
            { path: 'new', component: resolve => require(['@/views/user/new'], resolve), name: 'new', hidden: true },
            { path: 'video', component: resolve => require(['@/views/user/video'], resolve), name: 'video', meta: { title: '视频教学', icon: 'cir', noCache: true, image: '../utils/user.jpg' } }
        ]
    },
    {
        path: '',
        component: Layout,
        children: [{
            path: 'soccer',
            component: resolve => require(['@/views/soccer'], resolve),
            name: 'soccer',
            meta: { title: '竞彩足球', icon: 'soccer', noCache: true }
        }]
    },
    {
        path: '',
        component: Layout,
        redirect: 'charts',
        name: 'charts',
        meta: {
            title: '个人中心',
            icon: 'usericon'
        },
        children: [
            { path: 'vip', component: resolve => require(['@/views/charts/vip'], resolve), name: 'vip', meta: { title: 'vip支付', icon: 'cir', noCache: true } },
            { path: 'record', component: resolve => require(['@/views/charts/record'], resolve), name: 'record', meta: { title: '积分划转', icon: 'cir', noCache: true } },

            { path: 'line', component: resolve => require(['@/views/charts/line'], resolve), name: 'lineChart', meta: { title: '我的上级', icon: 'cir', noCache: true } },
            { path: 'mixchart', component: resolve => require(['@/views/charts/mixChart'], resolve), name: 'mixChart', meta: { title: '我的下级', icon: 'cir', noCache: true } },
            { path: 'keyboard', component: resolve => require(['@/views/charts/keyboard'], resolve), name: 'keyboard', meta: { title: '余额提现', icon: 'cir', noCache: true } },
            { path: 'score', component: resolve => require(['@/views/charts/score'], resolve), name: 'score', meta: { title: '积分提现', icon: 'cir', noCache: true } },
            { path: 'code', component: resolve => require(['@/views/charts/code'], resolve), name: 'code', meta: { title: '我的邀请链接', icon: 'cir', noCache: true } },
            { path: 'person', component: resolve => require(['@/views/charts/person'], resolve), name: 'person', meta: { title: '个人资料', icon: 'cir', noCache: true } },
            // { path: 'qrcode', component: resolve => require(['@/views/charts/qrcode'], resolve), name: 'qrcode', meta: { title: '推广App', icon: 'cir', noCache: true } },

        ]
    },
    {
        path: '',
        component: Layout,
        children: [{
            path: 'shop',
            component: resolve => require(['@/views/shop'], resolve),
            name: 'shop',
            meta: { title: '购物商城', icon: 'shop', noCache: true }
        }]
    },

    // {
    //   path: '/example',
    //   component: Layout,
    //   redirect: '/example/table/complex-table',
    //   name: 'example',
    //   meta: {
    //     title: 'example',
    //     icon: 'example'
    //   },
    //   children: [
    //     {path: 'mixin', component: resolve => require(['@/views/example/mixin/index'], resolve), name: 'mixin', meta: { title: 'mixin', noCache: true }},
    //     {path: 'tab', component: resolve => require(['@/views/example/tab/index'], resolve), name: 'tab', meta: { title: 'tab', noCache: true }},
    //     {path: 'back-to-top', component: resolve => require(['@/views/example/backToTop'], resolve), name: 'backToTop-demo', meta: { title: 'backToTop' }},
    //     {path: 'drag-dialog', component: resolve => require(['@/views/example/dragDialog'], resolve), name: 'dragDialog-demo', meta: { title: 'dragDialog' }}
    //   ]
    // }
]

const $router = new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
    // scrollBehavior(to,from,savePosition){
    //   if(savePosition){
    //     return savePosition
    //   }else{
    //     if(from.meta.keepAlive){
    //       from.meta.savePosition = Number(localStorage.scrollTop);
    //     }
    //     return {
    //       x:0,
    //       y:to.meta.savePosition || 0
    //     }
    //   }
    // }
})

// 解决Loading chunk (\d)+ failed问题
$router.onError((error) => {
    console.error(error)
    const pattern = /Loading chunk/g
        // const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    const targetPath = $router.history.pending.fullPath
    if (isChunkLoadFailed && error.type === 'missing') {
        // const targetPath = $router.history.pending.fullPath
        $router.push(targetPath)
    }
})
export const asyncRouterMap = []
export default $router