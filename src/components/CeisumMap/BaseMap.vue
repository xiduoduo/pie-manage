<template>
  <!-- <div></div> -->
  <div id="cesium-map" class="cesium-map"></div>
</template>

<script>
import "cesium/Source/Widgets/widgets.css";
import { init } from "./cesiumInit.js";

export default {
  name: "CesiumMap",
  data() {
    return {};
  },
  mounted() {
    window.viewer = init();
  }
};
</script>

<style lang="scss" scoped>
.cesium-map {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
