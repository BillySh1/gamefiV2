<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div
      v-if="leftInfo && leftInfo.tokenId && rightInfo && rightInfo.tokenId"
      class="cost_badge"
    >
      需要消耗 并尊盟约, 数量: {{ costNum }}
    </div>
    <div v-if="showPack" class="content">
      <InjectPackHero
        :value="showPack"
        @back="() => (showPack = false)"
        :toSelect="true"
        @select="(x) => handleSelect(x)"
      />
      <img class="mix_mist" src="../../assets/mix/mix_mist.svg" alt="" />
    </div>
    <div v-if="!showPack && !loading" class="content">
      <img class="mix_mist" src="../../assets/mix/mix_mist.svg" alt="" />
      <div class="inner">
        <div class="mix_item">
          <img class="mix_item_bg" src="../../assets/mix/mix_item.svg" alt="" />
          <div class="hero_selected" v-if="leftInfo">
            <HeroCardItem :info="leftInfo" />
          </div>
          <img
            v-if="leftInfo"
            class="ready"
            src="../../assets/mix/ready.svg"
            alt=""
          />
          <div
            v-else
            @click="
              () => {
                origin = 0;
                showPack = true;
              }
            "
            class="no_selected"
          >
            请选择卡牌
          </div>
        </div>
        <div class="mix_swirl">
          <img src="../../assets/mix/swirl.svg" alt="" />
        </div>
        <div class="mix_item right">
          <img class="mix_item_bg" src="../../assets/mix/mix_item.svg" alt="" />
          <div class="hero_selected" v-if="rightInfo">
            <HeroCardItem v-if="rightInfo" :info="rightInfo" />
          </div>
          <img
            v-if="rightInfo"
            class="ready"
            src="../../assets/mix/ready.svg"
            alt=""
          />
          <div
            v-else
            @click="
              () => {
                origin = 1;
                showPack = true;
              }
            "
            class="no_selected"
          >
            请选择卡牌
          </div>
        </div>
      </div>
      <div class="tip_badge" @click="() => (showModal = true)">
        <div class="inner">
          <img src="../../assets/common/tip_badge.svg" />
          <div class="text">进阶规则</div>
        </div>
      </div>
    </div>
    <div
      v-if="leftInfo && leftInfo.tokenId && rightInfo && rightInfo.tokenId"
      class="action_btn"
      @click="btnClick"
    >
      <CommonButton>{{ btnText }}</CommonButton>
    </div>
    <Lottie v-if="mixing" :options="lottie_options" />
    <Lottie
      v-if="loading"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <CommonPageFooter />

    <InjectModal
      @close="() => (showModal = false)"
      :value="showModal"
      title="进阶提醒"
      >规则</InjectModal
    >
  </div>
</template>

