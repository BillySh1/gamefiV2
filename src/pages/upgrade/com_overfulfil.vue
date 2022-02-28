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
        需要消耗 <strong>{{ updateInfo.bookUse }}</strong>
        <strong>玉如意</strong> 突破
        <img src="../../assets/store/item/yuruyi.png" alt="" />
      </div>
      <div class="sub_info" >当前拥有 <img src="../../assets/store/item/yuruyi.png" alt="">玉如意, 数量: {{remainNum}} </div>
      <img class="divider" src="../../assets/upgrade/divider.png" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
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
      remainNum:0
    });
    const store = useStore();

  
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
    }
    .sub_info{
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 1rem;
        color: rgba(255, 255, 255, .6);
        img{
            height: 2rem;
        }
    }
    .divider {
      width: 100%;
    }
  }
}
</style>