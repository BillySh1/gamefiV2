<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div v-if="minting || loading" class="content">
      <Lottie v-if="minting" :options="lottie_minting_options" />
      <Lottie
        v-if="loading"
        :options="{
          animationData: require('../../assets/common/loading.json'),
        }"
      />
    </div>

    <div v-else class="content">
      <div class="left_c">
        <div class="img_box">
          <HeroCardItem :info="info" />
        </div>
      </div>
      <div class="right_c">
        <div class="right_c_title">
          <div class="right_c_title_value">
            {{ info.title }}
            <img
              class="right_c_title_badge"
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/active_title.png"
            />
          </div>
        </div>
        <div class="right_c_content">
          {{ info.intro }}
        </div>
        <div class="right_c_content">{{ t("sell_order_intro") }}</div>
        <div class="right_c_action">
          <div class="input_box">
            <img
              style="cursor: pointer"
              class="img_action"
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mint/minus.svg"
              @click="
                () => {
                  const temp = price - 100;
                  if (temp < 0) {
                    price = 0;
                    return;
                  }
                  price = temp;
                }
              "
            />
            <div class="ipt_bg">
              <img
                class="ipt_img"
                src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mint/input.png"
                alt=""
              />
              <input
                v-model="price"
                class="input"
                @input="price = Number($event.target.value.replace(/\D+/, ''))"
              />
            </div>
            <img
              class="img_action"
              style="cursor: pointer"
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mint/add.svg"
              @click="
                () => {
                  price += 100;
                }
              "
            />
          </div>

          <div class="right_c_btn" @click="btnClick">
            <img
              class="btn_img"
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/mint/btn.png"
              alt=""
            />
            <div class="richt_c_btn_value">{{ btnText }}</div>
          </div>
        </div>
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
  computed,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3.js";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import HeroCardItem from "../../components/hero_card_item.vue";
import useHeroDetail from "../../utils/useHeroDetail";
import InjectGoBack from "../../components/inject_go_back.vue";
import { useI18n } from "vue-i18n";

export default {
  name: "sell",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    HeroCardItem,
    InjectGoBack,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      info: "",
      price: 1000,
      pageTitle: t("sell_card"),
      web3: "",
      account: "",
      btnStatus: 0,
      beforePack: [],
      minting: false,
      loading: false,
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
    });
    const lottie_minting_options = computed(() => {
      return {
        animationData: require(`../../assets/mint/type${data.info.key}.json`),
      };
    });

    const btnClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus === 1) {
        await push();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(
          `${t("common_wait_approve")} ${data.info.name}`,
          store.state.toast_info
        );
        const c = store.state.c_hero;
        const addr = store.state.c_exchange.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, data.info.tokenId)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.approve(addr, data.info.tokenId).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast(
            `approve ${data.info.name} susscce`,
            store.state.toast_success
          );
        }
      } catch (e) {
        proxy.$toast(
          `approve ${data.info.name} error`,
          store.state.toast_error
        );
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const push = async () => {
      try {
        proxy.$toast(t("common_wait_check"), store.state.toast_info);
        const c = store.state.c_exchange;
        const price = data.web3.utils.toWei(data.price.toString(), "ether");
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .put(data.info.tokenId, price)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.put(data.info.tokenId, price).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });

        if (res.status) {
          proxy.$toast(t("common_tip_success"), store.state.toast_success);
          router.push({
            name: "marketDetail",
            query: {
              camp: data.info.camp,
            },
          });
        }
      } catch (e) {
        proxy.$toast(e, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };

    const btnText = computed(() => {
      return [t("approve"), t("push")][data.btnStatus];
    });
    const getHeroInfo = async () => {
      const c = store.state.c_hero;
      const res = await c.methods.getHero(route.query.tokenId).call();
      const uid =
        res.camp.toString() + res.rarity.toString() + res.heroId.toString();
      data.info = { ...res, ...useHeroDetail(uid, res.preference), uid: uid };
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
      await getHeroInfo();
      data.loading = false;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      btnText,
      btnClick,
      lottie_minting_options,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/bg.png")
    no-repeat;
  background-size: 100% 100%;
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left_c {
  width: 30%;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  margin: auto;
}
.img_c {
  max-width: 70%;
  max-height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: spin 60s infinite linear;
}
.right_c {
  width: 40%;
}
.right_c_title {
  display: flex;
  align-items: center;
}
.right_c_title_value {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}
.right_c_title_badge {
  max-width: 200%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.right_c_price {
  display: flex;
  align-items: center;
  margin-left: 3rem;
  font-family: zihun129;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
}
.right_c_content {
  font-size: 1.5rem;
  text-align: left;
  color: #ffffff;
  margin: 1rem 0;
}
.right_c_action {
  display: flex;
  align-items: center;
}
.input_box {
  display: flex;
  align-items: center;
  margin-right: 3rem;
  .img_action {
    width: 2rem;
  }
  .ipt_img {
    margin: 0 1rem;
    width: 15rem;
  }
}
.ipt_bg {
  position: relative;
  margin: 0 1rem;
}
.input {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  outline: none;
  background: transparent;
  border: none;
  text-align: center;
  font-size: 1.8rem;
  color: #f2dbb9;
}
.right_c_btn {
  position: relative;
  transform: scale(0.8);
  cursor: pointer;
  .btn_img {
    max-width: 10rem;
  }
}
.richt_c_btn_value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}
</style>
