<template>
  <div class="container">
    <InjectGoBack v-if="!loading && !mixing && !showModal && !showPack" />
    <Lottie
      v-if="loading"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <InjectPackMix
      :value="showPack && (packType == 0 || packType == 1)"
      :type="packType"
      @back="
        () => {
          showPack = false;
        }
      "
      @select="selectExtra"
      :rarity="leftInfo.rarity"
      :quality="[leftInfo.quality, rightInfo.quality].map((i) => Number(i))"
    />

    <Lottie v-if="mixing" :options="lottie_options" />

    <CommonPageHeader :title="pageTitle" />
    <div
      v-if="
        leftInfo &&
        leftInfo.tokenId &&
        rightInfo &&
        rightInfo.tokenId &&
        !loading &&
        !mixing &&
        !showPack
      "
      class="cost_badge"
    >
      <div class="info">
        需要消耗 并尊盟约, 数量: {{ costNum }} ,当前拥有: {{ remainNum }}
      </div>
      <div class="extra">
        <div
          class="item"
          @click="
            () => {
              packType = 0;
              showPack = true;
            }
          "
        >
          <img v-if="!qualityCost" src="../../assets/mix/item_add.png" alt="" />
          <div v-else>
            <img :src="qualityCost.img" />
            {{ qualityCost.cost }}
          </div>
        </div>
        <div
          class="item"
          @click="
            () => {
              packType = 1;
              showPack = true;
            }
          "
        >
          <img v-if="!attrCost" src="../../assets/mix/item_add.png" alt="" />
          <div v-else>
            <img :src="attrCost.img" />
            {{ attrCost.cost }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPack" class="content">
      <InjectPackHero
        :value="showPack && packType == 2"
        @back="() => (showPack = false)"
        :toSelect="true"
        @select="(x) => handleSelect(x)"
      />
      <img class="mix_mist" src="../../assets/mix/mix_mist.png" alt="" />
    </div>
    <div v-if="!showPack && !loading" class="content">
      <img class="mix_mist" src="../../assets/mix/mix_mist.png" alt="" />
      <div class="inner">
        <div class="mix_item">
          <img class="mix_item_bg" src="../../assets/mix/mix_item.png" alt="" />
          <div class="hero_selected" v-if="leftInfo">
            <HeroCardItem :info="leftInfo" />
          </div>
          <img
            v-if="leftInfo"
            class="ready"
            src="../../assets/mix/ready.png"
            alt=""
          />
          <div
            v-else
            @click="
              () => {
                origin = 0;
                packType = 2;
                showPack = true;
              }
            "
            class="no_selected"
          >
            请选择卡牌
          </div>
        </div>
        <div class="mix_swirl">
          <img src="../../assets/mix/swirl.png" alt="" />
        </div>
        <div class="mix_item right">
          <img class="mix_item_bg" src="../../assets/mix/mix_item.png" alt="" />
          <div class="hero_selected" v-if="rightInfo">
            <HeroCardItem v-if="rightInfo" :info="rightInfo" />
          </div>
          <img
            v-if="rightInfo"
            class="ready"
            src="../../assets/mix/ready.png"
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
      v-if="
        leftInfo &&
        leftInfo.tokenId &&
        rightInfo &&
        rightInfo.tokenId &&
        !loading &&
        !mixing &&
        !showPack
      "
      :class="
        Number(remainNum) < Number(costNum)
          ? 'action_btn disable'
          : 'action_btn'
      "
      @click="btnClick"
    >
      <CommonButton>{{ btnText }}</CommonButton>
    </div>

    <CommonPageFooter />

    <InjectModal
      @close="() => (showModal = false)"
      :value="showModal"
      title="进阶提醒"
    >
      <div>相同阵营， 相同稀有度的英雄才可以进阶</div>
      <div>进阶卡牌固定消耗并尊盟约，数量视稀有度而定</div>
      <div>
        可选择使用宝石(例:
        神眷石)提升进阶后卡牌的高品质概率，消耗数量视稀有度而定
      </div>
      <div>
        可选择使用金镶灵玉提升进阶后卡牌的初始属性，消耗数量视稀有度而定
      </div>
    </InjectModal>
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
import InjectGoBack from "../../components/inject_go_back.vue";
import InjectModal from "../../components/inject_modal";
import InjectPackHero from "../../components/inejct_pack_hero";
import HeroCardItem from "../../components/hero_card_item.vue";
import CommonButton from "../../components/common_button.vue";
import InjectPackMix from "./inject_pack.mix.vue";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3";
import { useRouter } from "vue-router";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectModal,
    InjectPackHero,
    HeroCardItem,
    CommonButton,
    InjectGoBack,
    InjectPackMix,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
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
      remainNum: 0,
      qualityCost: "",
      attrCost: "",
      packType: undefined,
    });
    const btnText = computed(() => {
      return ["授权卡牌", "授权进阶道具", "确认进阶"][data.btnStatus];
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
    const selectExtra = (i) => {
      if (data.packType == 0) {
        data.qualityCost = i;
      } else if (data.packType == 1) {
        data.attrCost = i;
      }
      data.showPack = false;
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
        const isUseUpgradeGem = !!data.qualityCost.tokenId;
        const gemId = [4, 5, 6].findIndex((i) => {
          return i == data.qualityCost.tokenId;
        });
        const isUseAddvancedGem = !!data.attrCost.tokenId;
        console.log(
          "params",
          selected,
          isUseUpgradeGem,
          gemId,
          isUseAddvancedGem
        );
        const gas = await c.methods
          .upgradeRarity(selected, isUseUpgradeGem, gemId, isUseAddvancedGem)
          .estimateGas({ from: data.account });
        data.step = 2;
        data.mixing = true;
        const res = await c.methods
          .upgradeRarity(selected, isUseUpgradeGem, gemId, isUseAddvancedGem)
          .send({
            gasPrice: gasPrice,
            gas: Number.parseInt(gas, 10) + 2000000,
            from: data.account,
          });
        if (res.status) {
          data.step = 0;
          proxy.$toast("进阶成功", store.state.toast_success);
          router.push({
            name: "minting",
          });
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
        await getRemainNum();
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
      await getBeforePack();
      data.loading = false;
    });
    const getRemainNum = async () => {
      const c = store.state.c_richShop;
      data.remainNum = await c.methods.balanceOf(data.account, 8).call();
    };
    const getBeforePack = async () => {
      const temp = [];
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        res.map((x) => {
          temp.push({
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
          });
        });
        sessionStorage.setItem("before_pack", JSON.stringify(temp));
      } catch (e) {
        console.log(e);
        proxy.$toast("获取背包列表失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      handleSelect,
      btnText,
      btnClick,
      selectExtra,
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
  .disable {
    pointer-events: none;
    filter: grayscale(100);
  }
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
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 21;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .info {
    }
    .extra {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      .item {
        &:hover {
          opacity: 0.8;
        }
        cursor: pointer;
        width: 5rem;
        height: 5rem;
        background: url("../../assets/mix/item_bg.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50%;
        }
      }
    }
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
    bottom: 15%;
    left: 0;
    white-space: nowrap;
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
      pointer-events: none;
      user-select: none;
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
    transform: translateX(5rem);
    width: 25rem;
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
      color: rgba(255, 255, 255, 0.3);
    }
  }
  .right {
    transform: translateX(-5rem);
  }
}
</style>
