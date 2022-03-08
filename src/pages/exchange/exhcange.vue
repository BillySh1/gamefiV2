<template>
  <div class="container">
    <InjectGoBack />
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />
    <div v-if="!loading" class="content">
      <div class="left">
        <div class="intro">
          <div>铜钱是富甲三国中流通的货币</div>
          <div>您需要在钱庄中兑换一定数额的铜钱才能</div>
          <div>在商店中正常购买商品</div>
        </div>
        <div class="rate">
          <div>董卓当前给出的汇率为</div>
          <div class="rate_detail">
            <div>1 USDT</div>
            <div style="margin: 0 4rem">:</div>
            <div>{{ 25 }} 铜钱</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div v-if="!loading" class="balance_box">
          <div class="item title" >余额</div>
          <div class="item">
            <img class="icon" src="../../assets/exchange/coin.png" />
            <span class="name">铜钱</span>
            <span>{{ m3t_balance }}</span>
          </div>
          <div class="item">
            <img class="icon" src="../../assets/exchange/usdt.png" />
            <span class="name">USDT</span>
            <span>{{ usdt_balance }}</span>
          </div>
        </div>
        <div class="up_box">
          <div class="buy_num">
            <div class="icon">
              <img src="../../assets/exchange/usdt.png" />
            </div>
            <input
              class="ipt"
              v-model="buyNum"
              @input="buyNum = Number($event.target.value.replace(/\D+/, ''))"
            />
            <div class="text">USDT</div>
          </div>
          <div class="xs">
            <div>当前可置换</div>
            <div style="margin: 0 1rem">{{ 25 * buyNum }}</div>
            <div>铜钱</div>
          </div>
        </div>

        <div class="action_button">
          <div class="badge">请在上方输入您需要置换的USDT</div>
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
export default {
  name: "exchange",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      pageTitle: "钱庄兑换",
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
      return ["授权 USDT", "兑换成铜钱"][data.btnStatus];
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
        proxy.$toast("等待授权", store.state.toast_info);
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
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const exchange = async () => {
      try {
        proxy.$toast("等待兑换确认", store.state.toast_info);
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
          proxy.$toast("兑换成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("兑换失败", store.state.toast_error);
        console.log(e);
      } finally {
        await getBalanceInfo();
        data.btnStatus = 0;
        data.loading = false;
      }
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
      await getBalanceInfo();
      data.loading = false;
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
  background: url("../../assets/exchange/ex_bg.png") no-repeat;
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
    width: 40%;
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
      .title{
        min-width: 4rem;
      }
    }
    .up_box {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .xs {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transform: translateX(1rem);
        font-size: 1.2rem;
      }
    }
    .buy_num {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 2rem;
      margin-bottom: 2rem;
      .icon {
        display: flex;
        align-items: center;
        white-space: nowrap;
        img {
          margin-left: 1rem;
          max-width: 2.5rem;
        }
      }
      .ipt {
        outline: none;
        border: none;
        font-size: 2rem;
        background: transparent;
        width: 30%;
        color: #f2dbb9;
        text-align: center;
      }
    }
    .action_button {
      cursor: pointer;
      .badge {
        text-align: center;
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 0.5rem;
      }
      .btn{
        margin-top: 2rem;
        font-size: 2rem;
        width: 20rem;
      }
    }
  }
}
</style>
