<template>
  <div class="box"></div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "",
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
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>