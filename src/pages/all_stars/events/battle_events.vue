<template>
  <Event1View
    v-if="type == 1"
    :placeText="placeText"
    @close="() => $emit('close')"
    @march="(v) => march(v)"
  />
  <Event2View
    v-if="type == 2"
    :placeText="placeText"
    @close="() => $emit('close')"
    @march="(v) => march(v)"
  />
  <EventLockView
    v-if="type == 'lock'"
    @close="() => $emit('close')"
    :placeText="placeText"
    @unlock="unlock"
  />
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
import Event1View from "./event_1_view.vue";
import Event2View from "./event_2_view.vue";
import EventLockView from "./event_lock_view.vue";
export default {
  name: "battleEvents",
  props: ["value", "type", "placeText"],
  components: {
    Event1View,
    Event2View,
    EventLockView,
  },
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
      await getCurrentNode();
    });
    const getCurrentNode = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getNode(data.account, 1).call();
      data.curNode = res;
    };

    const getCampImg = computed(() => {
      return [
        "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/cardImgs/hero/bg/c0.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/cardImgs/hero/bg/c1.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/cardImgs/hero/bg/c2.png",
        "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/cardImgs/hero/bg/c3.png",
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
        case "wait":
          return "等待打扫战场";
        default:
          return "error";
      }
    });
    const getIntroText = computed(() => {
      switch (prop.type) {
        case 1:
          return "暂未发生战斗，如果选择继续前进将行军前往下一据点，您也可以继续等待与敌军激战";
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
        case "wait":
          return "前方据点刚经历战事，正在锁定状态，如果您要在此战斗请等待其他玩家打扫战场，或您可以选择继续前进";
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
          gas: Number(gas) + 100000,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
          ctx.emit("refresh");
          ctx.emit("close");
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getStatusText,
      getIntroText,
      getCampImg,
      additionPower,
      march,
      unlock,
    };
  },
};
</script>
<style lang='less' scoped>
</style>