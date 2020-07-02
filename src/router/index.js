import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forgetPwd',
    component: () => import('@/views/forget-pwd/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/class',
    component: Layout,
    redirect: '/class/index',
    name: 'Class',
    meta: { title: '班课', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/class/index'),
        meta: { title: '班课查询', icon: 'course' }
      },
      {
        path: 'detail',
        name: 'Detail',
        component: () => import('@/views/class/detail'),
        meta: { title: '班课', icon: 'createCourse' },
        hidden: true
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/views/class/create'),
        meta: { title: '创建班课', icon: 'createCourse' }
      }
    ]
  },
  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/dataDict',
    name: 'SystemManage',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: 'dataDict',
        name: 'DataDict',
        component: () => import('@/views/data-dictionary/index'),
        meta: { title: '数据字典', icon: 'dictionary' }
      },
      {
        path: 'parameter',
        name: 'Parameter',
        component: () => import('@/views/parameter-management/index'),
        meta: { title: '参数管理', icon: 'parameter' }
      },
      {
        path: 'menuManage',
        name: 'MenuManage',
        component: () => import('@/views/menu-management/index'),
        meta: { title: '菜单管理', icon: 'list' }
      },
      {
        path: 'organize',
        name: 'Organize',
        component: () => import('@/views/organize/index'),
        meta: { title: '组织管理', icon: 'organization' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user-management/index'),
        meta: { title: '用户管理', icon: 'user2' }
      },
      {
        path: 'roleUser',
        name: 'RoleUser',
        component: () => import('@/views/role-management/index'),
        meta: { title: '角色管理', icon: 'role' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    name: 'Profile',
    meta: { title: '个人中心', icon: 'user' },
    children: [
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/resource/index'),
        meta: { title: '资源', icon: 'resource' }
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/profile/index'),
        meta: { title: '用户信息', icon: 'skill' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/profile/setting'),
        meta: { title: '设置', icon: 'edit' }
      }
    ]
  },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/error-page/500'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
