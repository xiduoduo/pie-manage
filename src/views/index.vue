<template>
  <div
    class="has-logo nav-menu"
  >
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      background-color="#0E1D40"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#7FF9FF"
      :collapse-transition="false"
    >
      <template v-for="(route, index) in sidebarRouters">
        <router-link :to="resolvePath(route.path,'')" :key="route.path + index">
          <el-menu-item
            :key="route.path + index"
            :item="route"
            :base-path="resolvePath(route.path,'')"
            :index="resolvePath(route.path,'')"
          >
            <img v-if="route.meta" class="pre-img" :src="route.meta.img" />
            <span slot="title">{{ route.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { leftRoutes } from "./../router/index";
export default {
  
  data() {
    return {
      defaultActive: "/origin/createTask",
      sidebarRouters: [],
      isCollapse: false,
    };
  },
  computed: {},
  mounted() {
    leftRoutes.forEach((item, i) => {
      if (item.isTable) {
        this.sidebarRouters.push(item);
      }
    });
  },
  created() {
    //页面刷新菜单栏路由高亮
    this.defaultActive = this.$route.path;
  },
  methods: {
    resolvePath(routePath, childPath) {
      return routePath + "/" + childPath;
    },
  },
};
</script>
<style  rel="stylesheet/scss" scoped>
.sidebar-container {
  background: #0a1630;
}
.el-menu-item.is-active {
  color: #0a1630;
}
.nav-menu {
    width: 210px;
    /* height: calc(100vh - 67px); */
    background-color: #062D57;
    display: inline-block;
    height: 100%
  }
  .nav-title {
    height: 48px;
    line-height: 48px;
    background: #1A4676;
    color: #fff;
    font-family: PingFangSC-Medium, PingFang SC;
    text-align: center;
    font-size: 16px;
  }
  .pre-img {
    width: 18px;
    margin-right: 20px;
  }
</style>
