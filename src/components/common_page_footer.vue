<template>
  <div class="box">
    <div
      class="back_to_home"
      v-show="$route.name != 'home'"
      @click="() => $router.push({ name: 'home' })"
    >
      <div class="text">主页</div>
    </div>
    <div
      class="swap"
      @click="$router.push({ name: 'swap' })"
      :style="$route.name == 'home' ? 'margin-left:8rem' : ''"
    >
      <img class="img" src="../assets/common/mmc_logo.svg" alt="" />
      <div class="text">Swap</div>
    </div>
    <div class="menu">
      <div
        v-for="item in menuList"
        :key="item.key"
        class="menu_item"
        @click="() => $router.push({ name: item.href })"
      >
        <img class="img" :src="item.img" alt="" />
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="call" @click="() => $router.push({ name: 'mint' })">
      <img
        v-if="$route.name == 'home'"
        class="img"
        src="../assets/common/call.png"
        alt=""
      />
      <div v-else class="common_call">
        <img src="../assets/common/common_call.png" alt="" />
        <div class="text">招贤纳士</div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "common_page_footer",
  setup() {
    const data = reactive({
      menuList: [
        {
          key: "pack",
          img: require("../assets/common/pack.png"),
          href: "pack",
          text: "背包",
        },
        {
          key: "market",
          img: require("../assets/common/market.png"),
          href: "market",
          text: "市场",
        },
        {
          key: "exchange",
          img: require("../assets/common/exchange.png"),
          href: "exchange",
          text: "兑换",
        },
        {
          key: "store",
          img: require("../assets/common/store.png"),
          href: "store",
          text: "战备",
        },
        {
          key: "reborn",
          img: require("../assets/common/reborn.png"),
          href: "reborn",
          text: "重生",
        },
        {
          key: "mix",
          img: require("../assets/common/mix.png"),
          href: "mix",
          text: "进阶",
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
<style lang="less" scoped>
.box {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  background: linear-gradient(
    180deg,
    rgba(45, 40, 40, 0) -27.5%,
    #2e1a09 172.5%
  );
  border-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 1.88%,
      rgba(255, 249, 227, 0.44) 26.35%,
      #fff9e3 41.35%,
      #fff9e3 90.21%,
      rgba(255, 255, 255, 0) 100%
    )
    1;
  border-top: 1px solid;
  z-index: 100;
}
.back_to_home {
  cursor: pointer;
  height: 5rem;
  border-right: 1px solid;
  border-image-source: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 9.16%,
    #fff9e3 18.24%,
    #ffffff 55.22%,
    #fff9e3 85.85%,
    rgba(255, 255, 255, 0) 94.35%
  );
  border-image-slice: 1;
  transform: skewX(-15deg);
  display: flex;
  align-items: center;
  .text {
    background: linear-gradient(127.89deg, #bf9c68 28.12%, #946e36 66.75%);
    background-clip: text;
    font-size: 2rem;
    color: transparent;
    transform: skewX(15deg);
    margin-left: 2rem;
    margin-right: 4rem;
  }
}
.swap {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 400;
  margin-left: 1rem;
  .text {
    margin-left: 1rem;
  }
  .img {
    width: 2.5rem;
  }
}
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-image-source: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 9.16%,
    #fff9e3 18.24%,
    #ffffff 55.22%,
    #fff9e3 85.85%,
    rgba(255, 255, 255, 0) 94.35%
  );
  border-image-slice: 1;
  transform: skewX(-15deg);
  padding: 0 4rem;

  .menu_item {
    &:hover {
      opacity: 0.6;
    }
    position: relative;
    transform: skewX(15deg);
    cursor: pointer;
    margin: 0 1rem;
    .img {
      height: 4.5rem;
    }
    .text {
      position: absolute;
      right: 0;
      bottom: 10%;
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
}
.call {
  position: relative;
  margin-right: 4rem;
  cursor: pointer;
  .img {
    position: absolute;
    height: 16rem;
    transform: translate(-100%, -90%);
  }
  .common_call {
    position: relative;
    width: 10rem;
    img {
      width: 100%;
    }
    .text {
      width: 100%;
      font-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
