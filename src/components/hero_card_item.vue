<template>
  <div class="hero_card_box">
    <div class="border">
      <img class="border_img" :src="borderImg" />

      <div
        class="name"
        :style="`left:${nameTop};${
          $route.name == 'heroDetail' ? 'font-size:1.5rem' : ''
        }`"
      >
        {{ info.name }}
      </div>
      <div class="lv_t" :style="`left:${nameTop}`">lv.{{ info.level }}</div>
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
      <div
        class="camp"
        :style="`transform: translate( ${transform[0]}, ${transform[1]} )`"
      >
        <img :src="campImg.img" />
      </div>
      <div class="badge" :style="info.rarity == 2 ? 'left:10%' : ''">
        <img :src="getBadgeImg" alt="" />
      </div>
      <div class="badge_inner" :style="getBadgeInnerStyle">
        <img :src="getPreference[0]" />
        {{ getPreference[1] }}
      </div>
    </div>
    <img class="hero" :src="info.img" />
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import useHeroDetail from "../utils/useHeroDetail.js";
import { useRoute } from "vue-router";
export default {
  name: "hero_card_img",
  props: ["info"],
  setup(prop) {
    console.log("1-开始创建组件-setup");
    const data = reactive({});
    const route = useRoute();

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
    const nameTop = computed(() => {
      return ["10%", "8.5%", "7%", "7.5%", "5%", "5%"][prop.info.rarity];
    });
    const getBadgeImg = computed(() => {
      return [
        require("../assets/cardImgs/badge_0.png"),
        require("../assets/cardImgs/badge_1.png"),
        require("../assets/cardImgs/badge_2.png"),
        require("../assets/cardImgs/badge_3.png"),
      ][prop.info.camp];
    });
    const getPreference = computed(() => {
      return [
        [require("../assets/cardImgs/p_0.png"), "盾"],
        [require("../assets/cardImgs/p_1.png"), "战"],
        [require("../assets/cardImgs/p_2.png"), "谋"],
        [require("../assets/cardImgs/p_3.png"), "刺"],
        [require("../assets/cardImgs/p_4.png"), "辅"],
      ][prop.info.preference];
    });
    const getBadgeInnerStyle = computed(() => {
      let res = "";
      if (route.name == "heroDetail") {
        res += "font-size: 1.5rem;";
      }
      if (prop.info.rarity == 2) {
        res += "left:14%;";
      }
      return res;
    });
    const transform = computed(() => {
      return [
        ["-23%", "-17%"],
        ["-30%", "-17%"],
        ["-37%", "-17%"],
        ["-31%", "-17%"],
        ["-49%", "-15%"],
      ][prop.info.rarity];
    });

    const refData = toRefs(data);
    return {
      ...refData,
      borderImg,
      nameTop,
      qualityImg,
      stars,
      campImg,
      useHeroDetail,
      transform,
      levels,
      getBadgeImg,
      getPreference,
      getBadgeInnerStyle,
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
    transform: translate(-44%, -52%);
    z-index: 1;
  }
  .name {
    position: absolute;
    top: 30%;
    transform: translate(0, -50%);
    z-index: 30;
    font-size: 1.1rem;
    max-width: 1.1rem;
    color: white;
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
    gap: 4px;
    width: 10%;
    img {
      width: 100%;
    }
  }
  .levels {
    position: absolute;
    bottom: 18%;
    left: 7%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 9.5%;
    gap: -1px;
    img {
      width: 100%;
    }
  }
  .camp {
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 30;
    width: 20%;
    img {
      width: 100%;
    }
  }
  .badge {
    position: absolute;
    left: 12%;
    bottom: 2%;
    z-index: 30;
    width: 53%;
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
    img {
      width: 25%;
      border-radius: 99%;
      background: #250a0a;
    }
  }
}
</style>