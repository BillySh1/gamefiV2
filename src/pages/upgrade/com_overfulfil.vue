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
        需要消耗
        <div class="num">{{ updateInfo.bookUse }}</div>
        <strong style="color: yellow">玉如意</strong> 突破
        <img src="../../assets/store/item/yuruyi.png" alt="" />
      </div>
      <div class="sub_info">
        当前拥有 <img src="../../assets/store/item/yuruyi.png" alt="" /><span
          style="color: yellow"
          >玉如意</span
        >, 数量: {{ remainNum }}
      </div>
      <img class="divider" src="../../assets/upgrade/divider.png" />
    </div>
    <div v-if="canDo" class="over_box">
      <img class="badge" src="../../assets/upgrade/proper_badge.png" />
      <div class="info">
        您将为 <span style="color: yellow">{{ info.name }}</span> 突破并升星
      </div>
      <div>突破后战力值</div>
      <div class="power_value">
        {{ nextPower }}
      </div>
      <div class="action_btn">
        <img src="../../assets/upgrade/action_bg_round.png" alt="" />
        <div class="inner">授权</div>
      </div>
    </div>
    <div v-else class="over_box">
      <div class="empty">您未满级,无法突破</div>
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
      remainNum: 0,
      nextPower: 0,
      canDo: false,
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
      await getRemainNum();
    });
    const getRemainNum = async()=>{
      const c = store.state.c_richShop
      data.remainNum = await c.methods.balanceOf(data.account,'7').call()
    }
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
  background: url("../../assets/upgrade/over_bg.png") no-repeat;
  background-size: 100% 100%;
  .empty {
    margin-top: 4rem;
    color: white;
  }
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
        font-size: 1.6rem;
      }
      .value {
        color: white;
        font-size: 2rem;
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
      .num {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.5rem;
      }
    }
    .sub_info {
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: rgba(255, 255, 255, 0.6);
      img {
        height: 2rem;
      }
    }
    .divider {
      width: 100%;
    }
  }
  .over_box {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;
    gap: 2rem;
    .badge {
      position: absolute;
      width: 6rem;
      top: 0;
      left: 0;
      z-index: 20;
      transform: translate(-30%, -30%);
    }
    .info {
      margin-top: 2rem;
    }
    .power_value {
      color: red;
    }
    .action_btn {
      position: relative;
      width: 8rem;
      img {
        width: 100%;
      }
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>