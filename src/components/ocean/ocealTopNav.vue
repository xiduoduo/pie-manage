<template>
  <div style="height:100%">
    <div class="header">
      <div class="title"></div>
      <div class="topNavItemBar">
        <div class="itemTab">
              <router-link to="/ocean/task" class="topNavItem">
                    <img src="~@/assets/images/task.png" class="topNavItemIcon">
                    <span class="topNavItemTitle">任务管理</span>
              </router-link>
        </div>
        <div class="itemTab">
              <router-link to="/ocean/monitor" class="topNavItem">
                    <img src="~@/assets/images/monitor.png" class="topNavItemIcon">
                    <span class="topNavItemTitle">监控管理</span>
              </router-link>
        </div>
        <div class="itemTab">
              <router-link to="/ocean/resource
              " class="topNavItem">
                    <img src="~@/assets/images/resource.png" class="topNavItemIcon">
                    <span class="topNavItemTitle">资源监控</span>
              </router-link>
        </div>
        <div class="itemTab">
        <router-link to="/ocean/environmentDiolag" class="topNavItem">
              <img src="~@/assets/images/system.png" class="topNavItemIcon">
              <span class="topNavItemTitle">系统管理</span>
        </router-link>
        </div>
      </div>
      <router-view />
    </div>
    <NavMenu />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavMenu from '../../views/index.vue'
export default {
  name: "",
  components: {
    NavMenu
  },
};
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 80px;
    background: url('~@/assets/images/header.png');
    background-size: contain;
    display: flex;
    // img {
    //   width: 100%;
    //   height: 80px;
    // }
    .title {
      width:375px;
      height: 37px;
      line-height: 80px;
      // line-height: 100%;
      background:  url('~@/assets/images/title.png') no-repeat;
      background-size: contain;
      margin-left: 25px;
      margin-top: 25px;
    }
  }
  .topNavItemBar {
    width: 1025px;
    margin: 0 auto;
    overflow: hidden;
    margin-left: 218px;
    .itemTab {
      float: left;
      width: 130px;
      height: 80px;
      line-height: 80px;
      margin-left: 49px;
      text-align: center;
      .topNavItem {
        display: flex;
        width: 145px;
        height: 80px;
        text-decoration: none;
        .topNavItemIcon {
          width: 26px;
          height: 26px;
          margin-top: 28px;
        }
        .topNavItemTitle {
          font-size: 22px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: right;
          color: #ffffff;
          letter-spacing: 1px;
          margin-left: 9px;
        }
      }
      /deep/.router-link-active {
          background: linear-gradient(180deg,
                  rgba(71, 229, 255, 0),
                  #54ace2);
      }
    }
    .itemTab:first-child {
      margin-left: 0;
    }
  }
</style>