<template>
  <div class="page_box">
    <div
      v-for="(item, index) in totalPages"
      :key="index"
      :class="cur_page == item ? 'page_item active' : 'page_item'"
      @click="
        () => {
          change(item);
          $emit('change', item);
        }
      "
    >
      {{ item }}
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onMounted, computed } from "vue";
export default {
  name: "page",
  props: ["current", "total"],
  setup(prop) {
    const data = reactive({
      cur_page: prop.current,
    });
    const totalPages = computed(() => {
      let res = [];
      for (let i = 1; i <= prop.total; i++) {
        res.push(i);
      }
      return res;
    });
    onMounted(() => {
      console.log(totalPages.value, "sss");
    });
    const change = (item) => {
      data.cur_page = item;
    };
    const refData = toRefs(data);
    return {
      ...refData,
      change,
      totalPages,
    };
  },
};
</script>
<style lang="less" scoped>
.page_box {
  display: flex;
  align-items: center;
  .page_item {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    font-size: 1.3rem;
    color: white;
    border-radius: 99rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .active {
    background: rgba(0, 0, 0, 0.17);
    border: 1px solid rgba(255, 255, 255, 0.13);
  }
}
</style>
