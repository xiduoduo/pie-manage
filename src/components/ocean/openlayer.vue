<template>
  <div id="oceanMap">
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css";
export default {
  name:'openlayer',
  data(){
    return {
      viewer: null,
    }
  },
  mounted(){
    this.initMap()
  },
  methods: {
    initMap(){
      let viewer = new ol.Map({
        target: "map",
        controls: ol.control
          .defaults({
            zoom: false,
            attribution: false,
            rotate: false,
          })
          .extend([
            new ol.control.ZoomToExtent({
              extent: [113.39977, 29.972804, 115.432671, 30.8558],
            }),
          ]),
        //地图容器中加载的图层
        layers: [
          new ol.layer.Tile({
            title: "天地图矢量",
            source: new ol.source.XYZ({
              url: "http://10.1.100.146:19007/tianDiTu/img/{z}/{x}/{y}.png", //tk为天地图key，注意参考的同学替换为自己的key，频繁使用他人的key会导致禁ip
              wrapX: true,
            }),
          }),
        ],
        //地图视图设置
        view: new ol.View({
          projection: "EPSG:4326", //设置坐标系为4326 地理坐标系
          center: [114.422904, 30.551875], //地图初始中心点
          zoom: 6, //地图初始显示级别
        }),
      });
      this.viewer = viewer;

      this.ol.viewer = viewer;
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  padding: 0;
  margin: 0;
  margin-top: 80px;
  height: calc(100vh - 80px);
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}
</style>