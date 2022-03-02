<template>
  <div class="item_box">
    <div class="time">
      {{ info.time }}
    </div>
    <div class="title">
      {{ info.title }}
    </div>
    <div class="content">
      {{ info.content }}
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
export default {
  name: "notice_item",
  props: ["info"],
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.item_box {
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  text-align: left;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  .time {
    color: rgba(242, 219, 185, 0.5);
  }
  .title {
    font-size: 2rem;
    margin: 1rem 0;
  }
}
</style>
