<template>
  <div class="box">
    <button @click="approve">approve</button>
    <button @click="deposit">deposit</button>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import useHeroDetail from "../../utils/useHeroDetail.js";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "stk_go_detail",
  components: {},
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      rawData: [],
      selected: [],
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
      await getPack();
    });
    const approve = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等到授权英雄", store.state.toast_info);
        const c = store.state.c_hero;
        const addr = store.state.c_staking.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .setApprovalForAll(addr, true)
          .estimateGas({ from: data.account });
        const res = await c.methods.setApprovalForAll(addr, true).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const deposit = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等到质押英雄", store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .deposit([3], 1)
          .estimateGas({ from: data.account });
        const res = await c.methods.deposit([3], 1).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("质押成功", store.state.toast_success);
        }
      } catch (e) {
        console.error(e)
        proxy.$toast("质押失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const onSelect = async (tokenId) => {
      const idx = data.selected.findIndex((x) => x.tokenId == tokenId);
      if (idx == -1) {
        data.selected.push(tokenId);
      } else {
        data.selected.splice(idx, 1);
      }
    };
    const getPack = async () => {
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        data.rawData = [];
        res.map((x) => {
          const uid =
            x.camp.toString() + x.rarity.toString() + x.heroId.toString();
          data.rawData.push({
            tokenId: x.tokenId,
            heroId: x.heroId,
            rarity: x.rarity,
            quality: x.quality,
            properties: x.properties.map((x) => Number(x) / 100),
            power: Number(x.power) / 100,
            star: x.star,
            rebirthTimes: x.rebirthTimes,
            preference: x.preference,
            native: x.native,
            level: x.level,
            camp: x.camp,
            addition: x.addition,
            uid: uid,
            ...useHeroDetail(uid, x.preference),
          });
        });
      } catch (e) {
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      onSelect,
      deposit,
      approve,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  background: url("../../assets/stake/stake/stake_bg.png") no-repeat;
  background-size: 100% 100%;
}
</style>