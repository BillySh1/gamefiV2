<template>
  <div class="box">
    <div class="bottom">
      <StkBtn
        @click="
          () => {
            $router.push({
              name: 'stk_entry',
            });
          }
        "
        :text="'考虑一下'"
      />
      <img src="../../assets/stake/divider.png" alt="" />
    </div>
    <div class="place_zone">
      <div class="text">浮育城</div>
      <img class="img" src="../../assets/stake/city.png" alt="" />
    </div>
    <div class="top_right">
      <img src="../../assets/stake/coin.png" alt="" />
      <div class="text">总奖池</div>
      <div class="text">154892734</div>
    </div>
    <div class="main_body">
      <div
        class="item"
        v-for="(item, index) in map"
        :key="index"
        @click="
          () => {
            $router.push({
              name: 'stk_main',
            });
          }
        "
      >
        <div class="mask">
          <img src="../../assets/stake/detail/select_bg.png" alt="" />
        </div>
        <div class="scroll">
          <img src="../../assets/stake/detail/scroll_bg.png" alt="" />
          <div class="intro_text">
            {{ item.intro }}
          </div>
        </div>
        <img class="icon" :src="item.img" alt="" />
        <div class="text">执行 {{ item.name }} 任务</div>
        <div class="text">为期 {{ item.time }} 天</div>
        <div class="text">收益 {{ item.apy }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import StkBtn from "./components/stk_btn.vue";
export default {
  name: "choose_mission",
  components: {
    StkBtn,
  },
  setup() {
    const data = reactive({
      map: [
        {
          name: "斥候",
          time: 7,
          apy: 15,
          img: require("../../assets/stake/detail/m_0.png"),
          intro: "占位文案占位文案占位文案占位文案占位文案",
        },
        {
          name: "扫荡",
          time: 15,
          apy: 15,
          img: require("../../assets/stake/detail/m_1.png"),
          intro: "占位文案占位文案占位文案占位文案占位文案",
        },
        {
          name: "驻扎",
          time: 30,
          apy: 15,
          img: require("../../assets/stake/detail/m_2.png"),
          intro: "占位文案占位文案占位文案占位文案占位文案",
        },
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
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
}
.bottom {
  width: 70%;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 1rem;
    width: 100%;
  }
}
.place_zone {
  position: absolute;
  bottom: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    background: url("../../assets/stake/place_text_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 15rem;
    padding: 0.5rem 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .img {
    width: 10rem;
  }
}
.top_right {
  position: absolute;
  top: 3%;
  right: 3%;
  display: flex;
  align-items: center;
  img {
    width: 4rem;
    margin-right: 1.5rem;
  }
  .text {
    font-size: 1.3rem;
    margin-right: 1rem;
  }
}
.main_body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  display: flex;
  align-items: center;
  .item {
    position: relative;
    cursor: pointer;
    .mask {
      display: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 33rem;
      img {
        width: 100%;
      }
    }
    &:hover {
      .mask {
        display: block;
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 3rem;
    .scroll {
      position: relative;
      img {
        width: 20rem;
      }
      .intro_text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: black;
      }
    }
    .icon {
      width: 3rem;
      margin: 1.5rem 0;
    }
    .text {
      font-size: 1.2rem;
      margin: 1rem 0;
    }
  }
}
</style>