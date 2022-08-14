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
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/power_text_left.svg"
            alt=""
          />
          <div class="text">
            <img class="power_img" src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/power_item.png" />
          </div>
          <img
            class="part"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/power_text_right.svg"
            alt=""
          />
        </div>

        <div class="power_value">
          <div class="text">{{t('power')}}</div>
          <div class="value">{{ Number(info.power) / 100 }}</div>
        </div>
      </div>
    </div>
    <div class="priceZone">
      <div class="title">MDAO</div>
      <div class="value">{{ getPrice }}</div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, toRefs } from "vue";
import HeroCardItem from "../../components/hero_card_item";
import initWeb3 from "../../utils/initWeb3";
import { useI18n } from "vue-i18n";
export default {
  name: "pack_hero_item",
  components: {
    HeroCardItem,
  },
  props: ["info"],
  setup(prop) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
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
      t,
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
    transform: translate(-50%, -55%);
  }
  .priceZone {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateY(125%);
    .title {
      margin-left: 1rem;
      color: rgba(255, 255, 255, 0.5);
    }
    .value {
      font-family: SF Pro Text;
      margin-right: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
      font-style: italic;
      background: linear-gradient(48.4deg, #ffca7b 4.15%, #a67327 64.55%);
      color: transparent;
      background-clip: text;
      max-width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
    height: 10%;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: flex;
    .zone_inner {
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
        font-size: 1vmax;
        .part {
          display: block;
          width: 35%;
        }
        .text {
          width: 1.8rem;
          margin: 0 1rem;
          white-space: nowrap;
          img {
            width: 100%;
          }
        }
      }
    }
    .power_img {
      width: 1.5rem;
    }
    .power_value {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      .text {
        margin-left: 1rem;
        color: rgba(255, 255, 255, 0.7);
      }
      .value {
        margin-right: 1rem;
        font-family: SF Pro Text;
        font-style: italic;
        font-weight: 700;
      }
    }
  }
}
</style>
