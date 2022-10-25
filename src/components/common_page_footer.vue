<template>
  <div class="box">
    <div class="back_to_home" @click="() => $router.push({ name: 'home' })">
      <div class="text">{{ $t("home") }}</div>
    </div>
    <!-- <div
      class="back_to_home"
      v-show="$route.name == 'home'"
      @click="
        () =>
          $router.push({
            name: 'testCoin',
          })
      "
    >
      <div class="text">Faucet</div>
    </div> -->
    <div class="swap" @click="toSwap">
      <img
        class="img"
        src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/mmc_logo.svg"
        alt=""
      />
      <div class="text">Swap</div>
    </div>
    <div class="menu">
      <div
        v-for="item in menuList"
        :key="item.key"
        :class="item.disable ? 'menu_item disable' : 'menu_item'"
        @click="() => $router.push({ name: item.href })"
      >
        <img class="img" :src="item.img" alt="" />
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="call" @click="() => $router.push({ name: 'mint' })">
      <div class="common_call">
        <img
          :src="
            curLang == 'zh'
              ? require('../assets/Lang/draw_zh.png')
              : require('../assets/Lang/draw_en.png')
          "
        />
      </div>
    </div>
  </div>
</template>

<script >
import { computed, reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
export default {
  name: "common_page_footer",
  setup() {
    const { locale, t } = useI18n({
      useScope: "local",
    });
    const curLang = computed(() => locale.value);
    const menuList = computed(() => [
      {
        key: "pack",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/pack.png",
        href: "pack",
        text: t("pack"),
      },
      {
        key: "market",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/market.png",
        href: "market",
        text: t("market"),
        disable: true,
      },
      {
        key: "exchange",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/exchange.png",
        href: "exchange",
        text: t("exchange"),
        disable: true
      },
      {
        key: "store",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/store.png",
        href: "store",
        text: t("store"),
        disable: true,
      },
      {
        key: "reborn",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/reborn.png",
        href: "reborn",
        text: t("reborn"),
        disable: true,
      },
      {
        key: "mix",
        img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/mix.png",
        href: "mix",
        text: t("mix"),
        disable: true,
      },
    ]);
    const data = reactive({});
    const toSwap = () => {
      window.open("http://www.mdaoswap.xyz/", "_blank");
    };
    const refData = toRefs(data);
    return {
      ...refData,
      locale,
      menuList,
      curLang,
      toSwap,
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
  .disable {
    user-select: none;
    pointer-events: none;
    filter: grayscale();
  }
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
  pointer-events: none;
  filter: grayscale(1);
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
  width: 20rem;
  cursor: pointer;
  .img {
    position: absolute;
    width: 90%;
    transform: translate(-50%, -90%);
  }
  .common_call {
    position: relative;
    img {
      width: 80%;
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
