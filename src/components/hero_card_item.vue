<template>
  <div class="hero_card_box">
    <div class="border">
      <img class="border_img" :src="borderImg" />
      <div
        v-show="!hideName"
        class="name"
        :style="
          ['/heroDetail', '/orderDetail', '/sell'].includes($route.path) || big
            ? 'bottom:22%'
            : ''
        "
      >
        <span>{{ info.name }}</span>
      </div>
      <div
        v-if="info.native == 1"
        class="mix"
        :style="
          ['/heroDetail', '/orderDetail', '/sell'].includes($route.path) || big
            ? ''
            : ''
        "
      >
        <img
          src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/mix.png"
          alt=""
        />
      </div>
      <div class="quality">
        <img :src="qualityImg" alt="" />
      </div>
      <div class="stars">
        <img
          v-for="(item, index) in stars"
          :key="index"
          src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/star.png"
        />
      </div>
      <div class="levels">
        <img
          v-for="(item, index) in levels"
          :key="index"
          src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/level.png"
          alt=""
        />
      </div>
      <div class="camp">
        <img :src="campImg.img" />
      </div>
      <div class="badge">
        <img :src="getBadgeImg" alt="" />
      </div>
    </div>
    <img
      class="hero"
      :src="
        info.img
          .slice(0, info.img.length - 4)
          .concat(info.quality, info.img.slice(info.img.length - 4))
          .replace('.png', '.jpg')
      "
    />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import useHeroDetail from "../utils/useHeroDetail.js";
export default {
  name: "hero_card_img",
  props: ["info", "big", "hideName"],
  setup(prop) {
    const data = reactive({});
    const borderImg = computed(() => {
      return (
        [
          require("../assets/cardImgs/hero/bg/r0.svg"),
          require("../assets/cardImgs/hero/bg/r1.svg"),
          require("../assets/cardImgs/hero/bg/r2.svg"),
          require("../assets/cardImgs/hero/bg/r3.svg"),
          require("../assets/cardImgs/hero/bg/r4.svg"),
        ][prop.info.rarity] || require("../assets/cardImgs/hero/bg/r0.svg")
      );
    });
    const qualityImg = computed(() => {
      return [
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/q0.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/q1.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/q2.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/q3.png",
      ][prop.info.quality];
    });
    const campImg = computed(() => {
      return {
        img: [
          "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/c0.png",
          "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/c1.png",
          "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/c2.png",
          "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/hero/bg/c3.png",
        ][prop.info.camp],
      };
    });
    const stars = computed(() => {
      const res = [];
      for (let i = 0; i < Number(prop.info.star); i++) {
        res.push({
          status: 0,
        });
      }
      return res;
    });
    const levels = computed(() => {
      const res = [];
      for (let i = 0; i < Number(prop.info.level); i++) {
        res.push({
          status: 0,
        });
      }
      return res;
    });

    const getBadgeImg = computed(() => {
      return [
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_0.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_1.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_2.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_3.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_4.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/cardImgs/badge_5.png",
      ][prop.info.preference];
    });

    const refData = toRefs(data);
    return {
      ...refData,
      borderImg,
      qualityImg,
      stars,
      campImg,
      useHeroDetail,
      levels,
      getBadgeImg,
    };
  },
};
</script>
<style lang='less' scoped>
.hero_card_box {
  position: relative;
  width: 100%;
  height: 100%;
  .border {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 20;
    .border_img {
      width: 100%;
      height: auto;
    }
  }
  .hero {
    position: absolute;
    width: 80%;
    height: auto;
    top: 41%;
    left: 47%;
    transform: translate(-43%, -52%);
    z-index: 1;
  }
  .name {
    @media screen and (max-height: 500px) and (max-width: 1024px) {
      letter-spacing: 1px;
      font-size: 1vmin;
    }
    position: absolute;
    bottom: 22%;
    left: 39%;
    transform: translate(0, -50%);
    z-index: 30;
    text-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    letter-spacing: 2px;
    font-size: 1vmin;
  }
  .mix {
    position: absolute;
    bottom: 23%;
    right: 18%;
    z-index: 30;
    width: 1.3rem;
    img {
      width: 100%;
    }
  }
  .lv_t {
    font-size: 1rem;
    max-width: 1rem;
    position: absolute;
    top: 51%;
    z-index: 30;
    color: white;
  }
  .quality {
    position: absolute;
    top: 0;
    right: 2%;
    width: 20%;
    z-index: 30;
    img {
      width: 100%;
      height: auto;
    }
  }
  .stars {
    position: absolute;
    top: 10%;
    right: 1%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 6%;
    img {
      width: 100%;
      margin-bottom: 4px;
    }
  }
  .levels {
    position: absolute;
    bottom: 18%;
    left: 8%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 9%;
    img {
      width: 100%;
    }
  }
  .camp {
    position: absolute;
    left: 14%;
    bottom: 20%;
    z-index: 30;
    width: 15%;
    img {
      width: 100%;
    }
  }
  .badge {
    position: absolute;
    left: 2%;
    top: 1%;
    z-index: 30;
    width: 43%;
    img {
      width: 100%;
    }
  }
  .badge_inner {
    position: absolute;
    left: 15%;
    bottom: 6%;
    z-index: 30;
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    img {
      width: 25%;
      border-radius: 99%;
      background: #250a0a;
    }
  }
}
</style>