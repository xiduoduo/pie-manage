const { defineConfig } = require("@vue/cli-service");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

const cesiumSource = "node_modules/cesium/Source";
const cesiumWorkers = "../Build/Cesium/Workers";

const pathPrefix = process.env.VUE_APP_PATH_PREFIX;

module.exports = defineConfig({
  transpileDependencies: process.env.NODE_ENV !== "development",
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: `${pathPrefix}/`,
  outputDir: `dist${pathPrefix}`,
  lintOnSave: false,
  productionSourceMap: false,
  /**
   * interface proxy config
   */
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "<url>",
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //     "/foo": {
  //       target: "<other_url>",
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src")
      },
      fallback: { https: false, zlib: false, http: false, url: false }
    },
    plugins: [
      new DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(pathPrefix)
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, "Assets"), to: "Assets" },
          { from: path.join(cesiumSource, "ThirdParty"), to: "ThirdParty" },
          { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
          { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" }
        ]
      })
    ]
  }
});
