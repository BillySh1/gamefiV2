<template>
  <div class="btn_box">
    <slot></slot>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "",
  setup() {
    const data = reactive({});
    onBeforeMount(() => {
    });
    onMounted(() => {
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.btn_box {
  position: relative;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: url("../assets/pack/active_tab.png") no-repeat;
  background-size: 100% 100%;
  font-size: 1.2rem;
}
</style>
