<template>
  <div ref="mask" class="mask">
    <img :src="getMap" alt="" />

    <div class="back" @click="() => $emit('back')">返回</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, computed, ref } from "vue";
export default {
  name: "choose_road",
  props: ["camp"],
  components: {},
  setup(props) {
    const mask = ref(null);
    const data = reactive({});
    const getMap = computed(() => {
      return [
        require("../../../allstar_assets/main/map_0.png"),
        require("../../../allstar_assets/main/map_1.png"),
        require("../../../allstar_assets/main/map_2.png"),
        require("../../../allstar_assets/main/map_3.png"),
      ][props.camp];
    });
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      getMap,
      mask,
    };
  },
};
</script>
<style lang='less' scoped>
.mask {
  position: relative;
  width: 100%;
  height: 100%;
  .back {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    position: absolute;
    left: 1%;
    bottom: 1%;
    width: 20rem;
    padding: 0.5rem 0;
    background: rgba(44, 3, 3, 0.6);
    border-radius: 20px;
    font-size: 2rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .main{
      position: absolute;
  }
}
</style>