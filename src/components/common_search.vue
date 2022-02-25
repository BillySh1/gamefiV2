<template>
  <div class="search_box">
    <img style="width: 2rem" src="../assets/pack/search.svg" alt="" />
    <div class="text">搜索</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "",
  setup() {
    console.log("1-开始创建组件-setup");
    const data = reactive({});
    onBeforeMount(() => {
      console.log("2.组件挂载页面之前执行----onBeforeMount");
    });
    onMounted(() => {
      console.log("3.-组件挂载到页面之后执行-------onMounted");
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.search_box {
  &:hover {
    opacity: 1;
  }
  padding: 0.5rem 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-sizing: border-box;
  border-radius: 200px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  .text {
    margin-left: 1rem;
    font-size: 1.5rem;
  }
}
</style>
