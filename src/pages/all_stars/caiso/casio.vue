<template>
  <div class="box">
    <div class="topbar">
      <div class="left">
        <div class="item" v-for="item in winPoints" :key="item.key">
          <div class="up">
            <img :src="item.img" alt="" />
            <div>
              <div style="margin-bottom: 1rem; color: #9e5b18">赢</div>
              <div>赔率 1:{{ item.point }}</div>
            </div>
          </div>
          <div class="bottom">已质押MMC {{ item.staked }}</div>
        </div>
      </div>
      <img
        style="height: 80%"
        src="../../../allstar_assets/casio/divider.png"
        alt=""
      />
      <div class="right">
        <div class="total">
          <div class="up">{{ totalPool }} MMC</div>
          <div>总奖池子</div>
        </div>
        <div class="total">
          <div class="up">12000</div>
          <div>当前总玩家</div>
        </div>
        <div class="total">
          <div class="green">1:{{ myOdd }}</div>
          <div>我的赔率</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="camps">
        <div
          class="camp_item"
          v-for="item in winPoints"
          :key="item.key"
          @click="() => (curSelect = item.key)"
        >
          <img :src="item.selectImg" alt="" />
          <div class="inner">
            <img
              v-show="item.key != curSelect"
              src="../../../allstar_assets/casio/common_item.png"
              alt=""
            />
            <img
              v-show="item.key == curSelect"
              src="../../../allstar_assets/casio/selected.png"
              alt=""
            />
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="stake">
        <div>下注</div>
        <img src="../../../assets/common/mmc.png" style="margin-left: 1.5rem" />
        <input
          class="ipt"
          type="text"
          v-model="buyNum"
          @input="buyNum = Number($event.target.value.replace(/\D+/, ''))"
        />
        <div style="margin-right: 1.5rem">MMC</div>
        <CommonButton
          @click="handleClick"
          class="btn"
          :circle="true"
          :disabled="btnDisable"
          >{{ btnText }}</CommonButton
        >
      </div>
    </div>
    <div class="back" @click="() => $router.go(-1)">
      <img src="../../../allstar_assets/store/back.png" alt="" />
      <div class="text">返回</div>
    </div>
    <div class="badge_box">
      <div
        class="item"
        @click="
          () =>
            $router.push({
              name: 'bf_casio_history',
            })
        "
      >
        <img src="../../../allstar_assets/casio/badge.png" alt="" />
        <div class="text">历史战役</div>
      </div>
      <div
        class="item"
        @click="
          () =>
            $router.push({
              name: 'bf_staked_his',
            })
        "
      >
        <img src="../../../allstar_assets/casio/badge.png" alt="" />
        <div class="text">下注记录</div>
      </div>
    </div>
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
import CommonButton from "../../../components/common_button.vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "bf_casio",
  components: {
    CommonButton,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      winPoints: [
        {
          key: 0,
          point: 12,
          staked: 0,
          img: require("../../../assets/cardImgs/hero/bg/c0.png"),
          selectImg: require("../../../allstar_assets/casio/camp_0.png"),
          name: "魏",
        },
        {
          key: 1,
          point: 12,
          staked: 0,
          img: require("../../../assets/cardImgs/hero/bg/c1.png"),
          selectImg: require("../../../allstar_assets/casio/camp_1.png"),
          name: "蜀",
        },
        {
          key: 2,
          point: 12,
          staked: 0,
          img: require("../../../assets/cardImgs/hero/bg/c2.png"),
          selectImg: require("../../../allstar_assets/casio/camp_2.png"),
          name: "吴",
        },
        {
          key: 3,
          point: 12,
          staked: 0,
          img: require("../../../assets/cardImgs/hero/bg/c3.png"),
          selectImg: require("../../../allstar_assets/casio/camp_3.png"),
          name: "群",
        },
      ],
      curSelect: undefined,
      btnDisable: false,
      buyNum: 1000,
      btnStatus: 0,
      totalPool: 0,
      account: "",
      web3: "",
    });
    const myOdd = computed(() => {
      if (data.curSelect == undefined) return 1;
      return data.winPoints[data.curSelect].point;
    });
    const btnText = computed(() => {
      return ["授权", "下注"][data.btnStatus];
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getInfo();
    });
    const handleClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await stake();
      }
    };
    const getInfo = async () => {
      const c = store.state.c_bet;
      const odds = await c.methods.getOdds().call();
      data.totalPool = data.web3.utils.fromWei(await c.methods.totalBetPool().call(),'ether');
      for (let i = 0; i < data.winPoints.length; i++) {
        const item = data.winPoints[i];
        const staked = await c.methods.betInfos(data.account, i).call();
        item.point = (Number(odds[i]) / 100).toFixed(0);
        item.staked = data.web3.utils.fromWei(staked.toString());
      }
    };
    const stake = async () => {
      try {
        if (data.curSelect == undefined) {
          proxy.$toast("请选择下注阵营", store.state.toast_error);
          return;
        }
        data.btnDisable = true;
        proxy.$toast("等待下注", store.state.toast_info);
        const c = store.state.c_bet;
        const gasPrice = await data.web3.eth.getGasPrice();
        const value = data.web3.utils.toWei(data.buyNum.toString(), "ether");
        const gas = await c.methods
          .bet(data.curSelect, value)
          .estimateGas({ from: data.account });
        const res = await c.methods.bet(data.curSelect, value).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });

        if (res.status) {
          proxy.$toast("下注成功", store.state.toast_success);
          data.btnStatus = 0;
        }
      } catch (e) {
        proxy.$toast("下注失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
        await getInfo()
      }
    };
    const approve = async () => {
      try {
        proxy.$toast("等待授权", store.state.toast_info);
        data.btnDisable = true;
        const c = store.state.c_mmc;
        const value = data.web3.utils.toWei(data.buyNum.toString(), "ether");
        const addr = store.state.c_bet.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, value)
          .estimateGas({ from: data.account });
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
        data.btnDisable = false;
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      myOdd,
      btnText,
      handleClick,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  padding: 2rem 4rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("../../../allstar_assets/casio/bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .back {
    cursor: pointer;
    display: flex;
    place-self: flex-start;
    font-size: 2rem;
    align-items: center;
    img {
      width: 2.5rem;
      margin-right: 2rem;
    }
  }
}
.topbar {
  width: 95%;
  height: 8rem;
  display: flex;
  background: url("../../../allstar_assets/casio/top_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      margin: 0 1.5rem;
      img {
        width: 3rem;
        margin-right: 1rem;
      }
      .up {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      .bottom {
        color: #9e5b18;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .total {
      margin: 0 1.5rem;
      .up {
        font-size: 2rem;
        color: #bb8431;
        margin-bottom: 1rem;
      }
      .green {
        font-size: 2rem;
        color: #199b6c;
        margin-bottom: 1rem;
      }
    }
  }
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  .camps {
    display: flex;
    align-items: center;
    .camp_item {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      position: relative;
      margin: 0 1.5rem;
      img {
        width: 15rem;
      }
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 5rem;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2.5rem;
        }
      }
    }
  }
  .stake {
    display: flex;
    align-items: center;
    font-size: 2rem;
    margin-top: 2rem;
    img {
      width: 3rem;
    }
    .btn {
      width: 8rem;
      font-size: 2rem;
    }
    .ipt {
      outline: none;
      border: none;
      font-size: 3rem;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 1rem;
      margin: 0 1rem;
      width: 10rem;
      color: #ffb74b;
      text-align: center;
    }
  }
}
.badge_box {
  position: absolute;
  bottom: 10%;
  right: 0;
  display: flex;
  flex-direction: column;
  .item {
    cursor: pointer;
    position: relative;
    margin: 1rem 0;
    img {
      height: 3rem;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>