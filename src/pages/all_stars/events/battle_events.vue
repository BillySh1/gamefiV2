<template>
  <div class="events_mask" @click="() => $emit('close')">
    <img
      @click="() => $emit('close')"
      class="close"
      src="../../../allstar_assets/popups/close.svg"
      alt=""
    />
    <div class="content">
      <img
        class="c_bg"
        src="../../../allstar_assets/popups/scroll_vertical.png"
        alt=""
      />
      <div class="top">
        <div class="place">
          <img src="../../../allstar_assets/popups/place_bg.png" alt="" />
          <div class="text">{{ placeText }}</div>
        </div>
        <div class="status">
          <img src="../../../allstar_assets/popups/alert_icon.png" alt="" />
          <div>{{ getStatusText }}</div>
        </div>
      </div>
      <div class="inner">
        <div class="intro">
          {{ getIntroText }}
        </div>
        <div v-if="!type == 'lock'" class="info">
          <div class="item">
            <div class="red">{{ additionPower }}</div>
            <div>您将获得战力加成</div>
          </div>
          <img src="../../../allstar_assets/popups/divider.png" alt="" />
          <div class="item">
            <!-- <img class="green" :src="getCampImg" alt="" /> -->
            <div class="green">未知</div>
            <div>敌对阵营</div>
          </div>
        </div>
        <div class="action">
          <div
            v-if="type == 2"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="march(1)"
          >
            <img src="../../../allstar_assets/popups/btn_green.png" alt="" />
            <div class="text">投降</div>
          </div>
          <div
            v-if="[1, 3, 4].includes(type)"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="march(0)"
          >
            <img src="../../../allstar_assets/popups/btn_green.png" alt="" />
            <div class="text">继续前进</div>
          </div>
          <div
            v-if="[2, 3, 4, 6].includes(type)"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="march(2)"
          >
            <img src="../../../allstar_assets/popups/btn_orange.png" alt="" />
            <div class="text">战斗</div>
          </div>
          <div
            v-if="type == 'lock'"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="unlock"
          >
            <img src="../../../allstar_assets/popups/btn_orange.png" alt="" />
            <div class="text">打扫战场</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  computed,
} from "vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
import { map } from "../../../utils/useRoutes";
export default {
  name: "battleEvents",
  props: ["value", "type", "player"],
  components: {},
  setup(prop, ctx) {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      account: "",
      web3: "",
      btnDisable: false,
      curNode: 0,
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
      console.log(prop.player, "battle p");
      await getCurrentNode();
    });
    const getCurrentNode = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getCurrentNode(data.account).call();
      data.curNode = res;
    };
    const placeText = computed(() => {
      return map[data.curNode];
    });

    const getCampImg = computed(() => {
      return [
        require("../../../assets/cardImgs/hero/bg/c0.png"),
        require("../../../assets/cardImgs/hero/bg/c1.png"),
        require("../../../assets/cardImgs/hero/bg/c2.png"),
        require("../../../assets/cardImgs/hero/bg/c3.png"),
      ][0];
    });
    const getStatusText = computed(() => {
      switch (prop.type) {
        case 1:
          return "准备战斗!";
        case 2:
          return "被埋伏了！";
        case 3:
          return "准备埋伏！";
        case 4:
          return "激战间隙！";
        case 6:
          return "遭遇敌军！";
        case "lock":
          return "打扫战场";
        default:
          return "error";
      }
    });
    const getIntroText = computed(() => {
      switch (prop.type) {
        case 1:
          return "暂未遇到敌军，如果选择继续前进将行军前往下一据点，您也可以继续等待与敌军激战";
        case 2:
          return "遭遇敌军在此设伏! 您可以选择投降直接通过或在此与敌军激战，设伏方将享受战力加成，战斗失败方将会折损兵力";
        case 3:
          return "此处属于敌军前往鹿原的必经之地，我军提前在此设伏可大量消耗敌军的有生力量从而在鹿原取得先机。伏击可获得战力加成";
        case 4:
          return "战斗阶段性结束，我军正在休整，您可以选择继续留在此地战斗或继续前进。";
        case 6:
          return "遭遇敌军! 此处乃通往鹿原必经之地，必须在此战斗，停留不前将错失鹿原良机";
        case "lock":
          return "战斗阶段性结束，当前据点一片狼籍已被锁定，如果您需要现在作出决策，请先打扫战场,您也可以等待其他玩家打扫";

        default:
          return "error";
      }
    });
    const additionPower = computed(() => {
      if ([1, 3, 4].includes(Number(prop.type))) {
        return "5%";
      } else {
        return "0%";
      }
    });
    const unlock = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待决策确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .unlockNode()
          .estimateGas({ from: data.account });
        const res = await c.methods.unlockNode().send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
        ctx.emit("refresh");
        ctx.emit("close");
      }
    };
    const march = async (idx) => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待决策确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .march(idx)
          .estimateGas({ from: data.account });
        const res = await c.methods.march(idx).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
        ctx.emit("refresh");
        ctx.emit("close");
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getStatusText,
      getIntroText,
      getCampImg,
      additionPower,
      placeText,
      march,
      unlock,
    };
  },
};
</script>
<style lang='less' scoped>
.events_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close {
  cursor: pointer;
  position: absolute;
  left: 10%;
  top: 10%;
  width: 3rem;
}
.content {
  position: relative;
  width: auto;
  height: auto;
  .c_bg {
    width: 60rem;
    height: 80vmin;
  }
  .top {
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -31%);
    display: flex;
    align-items: center;
    .place {
      width: 40%;
      position: relative;
      white-space: nowrap;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
      }
      margin-right: 2rem;
    }
    .status {
      height: 5rem;
      background: #3f2a12;
      border-radius: 4px;
      padding: 0.5rem 2rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img {
        height: 60%;
        margin-right: 1rem;
      }
      font-size: 1.5rem;
    }
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 81%;
    height: 76%;
    background: rgba(0, 0, 0, 0.3);
    padding: 3rem 3.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .intro {
      font-size: 1.5rem;
      line-height: 1.5;
      text-align: center;
    }
    .info {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 5rem;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .red {
          font-size: 4rem;
          color: #bb4a31;
          margin-bottom: 1.5rem;
        }
        .green {
          font-size: 4rem;
          color: #199b6c;
          height: 5rem;
          margin-bottom: 1.5rem;
        }
      }
    }
    .action {
      width: 100%;
      display: flex;
      justify-content: center;
      .disable {
        pointer-events: none;
        filter: grayscale(100);
      }
      .btn {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        margin: 0 1rem;
        position: relative;
        width: 45%;
        img {
          width: 100%;
        }
        .text {
          font-size: 1.2rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }
      }
    }
  }
}
</style>