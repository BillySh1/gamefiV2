<template>
  <div class="stake_item">
    <img
      v-show="!selected"
      class="bg"
      src="../../../assets/stake/stake/stk_itm_bg.png"
      alt=""
    />
    <img
      v-show="selected"
      class="bg"
      src="../../../assets/stake/stake/selected.png"
      alt=""
    />
    <div class="stake_item_card">
      <HeroAvatar :item="info" />
      <div class="info">
        <div class="power_zone">
          <img src="../../../assets/stake/stake/power.png" alt="" />
          <div class="value">{{ info.power }}</div>
        </div>
        <div class="divider" />
        <div class="detail">
          <div class="stars">
            <img
              v-for="(item, index) in resolveStarsNum"
              :class="index < star ? 'active' : ''"
              :key="index"
              src="../../../assets/stake/stake/star.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import HeroAvatar from "./hero_avatar.vue";
export default {
  name: "stake_pack_item",
  props: ["info", "selected"],
  components: {
    HeroAvatar,
  },
  setup(props) {
    const data = reactive({});
    const resolveStarsNum = computed(() => {
      return [1, 3, 4, 5, 10][props.info.rarity];
    });
    const refData = toRefs(data);
    return {
      resolveStarsNum,
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.stake_item {
  cursor: pointer;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
  position: relative;
  .bg {
    width: 100%;
    height: auto;
  }
  .stake_item_card {
    position: absolute;
    width: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    display: flex;
    align-items: center;
    .info {
      width: calc(100% - 6rem);
      display: flex;
      flex-direction: column;
      margin-left: 1.5rem;
      transform: translateY(0.5rem);
      .power_zone {
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          width: 2rem;
          margin-right: 1.5rem;
        }
        .value {
          font-size: 1.2rem;
          color: #fc6262;
        }
      }
      .divider {
        height: 1px;
        background: #f2dbb9;
        width: 100%;
        margin: 0.5rem 0;
      }
      .detail {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .stars {
          width: 90%;
          height: calc(2rem + 4px);
          display: flex;
          flex-wrap: wrap;
          img {
            filter: grayscale(1);
            width: 1rem;
            height: 1rem;
            margin: 0 3px 3px 0;
          }
          .active {
            filter: none;
          }
        }
        .mix {
          width: 2rem;
        }
      }
    }
  }
}
</style>