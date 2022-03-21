<template>
  <div ref="mask" class="mask">
    <img :src="getMap" alt="" />
    <div class="inner">
      <div class="scroll">
        <div class="s_inner">
          <img src="../../../allstar_assets/stake/road/scroll_bg.png" alt="" />
        </div>
      </div>
      <div class="action_box">
        <div class="item">
          <img src="../../../allstar_assets/stake/road/btn_bg.png" alt="" />
          <div class="text">{{ "路线一: " + roadText[0] }}</div>
        </div>
        <div class="item">
          <img src="../../../allstar_assets/stake/road/btn_bg.png" alt="" />
          <div class="text">{{ "路线二: " + roadText[1] }}</div>
        </div>
      </div>
    </div>
    <div class="back" @click="() => $emit('back')">返回</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, computed, ref } from "vue";
import { initRoads } from "../../../utils/useRoutes";
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
    const roadText = computed(() => {
      return initRoads[props.camp];
    });
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      getMap,
      mask,
      roadText,
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
  .main {
    position: absolute;
  }
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    .scroll {
      position: absolute;
      left: 5%;
      top: 5%;
      width: 45rem;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .s_inner {
        position: relative;
        width: 100%;
        height: auto;
        background: red;
        img {
          width: 100%;
        }
      }
    }
    .action_box {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      .item {
        cursor: pointer;
        position: relative;
        width: 35rem;
        margin-right: 5rem;
        img {
          width: 100%;
        }
        .text {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: #261813;
        }
      }
    }
  }
}
</style>