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
    <InjectModal
      :title="'卡牌进阶'"
      :value="showStockModal"
      @close="() => (showStockModal = false)"
      @confirm="() => (showStockModal = false)"
    >
      <div class="modal_inner_box">
        <div class="up">
          您将使用
          <img
            style="width: 4rem"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/store/item/jinjie.png"
            alt=""
          />
          并尊盟约 x {{ costNum }} 对 {{ leftInfo.name }}和
          {{ rightInfo.name }} 进行 进阶 吗
        </div>
        <div class="sub">当前拥有 并尊盟约 数量 {{ remainNum }}</div>
        <CommonButton
          class="btn"
          @click="
            () => {
              $router.push({
                name: 'storeDetail',
                query: {
                  info: 8,
                },
              });
            }
          "
          >前往商店</CommonButton
        >
      </div>
    </InjectModal>

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
          <img
            v-if="!qualityCost"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/item_add.png"
            alt=""
          />
          <div v-else>
            <img :src="qualityCost.img" />
            {{ qualityCost.cost }}
          </div>
          <CommonButton
            class="del"
            v-if="qualityCost"
            @click="
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                qualityCost = undefined;
              }
            "
          >
            清除
          </CommonButton>
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
          <img
            v-if="!attrCost"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/item_add.png"
            alt=""
          />
          <div v-else>
            <img :src="attrCost.img" />
            {{ attrCost.cost }}
          </div>
          <CommonButton
            class="del"
            v-if="attrCost"
            @click="
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                attrCost = undefined;
              }
            "
          >
            清除
          </CommonButton>
        </div>
      </div>
    </div>
    <div v-if="showPack" class="content">
      <InjectPackHero
        :value="showPack && packType == 2"
        @back="() => (showPack = false)"
        :toSelect="true"
        :hideSearch="true"
        @select="(x) => handleSelect(x)"
      />
      <img
        class="mix_mist"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/mix_mist.png"
        alt=""
      />
    </div>
    <div v-if="!showPack && !loading" class="content">
      <img
        class="mix_mist"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/mix_mist.png"
        alt=""
      />
      <div class="inner">
        <div
          class="mix_item"
          @click="
            () => {
              origin = 0;
              packType = 2;
              showPack = true;
            }
          "
        >
          <img
            class="mix_item_bg"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/mix_item.png"
            alt=""
          />
          <div class="hero_selected" v-if="leftInfo">
            <HeroCardItem :info="leftInfo" />
          </div>
          <img
            v-if="leftInfo"
            class="ready"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/ready.png"
            alt=""
          />
          <div v-else class="no_selected">请选择卡牌</div>
        </div>
        <div class="mix_swirl">
          <img
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/swirl.png"
            alt=""
          />
        </div>
        <div
          class="mix_item right"
          @click="
            () => {
              origin = 1;
              packType = 2;
              showPack = true;
            }
          "
        >
          <img
            class="mix_item_bg"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/mix_item.png"
            alt=""
          />
          <div class="hero_selected" v-if="rightInfo">
            <HeroCardItem v-if="rightInfo" :info="rightInfo" />
          </div>
          <img
            v-if="rightInfo"
            class="ready"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/ready.png"
            alt=""
          />
          <div v-else class="no_selected">请选择卡牌</div>
        </div>
      </div>
      <div class="tip_badge" @click="() => (showModal = true)">
        <div class="inner">
          <img
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/tip_badge.svg"
          />
          <div class="text">进阶提醒</div>
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
      class="action_btn"
      @click="btnClick"
    >
      <CommonButton>{{ btnText }}</CommonButton>
    </div>

    <CommonPageFooter />

    <InjectModal
      @close="() => (showModal = false)"
      @confirm="() => (showModal = false)"
      :value="showModal"
      title="进阶提醒"
    >
      <div class="modal_text">相同阵营， 相同稀有度的英雄才可以进阶</div>
      <div class="modal_text">进阶卡牌固定消耗并尊盟约，数量视稀有度而定</div>
      <div class="modal_text">
        可选择使用宝石(例:
        神眷石)提升进阶后卡牌的高品质概率，消耗数量视稀有度而定
      </div>
      <div class="modal_text">
        可选择使用金镶灵玉提升进阶后卡牌的初始属性，消耗数量视稀有度而定
      </div>
      <div class="modal_text" style="color: red">
        注： 金卡不可进阶， 橙卡进阶金卡必须满级满星且品质为SSR
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
      showStockModal: false,
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
        if (Number(data.costNum) > Number(data.remainNum)) {
          data.showStockModal = true;
          return;
        }
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
          proxy.$toast(`授权额度足够，无需授权`, store.state.toast_info);
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
        const temp = [4, 5, 6].findIndex((i) => {
          return i == data.qualityCost.tokenId;
        });
        const gemId = temp == -1 ? 0 : temp;
        const isUseAddvancedGem =
          data.attrCost && data.attrCost.tokenId
            ? !!data.attrCost.tokenId
            : false;
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
      if (item.rarity == 4) {
        proxy.$toast("金卡无法进阶", store.state.toast_error);
        return;
      }
      if (
        item.rarity == 3 &&
        item.level != 5 &&
        item.star != 5 &&
        item.quality != 3
      ) {
        proxy.$toast("橙卡进阶需满级满星且品质为传说", store.state.toast_error);
        return;
      }
      if (data.origin == 0 && data.leftInfo && !data.rightInfo) {
        data.leftInfo = item;
        sessionStorage.setItem("left_info", JSON.stringify(item));

        data.curRarity = item.rarity;
        data.curCamp = item.camp;
        data.showPack = false;
        return;
      }
      if (data.origin == 1 && data.rightInfo && !data.leftInfo) {
        data.rightInfo = item;
        sessionStorage.setItem("right_info", JSON.stringify(item));

        data.curRarity = item.rarity;
        data.curCamp = item.camp;
        data.showPack = false;
        return;
      }
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
        sessionStorage.setItem("left_info", JSON.stringify(item));

        data.leftInfo = item;
      } else if (data.origin == 1) {
        if (data.leftInfo && data.leftInfo.tokenId == item.tokenId) {
          proxy.$toast(
            "该英雄已选择, 请选择不同的英雄",
            store.state.toast_error
          );
          return;
        }
        sessionStorage.setItem("right_info", JSON.stringify(item));

        data.rightInfo = item;
      }

      data.showPack = false;
    };
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      const left = sessionStorage.getItem("left_info");
      const right = sessionStorage.getItem("right_info");
      if (left && left != 'null') {
        data.leftInfo = JSON.parse(left);
        sessionStorage.setItem("left_info", 'null');
      }
      if (right && right != 'null' ) {
        data.right = JSON.parse(right);
        sessionStorage.setItem("right_info", 'null');
      }
      await getBeforePack();
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
  .modal_inner_box {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .up {
      font-size: 2rem;
    }
    .sub {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.7);
      margin: 1rem 0;
    }
    .btn {
      place-self: center;
    }
    .main {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .item {
        width: 15rem;
        img {
          width: 50%;
        }
      }
      .middle {
        width: 6rem;
        img {
          width: 100%;
        }
      }
    }
  }
  .modal_text {
    font-size: 1.5rem;
    margin: 0.5rem 0;
  }
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
    // .info {
    // }
    .extra {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      .item {
        position: relative;
        &:hover {
          opacity: 0.8;
        }
        cursor: pointer;
        width: 5rem;
        height: 5rem;
        background: url("http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mix/item_bg.png")
          no-repeat;
        background-size: 100% 100%;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50%;
        }
        .del {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, 150%);
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
