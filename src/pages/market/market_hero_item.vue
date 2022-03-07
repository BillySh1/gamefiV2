<template>
  <div class="power_box">
    <div class="card_content">
      <HeroCardItem :info="info" />
    </div>
    <div class="power_zone">
      <div class="zone_inner">
        <div class="value_box">
          <img
            class="part"
            src="../..//assets/pack/power_text_left.svg"
            alt=""
          />
          <div class="text">战力</div>
          <img
            class="part"
            src="../../assets/pack/power_text_right.svg"
            alt=""
          />
        </div>
        <img class="power_img" src="../../assets/pack/power_item.png" />
        <div class="power_value">{{ Number(info.power) / 100 }}</div>
      </div>
    </div>
    <div class="priceZone">
      <div class="title">MMC</div>
      <div class="value">{{ getPrice }}</div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, toRefs } from "vue";
import HeroCardItem from "../../components/hero_card_item";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "pack_hero_item",
  components: {
    HeroCardItem,
  },
  props: ["info"],
  setup(prop) {
    const data = reactive({
      web3: "",
      account: "",
    });
    const getPrice = computed(() => {
      return data.web3.utils.fromWei(prop.info.price, "ether");
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
    });
    const refData = toRefs(data);
    return {
      ...refData,
      getPrice,
    };
  },
};
</script>
<style lang="less" scoped>
.power_box {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #946e36;
  border-radius: 1rem;
  .card_content {
    position: absolute;
    width: 95%;
    height: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .priceZone {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transform: translateY(100%);
    .title {
      color: rgba(255, 255, 255, 0.5);
    }
    .value {
      font-family: SF Pro Text;
      font-size: 2rem;
      font-weight: 700;
      font-style: italic;
      background: linear-gradient(48.4deg, #ffca7b 4.15%, #a67327 64.55%);
      color: transparent;
      background-clip: text;
    }
  }
  .power_zone {
    position: absolute;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(41, 22, 22, 0) -20.99%,
      rgba(37, 2, 2, 0.8) 100%
    );
    height: 50%;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: flex;
    .zone_inner {
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      place-self: flex-end;
      justify-content: space-around;
      .value_box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .part {
          display: block;
          width: 30%;
        }
        .text {
          font-size: 1.2rem;
          margin: 0 1rem;
          white-space: nowrap;
        }
      }
    }
    .power_img {
      width: 2rem;
    }
    .power_value {
      font-family: SF Pro Text;
      font-size: 1.5rem;
      font-style: italic;
      font-weight: 700;
    }
  }
}
</style>
