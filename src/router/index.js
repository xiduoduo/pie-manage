import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "App",
    redirect: "/login",
    meta: { title: "首页" }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login.vue"),
    meta: { title: "CesiumBasic" }
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/components/ocean/index.vue"),
    meta: { title: "CesiumBasic" }
  },
  {
    path: "/ocean",
    name: "ocean",
    title: "集成页面",
    hidden: true,
    component: () =>
      import("@/components/ocean/white.vue"),
    children: [
      { 
        path: '/ocean/task',
        name: 'task',
        component: () => import('@/views/pages/task-data.vue'),
      },
      { 
        path: '/ocean/monitor',
        name: 'monitor',
        component: () => import('@/views/pages/monitor.vue'),
      },
    ]
  },
];

export const leftRoutes = [
  
  
  {
      path: "/ocean",
      name: "ocean",
      title: "集成页面",
      hidden: true,
      // component: () =>
      //   import("@/components/ocean/index.vue")
    },
  
    {
      name: "Tool",
      path: "/origin",
      hidden: false,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "原始资料",
          // img: require('@/assets/images/yuanshiziliao.png'),
          noCache: false
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
    },
    {
      name: "Tool",
      path: "/dataMul",
      hidden: false,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "数据融合",
          // img: require('@/assets/images/shujuronghe.png'),
          noCache: false
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
      
    },
    {
      name: "Tool",
      path: "/real",
      hidden: true,
      isTable: false,
      alwaysShow: true,
      meta: {
          title: "真实性检验",
          // img: require('@/assets/images/realCheck.png'),
          noCache: false
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
     
    },
    {
      name: "Tool",
      path: "/real/realList",
      hidden: false,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "真实性检验",
          // img: require('@/assets/images/realCheck.png'),
          noCache: false
      },
    },
    {
      name: "Tool",
      path: "/userManage",
      hidden: false,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "用户管理",
          // img: require('@/assets/images/yonghuguanli.png'),
          noCache: false
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
     
    },
    {
      name: "Tool",
      path: "/system",
      hidden: true,
      isTable: false,
      alwaysShow: true,
      meta: {
          title: "系统运维",
          // img: require('@/assets/images/xitongyunwei.png'),
          noCache: false
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
      
    },
    {
      name: "Tool",
      path: "/system/operation",
      hidden: true,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "系统运维",
          // img: require('@/assets/images/xitongyunwei.png'),
          noCache: false
      },
    },
    {
      name: "Tool",
      path: "/plugin",
      hidden: true,
      isTable: false,
      alwaysShow: true,
      meta: {
          title: "插件管理",
          // img: require('@/assets/images/yonghuguanli.png'),
      },
      // component: () =>
      // import("@/components/homePage/index.vue"),
      
    },
    {
      name: "Tool",
      path: "/plugin/plugManage",
      hidden: false,
      isTable: true,
      alwaysShow: true,
      meta: {
          title: "插件管理",
          // img: require('@/assets/images/yonghuguanli.png'),
          // noCache: false
      },
    },
  ]

const pathPrefix = process.env.VUE_APP_PATH_PREFIX;
export default new Router({
  mode: "history",
  base: `${pathPrefix}/`,
  scrollBehavior: () => ({ y: 0 }),
  routes,
  leftRoutes
});
