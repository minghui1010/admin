import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: () => import( /*webpackChunkName:'index' */ '../components/Index.vue'),
      meta: {
        title: '首页'
      },
      children: [{
          path: '/home',
          component: () => import( /*webpackChunkName:'home'*/ '../components/page/Home.vue'),
          meta: {
            title: "系统页面"
          }
        },
        {
          path: '/tab',
          component: () => import( /*webpackChunkName:'tab'*/ '../components/page/Tab.vue'),
          meta: {
            title: "tab页面"
          }
        },
        {
          path: '/tabs',
          component: () => import( /*webpackChunkName:'tabs'*/ '../components/page/Tabs.vue'),
          meta: {
            title: '选项卡页面'
          }
        },
        {
          path: '/form',
          component: () => import( /*webpackChunkName:'form'*/ '../components/page/Form.vue'),
          meta: {
            title: '基础表单',
          }
        },
        {
          path: "/permission",
          component: () => import( /*webpackChunkName:'permission'*/ '../components/page/Permission.vue'),
          meta: {
            title: '权限测试',
            permission: true
          }
        },
        {
          path: '/404',
          component: () => import( /* webpackChunkName: "404" */ '../components/page/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: () => import( /* webpackChunkName: "403" */ '../components/page/403.vue'),
          meta: {
            title: '403'
          }
        },
      ]
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
      meta: {
        title: '登录'
      }
    },
  ]
})
