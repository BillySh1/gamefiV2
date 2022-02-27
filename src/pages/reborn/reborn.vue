<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <Lottie
      v-if="loading"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <div v-else class="content">
      <Lottie
        class="lottie"
        v-if="step == 0"
        @animCreated="handleAni0"
        :options="step0Options"
        @click="handleClickReborn"
      />
      <Lottie
        class="lottie"
        v-if="step == 2"
        @animCreated="handleAni1"
        :options="step1Options"
        @click="handleClickReborn"
      />
      <div class="pack_inject_box" v-if="showPack">
        <InejctPackHero
          :toSelect="true"
          :value="showPack && step == 1"
          @back="() => (showPack = false)"
          @select="(i) => handleSelectHero(i)"
        />
      </div>
      <div v-if="curSelectedHero" class="cur_selected_item">
        <HeroCardItem :info="curSelectedHero" />
      </div>

      <div v-if="curSelectedHero" class="cur_selected_cost">
        需要花费 {{ cost }} 枚两仪石, 当前数量 {{ stockBalance }}
      </div>

      <div v-if="curSelectedHero" class="action_btn" @click="actionButtonClick">
        <CommonButton>{{ btnText }}</CommonButton>
      </div>
    </div>
    <CommonPageFooter />
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
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import CommonButton from "../../components/common_button.vue";
import InejctPackHero from "../../components/inejct_pack_hero.vue";
import HeroCardItem from "../../components/hero_card_item.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import getHeroInfo from "../../utils/useHeroDetail";
const openAni = require("../../assets/reborn/open.json");
const closeAni = require("../../assets/reborn/close.json");
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InejctPackHero,
    HeroCardItem,
    CommonButton,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      pageTitle: "卡牌重生",
      step: 0,
      step0Options: {
        animationData: openAni,
        autoplay: false,
        loop: false,
      },
      step1Options: {
        animationData: closeAni,
        autoplay: false,
        loop: true,
      },
      ani0: undefined,
      ani1: undefined,
      showPack: false,
      isOpen: false,
      curSelectedHero: undefined,
      loading: false,
      btnStatus: 0,
      cost: 0,
      stockBalance: 0,
    });

    const btnText = computed(() => {
      return ["授权英雄", "授权两仪石", "确认重生"][data.btnStatus];
    });
    const handleAni0 = (ani) => {
      data.ani0 = ani;
    };
    const handleAni1 = (ani) => {
      data.ani1 = ani;
    };
    const handleSelectHero = async (item) => {
      try {
        data.loading = true;
        const cTraing = store.state.c_training;
        const cShop = store.state.c_richShop;
        data.cost = await cTraing.methods.gemsCost(item.rarity).call();
        data.stockBalance = await cShop.methods
          .balanceOf(data.account, "10")
          .call();
        data.step = 2;
        data.curSelectedHero = item;
      } catch (e) {
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const actionButtonClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await approveStock();
      } else if (data.btnStatus == 2) {
        await reborn();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(
          `等待授权 ${data.curSelectedHero.name} `,
          store.state.toast_info
        );
        const c = store.state.c_hero;
        const addr = store.state.c_training.options.address;
        const tokenId = data.curSelectedHero.tokenId;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, tokenId)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.approve(addr, tokenId).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast(
            `授权 ${data.curSelectedHero.name} 成功`,
            store.state.toast_success
          );
        }
      } catch (e) {
        proxy.$toast(
          `授权 ${data.curSelectedHero.name} 失败`,
          store.state.toast_error
        );
        console.log(e);
      } finally {
        data.loading = false;
      }
    };

    const approveStock = async () => {
      try {
        const c = store.state.c_richShop;

        const addr = store.state.c_training.options.address;
        const isApproved = await c.methods
          .isApprovedForAll(data.account, addr)
          .call();
        if (isApproved) {
          data.btnStatus = 2;
          return;
        }

        proxy.$toast(`等待授权两仪石`, store.state.toast_info);
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .setApprovalForAll(addr, true)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.setApprovalForAll(addr, true).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 2;
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const reborn = async () => {
      try {
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_training;
        const gasPrice = await data.web3.eth.getGasPrice();
        const tokenId = data.curSelectedHero.tokenId;
        const gas = await c.methods
          .rebirth(tokenId)
          .estimateGas({ from: data.account });
        data.step = 2;
        data.ani1.play();
        const res = await c.methods.rebirth(tokenId).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("重生成功", store.state.toast_success);
          await getNewHero();
        }
      } catch (e) {
        proxy.$toast("重生失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const getNewHero = async () => {
      const c = store.state.c_hero;
      const tokenId = data.curSelectedHero.tokenId;
      const res = await c.methods.getHero(tokenId).call();
      const uid =
        res.camp.toString() + res.rarity.toString() + res.heroId.toString();
      data.newMintedItems = [...res, ...getHeroInfo(uid, res.preference)];
    };
    const handleClickReborn = () => {
      if (data.step == 0 && !data.isOpen) {
        data.ani0.play();
        data.isOpen = true;
      } else if (data.step == 0 && data.isOpen) {
        data.step++;
        data.showPack = true;
      }
    };
    onBeforeMount(async () => {
      data.loading = true
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.loading = false
    });

    const refData = toRefs(data);
    return {
      ...refData,
      handleAni0,
      handleAni1,
      handleClickReborn,
      handleSelectHero,
      actionButtonClick,
      btnText,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #250606 0%, #02131f 100%);
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lottie {
  cursor: pointer;
  max-width: 80%;
}
.pack_inject_box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.cur_selected_item {
  position: fixed;
  width: 15rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.action_btn {
  &:hover {
    opacity: 0.8;
  }
  position: fixed;
  cursor: pointer;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
}
.cur_selected_cost {
  position: fixed;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
  color: rgba(255, 255, 255, 0.7);
}
</style>
