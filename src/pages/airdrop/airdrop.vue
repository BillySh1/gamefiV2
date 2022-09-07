<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <img
      class="bg_badge"
      src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/bg_badge.svg"
      alt=""
    />
    <Lottie v-if="loading" :options="loading_options" />

    <div v-else class="content">
      <div v-if="quality" class="main">
        <Lottie class="airdrop_box" :options="lottie_options" />
        <div class="claim_btn_box">
          <CommonButton :disabled="true" class="btn"> Claim </CommonButton>
          <CommonButton @click="Claim" class="btn">
            Special Claim
          </CommonButton>
        </div>
      </div>
      <div v-else class="empty">{{ t("airdrop_no_valid") }}</div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import CommonButton from "../../components/common_button.vue";
import { useRouter } from "vue-router";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
    CommonButton,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      pageTitle: t("airdrop_space"),
      quality: false,
      account: "",
      web3: "",
      loading: false,
      beforePack: [],
    });
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
      await getAirdropInfo();
      await getBeforePack();
      data.loading = false;
    });
    const getBeforePack = async () => {
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        res.map((x) => {
          data.beforePack.push({
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
        sessionStorage.setItem("before_pack", JSON.stringify(data.beforePack));
      } catch (e) {
        console.log("error");
      }
    };
    const Claim = async () => {
      try {
        proxy.$toast(t("waiting..."), store.state.toast_info);
        const c = store.state.c_airdrop;

        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .claimSpecialAirDrop()
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.claimSpecialAirDrop().send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          router.push({
            name: "minting",
          });
          proxy.$toast(t("common_tip_success"), store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(t("common_tip_error"), store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const getAirdropInfo = async () => {
      const c = store.state.c_airdrop;
      data.quality = await c.methods.isInWhiteList(data.account).call();
    };
    const loading_options = computed(() => {
      return {
        animationData: require("../../assets/common/loading.json"),
      };
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/aridrop/airdrop.json`),
      };
    });

    const refData = toRefs(data);
    return {
      t,
      ...refData,
      lottie_options,
      loading_options,
      Claim,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 20%;
    opacity: 0.8;
    transform: translateX(-50%);
  }
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .airdrop_box {
    width: 50% !important;
  }
  .claim_btn_box {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    z-index: 200;
    .btn {
      margin: 0 1rem;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
}
.empty {
  font-size: 2rem;
}
</style>
