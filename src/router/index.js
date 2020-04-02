import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { check, isLogin } from '../utils/auth'
import findLast from 'lodash/findLast'
import Forbidden from '../views/403'
Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/User/Login.vue'),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "register" */ '../views/User/Register.vue'
          ),
      },
    ],
  },
  {
    path: '/',
    authority: ['admin', 'user'],
    component: () =>
      import(/* webpackChunkName: "layout" */ '../layouts/BasicLayout'),
    children: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/map',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', title: '疫情地图' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/map',
            name: 'map',
            meta: { title: '国内疫情地图' },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ '../views/Dashboard/Map'
              ),
          },
        ],
      },

      // form
      {
        path: '/form',
        name: 'form',
        meta: { icon: 'area-chart', title: '疫情数据', authority: ['admin'] },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form/overall',
            name: 'overall',
            meta: { title: '数据总览' },
            component: () => import('../views/Forms/Overall'),
          },
          {
            path: '/form/china-data',
            name: 'chinaData',
            meta: { title: '全国详细数据' },
            component: () => import('../views/Forms/ChinaData'),
          },
          {
            path: '/form/step-form',
            name: 'stepForm',
            meta: { title: '分步表单' },
            hideChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ '../views/Forms/StepForm/'),
            children: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info1',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Forms/StepForm/Step1'
                  ),
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Forms/StepForm/Step2'
                  ),
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ '../views/Forms/StepForm/Step3'
                  ),
              },
            ],
          },
        ],
      },
      //信息
      {
        path: '/info',
        name: 'info',
        meta: { icon: 'paper-clip', title: '疫情信息', authority: ['admin'] },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/info/news',
            name: 'news',
            meta: { title: '新闻' },
            component: () => import('../views/Info/News'),
          },
          {
            path: '/info/rumors',
            name: 'rumors',
            meta: { title: '辟谣信息' },
            component: () => import('../views/Info/Rumors'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: NotFound,
  },
  {
    path: '/403',
    name: 'forbidden',
    hideInMenu: true,
    component: Forbidden,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, item => item.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login',
      })
    } else if (to.path !== '/403') {
      next({
        path: '/403',
      })
    }
    NProgress.done()
  }
  next()
})
// router.beforeEach((to, from, next) => {
//   if (to.path != from.path) {
//     NProgress.start()
//   }
//   const record = findLast(to.matched, record => record.meta.authority)
//   if (record && !check(record.meta.authority)) {
//     if (!isLogin() && to.path !== '/user/login') {
//       next({
//         path: '/user/login',
//       })
//     } else if (to.path !== '/403') {
//       next({
//         path: '/403',
//       })
//     }
//     NProgress.done()
//   }
//   next()
// })

router.afterEach(() => {
  NProgress.done()
})
export default router
