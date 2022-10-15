<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack v-if="!loading && !minting" />
    <img
      class="badge"
      src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/mint_detail_bg_badge.png"
      alt=""
    />
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
          <img
            :style="{
              transform: `translate(${info.offsetX + ',' + info.offsetY})`,
            }"
            class="img_c"
            :src="info.img"
          />
          <img
            class="rotate"
            style="width: 100%; heihgt: 100%"
            :src="info.bg"
          />
        </div>
      </div>
      <div class="right_c">
        <img
          class="blood"
          src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/blood.png"
          alt=""
        />
        <div class="right_c_title">
          <div class="right_c_title_value">
            {{ info.title }}
            <img
              class="right_c_title_badge"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/common/active_title.png"
            />
          </div>
          <div class="right_c_price">
            <img
              style="margin-right: 2rem"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/common/mmc.png"
            />
            <span>{{ getprice }}</span>
          </div>
        </div>
        <div class="right_c_content">
          {{ $t("mintDetail1") }}
        </div>
        <div class="right_c_content">
          {{ $t("mintDetail2") }}
        </div>
        <div class="right_c_action">
          <div class="input_box">
            <img
              style="cursor: pointer"
              class="img_action"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/minus.svg"
              @click="
                () => {
                  const temp = buyValue - 1;
                  if (temp < 0) {
                    buyValue = 0;
                    return;
                  }
                  buyValue = temp;
                }
              "
            />
            <div class="ipt_bg">
              <img
                class="ipt_img"
                src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/input.png"
                alt=""
              />
              <input
                v-model="buyValue"
                class="input"
                @input="
                  buyValue = Number($event.target.value.replace(/\D+/, ''))
                "
              />
            </div>
            <img
              class="img_action"
              style="cursor: pointer"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/add.svg"
              @click="
                () => {
                  buyValue += 1;
                }
              "
            />
          </div>

          <div class="right_c_btn" @click="btnClick">
            <img
              class="btn_img"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/mint/btn.png"
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
import InjectGoBack from "../../components/inject_go_back.vue";
import { useI18n } from "vue-i18n";

export default {
  name: "mint_detail",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const { t } = useI18n();
    const data = reactive({
      info: "",
      buyValue: 1,
      pageTitle: t("draw"),
      web3: "",
      account: "",
      price: 0,
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
    const getprice = computed(() => {
      return data.buyValue * Number(data.info.price);
    });
    const btnClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus === 1) {
        await buy();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(t("common_wait_approve"), store.state.toast_info);
        const c = store.state.c_mdao;
        const value = data.web3.utils.toWei(getprice.value.toString(), "ether");
        const addr = store.state.c_recruit.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, value)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.approve(addr, value).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast(t('common_approve_success'), store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(t('common_approve_failed'), store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const buy = async () => {
      try {
        proxy.$toast(t('common_wait_check'), store.state.toast_info);
        const c = store.state.c_recruit;
        const gasPrice = await data.web3.eth.getGasPrice();
        let invite = "0x0000000000000000000000000000000000000000";
        const _local = localStorage.getItem("invite");
        if (_local && _local.toLowerCase() != data.account.toLowerCase()) {
          invite = _local;
        }

        const gas = await c.methods
          .buy(data.info.key, data.buyValue, invite)
          .estimateGas({ from: data.account });
        data.minting = true;
        const res = await c.methods
          .buy(data.info.key, data.buyValue, invite)
          .send({
            gasPrice: gasPrice,
            gas: Number.parseInt(gas, 10) + 50000,
            from: data.account,
          });

        if (res.status) {
          proxy.$toast("购买成功", store.state.toast_success);
          router.push({
            name: "minting",
          });
        }
      } catch (e) {
        proxy.$toast("购买失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.minting = false;
      }
    };

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
        console.log('error')
      }
    };

    const btnText = computed(() => {
      return [t("approve"), t("buy")][data.btnStatus];
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
      data.info = JSON.parse(route.query.info);
      await getBeforePack();
      data.loading = false;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      btnText,
      btnClick,
      getprice,
      lottie_minting_options,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
  .badge {
    position: absolute;
    width: 50%;
    height: auto;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left_c {
  width: 40%;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25rem;
  height: 25rem;
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
  position: relative;
  width: 40%;
  .blood {
    position: absolute;
    top: 0;
    right: 0;
    width: 15rem;
    transform: translate(50%, -50%);
  }
}
.right_c_title {
  display: flex;
  align-items: center;
}
.right_c_title_value {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 2rem;
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
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  img {
    width: 2rem;
  }
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
  flex-wrap: wrap;
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
    width: 12.5rem;
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
  font-size: 2.5rem;
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
