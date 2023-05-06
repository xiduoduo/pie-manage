<template>
  <div id="WorldMap" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
            <!-- 标题栏 -->
            <oceanTopNav ref="oceanTopNav" />

            <!-- penlayer -->
            <openlayer ref="openlayer" />
  </div>
</template>

<script>
import oceanTopNav from './ocealTopNav.vue'
import openlayer from './openlayer.vue'
export default {
  name: "",
  components: {
    oceanTopNav,
    openlayer,
    
  },
  data(){
    return {
      loading: false,
    }
  }
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