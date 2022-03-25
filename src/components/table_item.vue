<template>
  <div class="item_box">
    <div class="item" v-for="(item, index) in tableItem" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
export default {
  name: "table_item",
  props: ["tableItem"],
  setup(prop) {
    const data = reactive({
      arrData: [],
    });
    onBeforeMount(() => {
        console.log(prop.tableItem,'sss')
    });

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.item_box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.3rem;
  .item {
    text-align: center;
  }
}
</style>