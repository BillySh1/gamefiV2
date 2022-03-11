<template>
  <div class="hero_card_box">
    <div class="border">
      <img class="border_img" :src="borderImg" />
      <div
        class="name"
        :style="
          ['/heroDetail', '/orderDetail', '/sell'].includes($route.path) || big
            ? 'font-size:1.5rem;left:8%'
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
            ? 'width:1.5rem'
            : ''
        "
      >
        <img src="../assets/cardImgs/mix.png" alt="" />
      </div>
      <div class="quality">
        <img :src="qualityImg" alt="" />
      </div>
      <div class="stars">
        <img
          v-for="(item, index) in stars"
          :key="index"
          src="../assets/cardImgs/hero/bg/star.png"
        />
      </div>
      <div class="levels">
        <img
          v-for="(item, index) in levels"
          :key="index"
          src="../assets/cardImgs/level.png"
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
    <img class="hero" :src="info.img" />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import useHeroDetail from "../utils/useHeroDetail.js";
export default {
  name: "hero_card_img",
  props: ["info", "big"],
  setup(prop) {
    const data = reactive({});
    const borderImg = computed(() => {
      return (
        [
          require("../assets/cardImgs/hero/bg/r0.png"),
          require("../assets/cardImgs/hero/bg/r1.png"),
          require("../assets/cardImgs/hero/bg/r2.png"),
          require("../assets/cardImgs/hero/bg/r3.png"),
          require("../assets/cardImgs/hero/bg/r4.png"),
        ][prop.info.rarity] || require("../assets/cardImgs/hero/bg/r4.png")
      );
    });
    const qualityImg = computed(() => {
      return [
        require("../assets/cardImgs/hero/bg/q0.png"),
        require("../assets/cardImgs/hero/bg/q1.png"),
        require("../assets/cardImgs/hero/bg/q2.png"),
        require("../assets/cardImgs/hero/bg/q3.png"),
      ][prop.info.quality];
    });
    const campImg = computed(() => {
      return {
        img: [
          require("../assets/cardImgs/hero/bg/c0.png"),
          require("../assets/cardImgs/hero/bg/c1.png"),
          require("../assets/cardImgs/hero/bg/c2.png"),
          require("../assets/cardImgs/hero/bg/c3.png"),
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
        require("../assets/cardImgs/badge_0.png"),
        require("../assets/cardImgs/badge_1.png"),
        require("../assets/cardImgs/badge_2.png"),
        require("../assets/cardImgs/badge_3.png"),
        require("../assets/cardImgs/badge_4.png"),
        require("../assets/cardImgs/badge_5.png"),
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
    width: 69%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-43%, -52%);
    z-index: 1;
  }
  .name {
    @media screen and (max-height: 500px) and (max-width: 1024px) {
      left: 7%;
      letter-spacing: 1px;
      font-size: 1rem;
    }
    @media screen and (max-height: 375px) and (max-width: 768px) {
      left: 5%;
      font-size: 0.8rem;
    }
    position: absolute;
    top: 30%;
    left: 8.5%;
    transform: translate(0, -50%);
    z-index: 30;
    color: #300000;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    writing-mode: vertical-lr;
    letter-spacing: 2px;
  }
  .mix {
    @media screen and (max-height: 500px) {
      left: 7%;
      letter-spacing: 1px;
      font-size: 1rem;
    }
    @media screen and (max-height: 375px) {
      left: 5%;
      font-size: 0.8rem;
    }
    position: absolute;
    top: 40%;
    left: 8.5%;
    z-index: 30;
    width: 1.1rem;
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
    top: 2%;
    right: 15%;
    width: 15%;
    z-index: 30;
    img {
      width: 100%;
      height: auto;
    }
  }
  .stars {
    position: absolute;
    top: 10%;
    right: 0%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 10%;
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
    right: 0%;
    bottom: 0%;
    transform: translate(-23%, -17%);
    z-index: 30;
    width: 20%;
    img {
      width: 100%;
    }
  }
  .badge {
    position: absolute;
    left: 0%;
    bottom: 0%;
    z-index: 30;
    width: 58%;
    transform: translate(23%, -25%);
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