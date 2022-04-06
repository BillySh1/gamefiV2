<template>
  <div class="box">
    <div class="main">
      <div class="item" v-for="item in pools" :key="item.key">
        <div class="inner">
          <img :src="item.img" alt="" />
          <div class="top_right">
            <div>挑战</div>
            <img src="../../assets/stake/scroll.png" alt="" />
          </div>
          <div class="center">
            <img :src="item.diff" alt="" />
            <div>{{ getDiffName(item.key) }}</div>
          </div>
        </div>
        <div class="name">
          {{ item.name }}
        </div>
        <div class="apy">APY {{ item.apy }}</div>
      </div>
    </div>
    <div class="badge">
      <img src="../../assets/stake/bg.png" alt="" />
    </div>
    <BottomBar title="攻城略地" />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import BottomBar from "./bottom_bar.vue";
export default {
  name: "stake_main",
  components: {
    BottomBar,
  },
  setup() {
    const data = reactive({
      pools: [
        {
          key: 0,
          name: "黄巾之乱",
          apy: "暂未开放",
          time: 7,
          img: require("../../assets/stake/p_0.png"),
          diff: require("../../assets/stake/h0.png"),
        },
        {
          key: 1,
          name: "夷陵之战",
          apy: "暂未开放",
          time: 15,
          img: require("../../assets/stake/p_1.png"),
          diff: require("../../assets/stake/h1.png"),
        },
        {
          key: 2,
          name: "决战虎牢关",
          apy: "暂未开放",
          time: 30,
          img: require("../../assets/stake/p_2.png"),
          diff: require("../../assets/stake/h2.png"),
        },
      ],
    });
    const getDiffName = (idx) => {
      return ["简单", "中等", "困难"][idx];
    };
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      getDiffName,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  background: #200202;
  .badge {
    position: absolute;
    width: 80%;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, 0);
    z-index: 1;
    img {
      width: 100%;
    }
  }
}
.main {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #480808 0%, rgba(104, 18, 18, 0) 100%);
  z-index: 2;
  .item {
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    width: 18rem;
    height: 28rem;
    margin: 0 5rem;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .inner {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        border-radius: 16px;
        width: 100%;
        height: 100%;
      }
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.5rem;
        img {
          width: 4rem;
          margin-bottom: 1rem;
        }
      }
      .top_right {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: baseline;
        font-size: 1.2rem;
        white-space: nowrap;
        img {
          height: 2rem;
        }
        transform: translate(10%, -30%);
      }
    }
    .name {
      font-size: 1.5rem;
      margin: 1rem 0;
    }
    .apy {
      color: white;
    }
  }
}
</style>