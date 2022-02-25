<template>
  <div class="box">
    <img class="img" :src="src" alt="url" />
    <div class="text">{{ text }}</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "inject_icon",
  props: ["src", "text", "size"],
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  position: relative;
  .img {
    height: 5rem;
    width: 5rem;
  }
  .text {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1.5rem;
    font-weight: 400;
  }
}
</style>
