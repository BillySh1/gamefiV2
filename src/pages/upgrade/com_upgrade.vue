<template>
  <div class="com_box">
    <div class="power_box">
      <img src="../../assets/upgrade/power_bg.png" />
      <div class="inner">
        <div class="text">战力值</div>
        <div class="value">{{ info.power }}</div>
        <div class="pImg">
          <img src="../../assets/pack/power_img.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="cost_box">
      <div class="info">
        需要消耗 <strong class="num" >{{ updateInfo.bookUse }}</strong>
        <strong>{{ costName }}</strong> 升级
        <img :src="costImg" alt="" />
      </div>
      <img class="divider" src="../../assets/upgrade/divider.png" />
    </div>
    <div class="property_box" >
        <img src="../../assets/upgrade/properties_bg.png" alt="">
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from "vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "com_upgrade",
  props: ["info", "stockBox"],
  setup(props) {
    const data = reactive({
      updateInfo: "",
      account: "",
      web3: "",
    });
    const store = useStore();
    const costName = computed(() => {
      return props.stockBox[props.info.quality].name;
    });
    const costImg = computed(() => {
      return props.stockBox[props.info.rarity].img;
    });
    const remainNum = computed(() => {
      return props.stockBox[props.info.rarity].num || 0;
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
      await getUpdateInfo();
    });
    const getUpdateInfo = async () => {
      const c = store.state.c_training;
      data.updateInfo = await c.methods
        .getUpgradeDetail(props.info.tokenId)
        .call();
    };
    const refData = toRefs(data);
    return {
      ...refData,
      costName,
      costImg,
      remainNum,
    };
  },
};
</script>
<style lang='less' scoped>
.com_box {
  width: 100%;
  height: 100%;
  .power_box {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .text {
        font-size: 1.8rem;
      }
      .value {
        color: white;
        font-size: 2.5rem;
      }
      .pImg {
        img {
          height: 3rem;
        }
      }
    }
  }
  .cost_box {
    background: linear-gradient(
      180deg,
      rgba(234, 9, 9, 0.3) 0%,
      rgba(40, 2, 2, 0) 100%
    );
    .info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.5rem;
      color: white;
      img {
        height: 6rem;
      }
      .num{
          font-family: Arial, Helvetica, sans-serif;
          font-size: 3rem;
      }
    }
    .divider {
      width: 100%;
    }
  }
  .property_box{
      width: 100%;
      img{
         width: 100%;
      }
  }
}
</style>