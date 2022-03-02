<template>
  <div class="filter_box">
    <div class="text">筛选</div>
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
.filter_box {
  &:hover {
    opacity: 1;
  }
  opacity: 0.6;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(
    89.54deg,
    rgba(102, 99, 29, 0.5) -138.99%,
    rgba(0, 0, 0, 0.5) -54.05%,
    rgba(162, 95, 33, 0.5) 19.67%,
    rgba(131, 43, 20, 0.5) 98.2%,
    rgba(255, 101, 101, 0.5) 168.72%
  );
  border-radius: 99px;
  border: 1px solid #3e3002;
  .text {
    font-size: 1.5rem;
  }
}
</style>
