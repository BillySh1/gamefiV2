<template>
  <div class="intro">
    当前进度 <span style="margin-left: 2rem">{{ value }}%</span>
  </div>
  <div class="progress_box">
    <div class="mask" :style="`width:${100 - Number(value)}%`"></div>
  </div>
</template>

<script>
export default {
  name: "progress",
  props: ["value"],
  setup() {},
};
</script>
<style lang='less' scoped>
.intro {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}
.progress_box {
  position: relative;
  background: url("../../../assets/stake/detail/progress.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 3rem;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  .mask {
    display: block;
    height: 100%;
    max-width: 100%;
    width: 0;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>