<template>
  <div :class="disabled?'btn_box disable':'btn_box'">
    <slot></slot>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "comon_button",
  props:['disabled'],
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
  &:hover{
    opacity: .8;
  }
  cursor: pointer;
  position: relative;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: url("../assets/pack/active_tab.png") no-repeat;
  background-size: 100% 100%;
  font-size: 1.2rem;
}
.disable{
  pointer-events: none;
  filter: grayscale(100);
}
</style>
