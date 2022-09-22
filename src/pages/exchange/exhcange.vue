<template>
  <div class="container">
    <InjectGoBack />
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />
    <div v-if="!loading" class="content">
      <div class="left">
        <div class="intro">
          <div>{{ t("ex_title_1") }}</div>
          <div>{{ t("ex_title_2") }}</div>
          <div>{{ t("ex_title_3") }}</div>
        </div>
        <div class="rate">
          <div>{{ t("ex_rate") }}</div>
          <div class="rate_detail">
            <div>1 USDT</div>
            <div style="margin: 0 4rem">:</div>
            <div>{{ 25 }} {{ t("coin") }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="!loading" class="balance_box">
          <div class="item title">{{ t("balance") }}</div>
          <div class="item">
            <img
              class="icon"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/exchange/coin.png"
            />
            <span class="name">{{ t("coin") }}</span>
            <span>{{ m3t_balance }}</span>
          </div>
          <div class="item">
            <img
              class="icon"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/exchange/usdt.png"
            />
            <span class="name">USDT</span>
            <span>{{ usdt_balance }}</span>
          </div>
        </div>
        <div class="up_box">
          <div class="buy_num">
            <div class="icon">
              <img
                src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/exchange/usdt.png"
              />
            </div>
            <input
              class="ipt"
              v-model="buyNum"
              @input="buyNum = Number($event.target.value.replace(/\D+/, ''))"
            />
            <div class="text">USDT</div>
          </div>
          <div class="xs">
            <div>{{ t("ex_can_ex") }}</div>
            <div style="margin: 0 1rem">{{ 25 * buyNum }}</div>
            <div>{{ t("coin") }}</div>
          </div>
        </div>

        <div class="action_button">
          <div class="badge">{{ t("ex_ex_input") }}</div>
          <CommonButton class="btn" @click="btnClick">
            {{ btnText }}
          </CommonButton>
        </div>
      </div>
    </div>

    <CommonPageFooter />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  getCurrentInstance,
} from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import CommonButton from "../../components/common_button";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
export default {
  name: "exchange",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      pageTitle: t("ex_page_title"),
      buyNum: 1000,
      btnStatus: 0,
      m3t_balance: 0,
      usdt_balance: 0,
      account: "",
      web3: "",
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
      loading: false,
    });
    const btnText = computed(() => {
      return [t("approve_usdt"), t("ex_to_coin")][data.btnStatus];
    });
    const btnClick = async () => {
      if (data.btnStatus === 0) {
        await approve();
      } else if (data.btnStatus === 1) {
        await exchange();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(t('common_wait_approve'), store.state.toast_info);
        const c = store.state.c_usdt;
        const value = data.web3.utils.toWei(data.buyNum.toString(), "ether");
        const addr = store.state.c_m3t.options.address;
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
          proxy.$toast(t('common_wait_approve'), store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(t('common_approve_failed'), store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const exchange = async () => {
      try {
        proxy.$toast('wait', store.state.toast_info);
        const c = store.state.c_m3t;
        const value = data.web3.utils.toWei(data.buyNum.toString(), "ether");
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .recharge(value)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.recharge(value).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast(t('ex_success'), store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(t('ex_failed'), store.state.toast_error);
        console.log(e);
      } finally {
        await getBalanceInfo();
        data.btnStatus = 0;
        data.loading = false;
      }
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
      await getBalanceInfo();
    });
    const getBalanceInfo = async () => {
      const c_m3t = store.state.c_m3t;
      const c_usdt = store.state.c_usdt;
      const raw_m3t = await c_m3t.methods.balanceOf(data.account).call();
      data.m3t_balance = Number.parseInt(
        data.web3.utils.fromWei(raw_m3t, "ether"),
        10
      ).toFixed(2);
      const raw_usdt = await c_usdt.methods.balanceOf(data.account).call();
      data.usdt_balance = Number.parseInt(
        data.web3.utils.fromWei(raw_usdt, "ether"),
        10
      ).toFixed(2);
    };

    const refData = toRefs(data);
    return {
      t,
      ...refData,
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
  background: url("https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/exchange/ex_bg.png")
    no-repeat;
  background-size: 100% 100%;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 25rem;
  width: 88rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
    font-size: 1.5rem;
    line-height: 2;
    .rate {
      .rate_detail {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        color: #f2dbb9;
      }
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 1.5rem;
    .balance_box {
      display: flex;
      align-items: center;
      .item {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        min-width: 6rem;
        .icon {
          height: 2.5rem;
        }
        .name {
          margin: 0 1rem;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.7);
        }
      }
      .title {
        font-size: 2rem;
        min-width: 4rem;
      }
    }
    .up_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      place-self: center;
      transform: translateX(3rem);
      .xs {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
      }
    }
    .buy_num {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      place-self: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      .icon {
        display: flex;
        align-items: center;
        white-space: nowrap;
        img {
          max-width: 2.5rem;
        }
      }
      .ipt {
        outline: none;
        border: none;
        font-size: 2rem;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 1rem;
        margin: 0 1rem;
        width: 30%;
        color: #f2dbb9;
        text-align: center;
      }
    }
    .action_button {
      place-self: center;
      cursor: pointer;
      .badge {
        text-align: center;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 0.5rem;
      }
      .btn {
        margin-top: 2rem;
        font-size: 2rem;
        width: 20rem;
      }
    }
  }
}
</style>
