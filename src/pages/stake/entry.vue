<template>
  <div class="box">
    <BackToHome
      @click="
        () => {
          $router.push({
            name: 'home',
          });
        }
      "
    />
    <div class="help_text">请选择 {{ curPlace }} 开始挑战</div>
    <div
      class="float_city"
      v-for="item in citys"
      :key="item.key"
      :style="`left:${item.x}%;top:${item.y}%`"
      @click="()=>$router.push({
        name:'stk_choose'
      })"
    >
      <div class="inner">
        <div :class="item.active ? 'name' : 'name disable'">
          <div class="inner">
            <img src="../../assets/stake/map/place_bg.png" alt="" />
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
        <img
          v-if="item.size == 0"
          class="small"
          src="../../assets/stake/map/city2.png"
          alt=""
        />
        <img v-else class="big" src="../../assets/stake/map/city1.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import BackToHome from "./back_to_home";
export default {
  name: "entry",
  components: {
    BackToHome,
  },
  setup() {
    const data = reactive({
      curPlace: "浮育",
      citys: [
        { key: 1, name: "浮育", size: 0, x: 40, y: 40, active: true },
        { key: 2, name: "逾城", size: 0, x: 29, y: 60 },
        { key: 3, name: "泗水", size: 1, x: 44, y: 64 },
        { key: 4, name: "霓昂", size: 1, x: 50, y: 30 },
        { key: 5, name: "凝关", size: 1, x: 68, y: 45 },
        { key: 6, name: "泊寨", size: 0, x: 60, y: 60 },
      ],
    });
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
  background: url("../../assets/stake/map_entry.png") no-repeat;
  background-size: 100% 100%;
}
.help_text {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: white;
}
.float_city {
  position: absolute;
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  .inner {
    position: relative;
    .name {
      position: absolute;
      top: 0;
      right: 0;
      .inner {
        position: relative;
        img {
          width: 2rem;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .disable {
      pointer-events: none;
      filter: grayscale(100);
    }
    .small {
      width: 5rem;
      transform: translate(-45%, 94%);
    }
    .big {
      filter: brightness(0.6) sepia(1);
      width: 8rem;
      transform: translate(-10%, 48%);
    }
  }
}
</style>