<script >
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  toRefs,
} from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectModal from "../../components/inject_modal";
import InjectPackHero from "../../components/inejct_pack_hero";
import HeroCardItem from "../../components/hero_card_item.vue";
import CommonButton from "../../components/common_button.vue";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectModal,
    InjectPackHero,
    HeroCardItem,
    CommonButton,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      pageTitle: "卡牌进阶",
      showModal: false,
      showPack: false,
      lottie_options: {
        animationData: require("../../assets/mix/mixing.json"),
      },
      loading: false,
      leftInfo: "",
      rightInfo: "",
      curRarity: undefined,
      curCamp: undefined,
      origin: 0,
      costNum: 0,
      btnStatus: 0,
      account: "",
      mixing: false,
      web3: "",
    });
    const btnText = computed(() => {
      return ["授权卡牌", "授权并尊盟约", "确认进阶"][data.btnStatus];
    });
    const btnClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await approveStock();
      } else if (data.btnStatus == 2) {
        await mix();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(`等待授权`, store.state.toast_info);
        const c = store.state.c_hero;
        const addr = store.state.c_training.options.address;
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
          data.btnStatus = 1;
          proxy.$toast(`授权 成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权  失败`, store.state.toast_error);
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
        proxy.$toast(`等待授权并尊盟约`, store.state.toast_info);
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
    const mix = async () => {
      try {
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_training;
        const gasPrice = await data.web3.eth.getGasPrice();
        const selected = [data.leftInfo.tokenId, data.rightInfo.tokenId];
        const gas = await c.methods
          .upgradeRarity(selected, false, 0, false)
          .estimateGas({ from: data.account });
        data.step = 2;
        data.ani1.play();
        data.mixing = true;
        const res = await c.methods
          .upgradeRarity(selected, false, 0, false)
          .send({
            gasPrice: gasPrice,
            gas: Number.parseInt(gas, 10) + 500000,
            from: data.account,
          });
        if (res.status) {
          data.step = 0;
          proxy.$toast("进阶成功", store.state.toast_success);
          data.curSelectedHero = undefined;
        }
      } catch (e) {
        proxy.$toast("进阶失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.mixing = false;
      }
    };
    const getCost = async () => {
      const c = store.state.c_training;
      data.costNum = await c.methods
        .advanceAdditionGemCost(data.curRarity)
        .call();
    };
    const handleSelect = async (item) => {
      if (data.curRarity && data.curRarity != item.rarity) {
        proxy.$toast("请选择稀有度相同的英雄", store.state.toast_error);
        return;
      }
      if (data.curCamp && data.curCamp != item.camp) {
        proxy.$toast("请选择相同阵营的英雄", store.state.toast_error);
        return;
      }

      if (data.curRarity == undefined) {
        data.curRarity = item.rarity;
        await getCost();
      }
      if (data.curCamp == undefined) {
        data.curCamp = item.camp;
      }

      if (data.origin == 0) {
        if (data.rightInfo && data.rightInfo.tokenId == item.tokenId) {
          proxy.$toast(
            "该英雄已选择, 请选择不同的英雄",
            store.state.toast_error
          );
          return;
        }
        data.leftInfo = item;
      } else if (data.origin == 1) {
        if (data.leftInfo && data.leftInfo.tokenId == item.tokenId) {
          proxy.$toast(
            "该英雄已选择, 请选择不同的英雄",
            store.state.toast_error
          );
          return;
        }
        data.rightInfo = item;
      }
      data.showPack = false;
    };
    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.loading = false;
    });
    const refData = toRefs(data);
    return {
      ...refData,
      handleSelect,
      btnText,
      btnClick,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: black;
  .action_btn {
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: 15%;
    z-index: 21;
    transform: translateX(-50%);
  }
  .cost_badge {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 21;
    font-size: 1.2rem;
  }
}
.content {
  position: relative;
  height: 100%;
  background: radial-gradient(
    80.32% 80.32% at 50.04% 11.21%,
    #0e408a 0%,
    rgba(78, 11, 11, 0) 100%
  );
  .tip_badge {
    cursor: pointer;
    position: absolute;
    top: 8rem;
    left: 0;
    .inner {
      position: relative;
      img {
        width: 10rem;
        opacity: 1;
      }
      .text {
        position: absolute;
        margin: auto;
      }
    }
  }
  .mix_mist {
    position: absolute;
    right: 0;
    height: calc(100% - 9rem);
    top: 4rem;
    bottom: 5rem;
  }
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
      }
    }
    .mix_swirl {
      width: 40rem;
      opacity: 0.6;
      animation: spin 60s infinite linear;
      z-index: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mix_item {
    position: relative;
    z-index: 99;
    transform: translateX(10rem);
    width: 32rem;
    cursor: pointer;
    .mix_item_bg {
      width: 100%;
    }

    .hero_selected {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 55%;
      z-index: 101;
    }
    .ready {
      width: 20rem;
      z-index: 100;
      position: absolute;
      left: 0;
      bottom: 0;
      transform: translate(-3rem, 4rem);
    }
    .no_selected {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      color: rgba(255, 255, 255, 0.3);
    }
  }
  .right {
    transform: translateX(-10rem);
  }
}
</style>
