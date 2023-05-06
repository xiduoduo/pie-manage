<template>
  <div id="app">
    <!-- <HeaderNav /> -->
    <router-view />
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav/index.vue";
export default {
  name: "App",
  components: { HeaderNav }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
.login-page .login-main .login-window .main-window .el-row .input-content .el-input__inner {
  background-color: transparent !important;
}
.admin-input .el-input__inner {
  height: 100%;
}
.ol-zoom-extent {
  display: none;
}

</style>
