const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://18.167.19.112:8080/ipfs/Qme1fVFSqxNvM5UdNqh85U9orpcJRkycbNKhBokJ1jBU4K/game/'
    : './',
  productionSourceMap: false,
});
