<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />
    <div v-if="!loading" class="content">
      <div class="left">
        <div class="intro">
          <div>铜钱是富贾三国中流通的货币</div>
          <div>您需要在钱庄中兑换一定数额的铜钱才能</div>
          <div>在商店中正常购买商品</div>
        </div>
        <div class="rate">
          <div>董卓当前给出的汇率为</div>
          <div class="rate_detail">
            <div>1 USDT</div>
            <div>:</div>
            <div>{{ 25 }} 铜钱</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="buy_num">
          <div class="icon">
            <img src="../../assets/exchange/coin.png" />
          </div>
          <input class="ipt" v-model="buyNum" />
          <div class="text">铜钱</div>
        </div>
        <div class="action_button">
          <CommonButton style="font-size: 2rem; width: 20rem">
            {{ btnText }}
          </CommonButton>
        </div>
      </div>
    </div>
    <div v-if="!loading"  class="balance_box">
      <div>余额</div>
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
    <CommonPageFooter />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import CommonButton from "../../components/common_button";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "exchange",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      pageTitle: "钱庄兑换",
      buyNum: 1000,
      btnStatus: 0,
      m3t_balance: 0,
      usdt_balance: 0,
      account: "",
      web3: "",
      lottie_options:{
        animationData: require('../../assets/common/loading.json')
      },
      loading: false,
    });
    const btnText = computed(() => {
      return ["授权 USDT", "兑换成铜钱"][data.btnStatus];
    });
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
      await getBalanceInfo();
      data.loading = false
    });
    const getBalanceInfo = async () => {
      const c_m3t = store.state.c_m3t;
      const c_usdt = store.state.c_usdt;
      const raw_m3t = await c_m3t.methods.balanceOf(data.account).call()
      data.m3t_balance = Number.parseInt(data.web3.utils.fromWei(raw_m3t,'ether'),10).toFixed(2)
      const raw_usdt = await c_usdt.methods.balanceOf(data.account).call()
      data.usdt_balance = Number.parseInt(data.web3.utils.fromWei(raw_usdt,'ether'),10).toFixed(2)
    };
    // const approveU = async()=>{
    // }
    const refData = toRefs(data);
    return {
      ...refData,
      btnText,
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
  .balance_box {
    position: absolute;
    top: 12%;
    right: 10%;
    display: flex;
    align-items: center;
    gap: 2rem;
    .item {
      display: flex;
      align-items: center;
      width: 12rem;
      .icon {
        height: 2rem;
      }
      .name {
        margin: 0 1rem;
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
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
    color: white;
    text-align: left;
    font-size: 2rem;
    line-height: 2;
    .rate {
      .rate_detail {
        font-size: 2.5rem;
        display: flex;
        align-items: center;
        gap: 4rem;
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
    .buy_num {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        width: 6rem;
      }
      .ipt {
        outline: none;
        border: none;
        font-size: 3.5rem;
        background: transparent;
        width: auto;
        color: #f2dbb9;
        width: 15rem;
        text-align: center;
      }
      .text {
        font-size: 3.5rem;
      }
    }
    .action_button {
      cursor: pointer;
    }
  }
}
</style>
