<template>
  <div v-if="loading" class="box">
    <Lottie :options="lottie_options" />
  </div>
  <div v-else class="box">
    <InjectModal
      :title="'提前领取'"
      :value="showWarningModal"
      @close="() => (showWarningModal = false)"
      @confirm="
        () => {
          showWarningModal = false;
          obtain(0);
        }
      "
    >
      <div class="rule_modal_item">确认提前领取收益吗？</div>
      <div class="rule_modal_item" style="color: red">
        提前领取将导致70%收益衰减
      </div>

      <div class="rule_modal_item" style="color: red">
        您当前可领取收益为 {{ 2000 }} MDAO
      </div>
    </InjectModal>
    <InjectModal
      :title="'追加质押'"
      :value="showRuleModal"
      @close="() => (showRuleModal = false)"
      @confirm="
        () => {
          showRuleModal = false;
        }
      "
    >
      <div class="rule_modal_item">追加质押MDAO 规则</div>
      <div class="rule_modal_item" style="color: red">1MDAO = 10 战力</div>
    </InjectModal>
    <div class="topbar">
      <StkBtn
        class="check_map"
        :text="'查看地图'"
        @click="
          () => {
            $router.push({
              name: 'stk_entry',
            });
          }
        "
      />
      <div class="right_top">
        <div class="item">
          <img src="../../assets/stake/main_item.png" alt="" />
          <div class="inner">
            <div class="title">全网总战力</div>
            <div style="font-size: 1.2rem; margin: 0 1.5rem">
              {{ Number(totalPower) / 100 || 0 }}
            </div>
            <img class="coin" src="../../assets/stake/totalpower.png" alt="" />
          </div>
        </div>
        <div class="item">
          <img src="../../assets/stake/main_item.png" alt="" />
          <div class="inner">
            <div class="title">全网有效收益</div>
            <div style="font-size: 1.2rem; margin: 0 1.5rem">
              {{ totalIncome }}
            </div>
            <img class="coin" src="../../assets/stake/coin.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="main_body">
      <div class="left">
        <div class="item">
          <div class="badge">
            <img class="bg" src="../../assets/stake/stake/badge.png" alt="" />
            <div class="text">剩余时间</div>
          </div>
          <div class="detail">
            <div class="lg">任务剩余时间 {{ remainTime }}</div>
            <div class="sm">中途中止作战会衰减出征收益</div>
          </div>
        </div>
        <div class="item">
          <div class="badge">
            <img class="bg" src="../../assets/stake/stake/badge.png" alt="" />
            <div class="text">累计收益</div>
          </div>
          <div class="detail">
            <div class="white lg" style="margin-bottom: 1rem">
              当前历史累计收益
              {{ pendingReward }}
              MDAO
            </div>
            <div class="lg white">每区块奖励 {{ rewardPerblock }} MDAO</div>
          </div>
        </div>
        <div class="item">
          <div class="badge">
            <img class="bg" src="../../assets/stake/stake/badge.png" alt="" />
            <div class="text">推广收益</div>
          </div>
          <div class="detail">
            <div class="lg">
              {{ fromWei(player.inviteReward, "ether") }}
              MDAO
            </div>
          </div>
        </div>
      </div>
      <img class="divider" src="../../assets/stake/stake/divider.png" alt="" />
      <div class="right">
        <div class="top">
          <div class="dia">
            <img
              :src="
                player
                  ? require('../../assets/stake/stake/pre-mdao/active_dia.png')
                  : require('../../assets/stake/stake/pre-mdao/inavtive_dia.png')
              "
              alt=""
            />
          </div>
          <div v-if="Number(player.mdao) > 0">
            当前已质押 {{ fromWei(player.mdao, "ether") }} MDAO
          </div>
          <div v-else class="cur">当前可质押 {{ mdaoToDeposit }} MDAO</div>

          <div class="rule" @click="() => (showRuleModal = true)">规则说明</div>
          <div
            v-if="Number(mdaoToDeposit > 0)"
            class="stk_btn"
            @click="
              () => {
                if (mdaoStkBtnStatus == 0) {
                  approveMdao();
                } else {
                  depositMdao();
                }
              }
            "
          >
            <img src="../../assets/stake/stake/stk_btn_bg.png" alt="" />
            <div class="text">
              <div v-if="mdaoStkBtnStatus == 0">授权</div>
              <div v-else>质押</div>
            </div>
          </div>
        </div>
        <div class="action_zone" v-if="actionType == 0">
          <img
            class="coin"
            src="../../assets/stake/stake/empty_mission.png"
            alt=""
          />
          <p>未选择任务</p>
          <div
            class="btn_wrapper"
            @click="
              () => {
                $router.push({
                  name: 'stk_choose',
                });
              }
            "
          >
            <img
              class="btn_bg"
              src="../../assets/stake/choose/btn_bg.png"
              alt=""
            />
            <div class="text">去出征</div>
          </div>
        </div>
        <div class="action_zone_2" v-else>
          <div class="income">
            <img src="../../assets/stake/stake/empty_mission.png" alt="" />
            <div>
              <p>当前任务奖励</p>
              <p>{{ pendingReward }} MDAO</p>
            </div>
          </div>
          <div style="display: flex; align-items: center">
            <div  class="big_btn" @click="releaseHero" v-if="player.inFarm && canRelease">
              <img src="../../assets/stake/choose/btn_bg.png" alt="" />
              <div class="text">取回卡牌</div>
            </div>
            <div
              class="big_btn"
              @click="() => $router.push({ name: 'stk_go' })"
              v-if="player.inFarm"
            >
              <img src="../../assets/stake/choose/btn_bg.png" alt="" />
              <div class="text">继续质押</div>
            </div>
            <div
              class="big_btn"
              v-if="player.isUnClaim"
              @click="() => obtain(0)"
            >
              <img src="../../assets/stake/choose/btn_bg.png" alt="" />
              <div class="text">{{ player.inFarm ? "提前领取" : "领取" }}</div>
            </div>

            <div
              class="big_btn"
              v-if="player.isUnClaim"
              @click="() => obtain(1)"
            >
              <img src="../../assets/stake/choose/btn_bg.png" alt="" />
              <div class="text">复利领取</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_bar">
      <img class="dia" src="../../assets/stake/diamond.png" alt="" />
      <div class="info">
        <div class="check">
          <img src="../../assets/stake/income/check.png" alt="" />
          <div>查看</div>
        </div>
        <div class="power">
          <div class="total">
            <div class="item">
              <span class="mar">总战力</span>
              <span>{{ Number(player.buffedPower) / 100 || 0 }}</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">原军队战力</span>
              <span>{{ Number(player.realPower) / 100 || 0 }}</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">追加增幅</span>
              <span>{{
                Number(player.buffedPower - player.realPower) / 100 || 0
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mission_zone">
        <div class="ing">
          <img
            :src="require(`../../assets/stake/detail/m_${type}.png`)"
            alt=""
          />
          <div class="text">正在执行 {{ getDiffName }} 任务</div>
        </div>
      </div>

      <div
        v-if="Number(player.mdao) > 0"
        class="bonus_zone"
        @click="jumpToList"
      >
        <div class="ing">
          <img :src="require('../../assets/stake/bonus.png')" alt="" />
          <div class="detail">
            <div class="title">复利进行中</div>
            <div>奖励余额</div>
            <div>??? MDAO</div>
            <div>剩余天数 ??天</div>
          </div>
        </div>
      </div>
      <div class="place_zone">
        <div class="text">浮育城</div>
        <img class="img" src="../../assets/stake/city.png" alt="" />
      </div>
    </div>
    <div class="fire">
      <Lottie
        :options="{
          animationData: require('../../allstar_assets/all_stars/entry/fire.json'),
        }"
      />
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
import StkBtn from "./components/stk_btn.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import { fromWei } from "web3-utils";
import { useRouter } from "vue-router";
import InjectModal from ".././../components/inject_modal";
export default {
  name: "stk_main",
  components: {
    StkBtn,
    InjectModal,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/common/loading.json`),
      };
    });
    const data = reactive({
      type: 0,
      account: "",
      web3: "",
      player: "",
      stakedTime: 0,
      remainTime: 0,
      totalPower: 0,
      totalIncome: 0,
      rewardPerblock: 0,
      mdaoToDeposit: 0,
      mdaoStkBtnStatus: 0,
      pendingReward: 0,
      ticker: undefined,
      showWarningModal: false,
      loading: false,
      showRuleModal: false,
      canRelease:false,
    });
    const actionType = computed(() => {
      if (!data.player.isUnClaim && !data.player.inFarm) return 0; // no staked
      return 1;
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
      await getGlobalPower();
      await getPlayer();
      if (data.player.endTime) {
        getTicker();
      }
      data.loading = false;
    });
    const canRelease = async()=>{
      const c = store.state.c_staking;
      data.canRelease = await c.methods.canRelease().call();
    }
    const refresh = async () => {
      await getGlobalPower();
      await getPlayer();
      await canRelease()
    };
    const obtain = async (type) => {
      if (data.player.inFarm) {
        data.showWarningModal = true;
        return;
      }
      try {
        data.btnDisable = true;
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .decideClaimForm(!!type)
          .estimateGas({ from: data.account });
        const res = await c.methods.decideClaimForm(!!type).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("领取成功", store.state.toast_success);
          await refresh();
        }
      } catch (e) {
        proxy.$toast("领取失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const getTicker = () => {
      if (data.ticker === undefined) {
        clearInterval(data.ticker);
      }
      data.ticker = setInterval(() => {
        getRTime(
          (Number(new Date().getTime()) / 1000).toFixed(0),
          data.player.endTime
        );
      }, 1000);
    };
    const getRTime = (startTime, endTime) => {
      const delta = Number(endTime) - Number(startTime);
      let d = Math.floor(delta / (60 * 60 * 24));
      let h = Math.floor((delta / 60 / 60) % 24);
      let m = Math.floor((delta / 60) % 60);
      if (parseInt(h, 10) < 0) h = "0";
      if (parseInt(m, 10) < 0) m = "0";
      if (parseInt(d, 10) < 0) d = "0";
      data.remainTime = `${d}天${h}时${m}分`;

      if (d == 0 && m == 0 && h == 0) {
        data.remainTime = "任务已完成";
        clearInterval(data.ticker);
      }
    };

    const getPlayer = async () => {
      const c = store.state.c_staking;
      data.player = await c.methods.getUserInfo(data.account).call();
      localStorage.setItem("stake_diff", data.player.difficulty);
      console.log(data.player, "player");
      data.rewardPerblock =
        data.web3.utils.fromWei(
          await c.methods.rewardPerBlock().call(),
          "ether"
        ) || 0;
      const resPending = await c.methods.pending(data.account).call();
      data.pendingReward = Number.parseFloat(
        fromWei(resPending, "ether")
      ).toFixed(2);
      data.mdaoToDeposit =
        fromWei(await c.methods.canDepositMdao(data.account).call(), "ether") ||
        0;
    };
    const approveMdao = async () => {
      try {
        proxy.$toast("等到授权mdao", store.state.toast_info);
        const c = store.state.c_mdao;
        const addr = store.state.c_staking.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(
            addr,
            data.web3.utils.toWei(data.mdaoToDeposit.toString(), "ether")
          )
          .estimateGas({ from: data.account });
        const res = await c.methods
          .approve(
            addr,
            data.web3.utils.toWei(data.mdaoToDeposit.toString(), "ether")
          )
          .send({
            gas: gas,
            gasPrice: gasPrice,
            from: data.account,
          });
        if (res.status) {
          data.mdaoStkBtnStatus = 1;
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("授权失败", store.state.toast_error);
      }
    };
    const jumpToList = () => {
      router.push({
        name: "stk_income",
      });
    };
    const depositMdao = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待mdao 确认", store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .depositMdao()
          .estimateGas({ from: data.account });
        const res = await c.methods.depositMdao().send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("质押成功", store.state.toast_success);
          await refresh();
        }
      } catch (e) {
        proxy.$toast("质押失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const releaseHero = async () => {
      try {
        proxy.$toast("等待取出卡牌", store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .claimHero()
          .estimateGas({ from: data.account });
        const res = await c.methods.claimHero().send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("取回成功", store.state.toast_success);
          await refresh();
        }
      } catch (e) {
        proxy.$toast("取回失败", store.state.toast_error);
      }
    };
    const getGlobalPower = async () => {
      const c = store.state.c_staking;
      data.totalPower = await c.methods.totalPowers().call();
      data.totalIncome = await c.methods.paidOut().call();
    };
    const getDiffName = computed(() => {
      if (data.player) {
        return ["斥候", "扫荡", "驻扎"][data.player.difficulty];
      }
      return "err";
    });
    const refData = toRefs(data);
    return {
      ...refData,
      actionType,
      getDiffName,
      lottie_options,
      jumpToList,
      approveMdao,
      depositMdao,
      releaseHero,
      obtain,
      fromWei,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
  .rule_modal_item {
    max-width: 80%;
    margin: 1rem auto;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fire {
    position: absolute;
    bottom: 0%;
    z-index: 0;
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
    width: 120%;
  }
}
.check_map {
  display: flex;
  align-items: center;
  .text {
    top: 23%;
  }
}
.topbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.right_top {
  display: flex;
  .item {
    position: relative;
    margin-bottom: 1rem;
    width: 20rem;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      .title {
        font-size: 1.3vmin;
      }
      .coin {
        width: 3rem;
        position: absolute;
        right: 0;
        transform: translateX(3rem);
      }
    }
  }
}

.main_body {
  display: flex;
  height: 25rem;
  justify-content: flex-end;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 45%;
    .item {
      display: flex;
      width: 100%;
      height: 6rem;
      .badge {
        height: 100%;
        position: relative;
        margin-right: 4rem;
        .bg {
          height: 100%;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          white-space: nowrap;
        }
      }
      .detail {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .lg {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .sm {
          font-size: 0.85rem;
        }
        .white {
          color: white;
          margin: 0;
        }
      }
    }
  }
  .right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    .top {
      width: 80%;
      padding: 1rem 2rem;
      background: linear-gradient(
        180deg,
        rgba(45, 43, 43, 0.7) 0%,
        rgba(28, 57, 67, 0.7) 67.71%,
        rgba(52, 58, 61, 0.7) 100%
      );
      border-radius: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dia {
        width: 3.5rem;
        img {
          width: 100%;
        }
      }
      .cur {
        font-size: 1.2rem;
      }
      .rule {
        cursor: pointer;
      }
      .stk_btn {
        width: 4rem;
        position: relative;
        cursor: pointer;
        img {
          width: 100%;
        }
        .text {
          font-size: 0.5rem;
          position: absolute;
          top: 44%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .action_zone {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 4rem;
      .coin {
        width: 4rem;
      }
    }
    .action_zone_2 {
      .income {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        margin-bottom: 2rem;
        img {
          width: 4rem;
          margin-right: 1.5rem;
        }
      }
      .big_btn {
        width: 10rem;
        position: relative;
        margin-right: 1rem;
        cursor: pointer;
        img {
          width: 100%;
        }
        .text {
          font-size: 1.2rem;
          position: absolute;
          top: 44%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .divider {
    height: 100%;
    margin: 0 1.5rem;
  }
}
.bottom_bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .dia {
    width: 3.5rem;
  }
  .place_zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      background: url("../../assets/stake/place_text_bg.png") no-repeat;
      background-size: 100% 100%;
      width: 15rem;
      padding: 0.5rem 0;
      font-size: 1.3vmin;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .img {
      width: 10rem;
    }
  }
  .info {
    height: 7rem;
    display: flex;
    align-items: center;
    background: linear-gradient(
      180deg,
      rgba(45, 43, 43, 0.7) 0%,
      rgba(28, 57, 67, 0.7) 67.71%,
      rgba(52, 58, 61, 0.7) 100%
    );
    padding: 1rem 2rem;
    border-radius: 1rem;
    .check {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 2rem;
      img {
        width: 4rem;
        margin-bottom: 1rem;
      }
    }
    .power {
      .total {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
      }
      .common {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        margin-top: 1rem;
      }
      .mar {
        margin-right: 2rem;
      }
      .item {
        margin-right: 2rem;
      }
    }
  }
}
.mission_zone {
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(45, 43, 43, 0.7) 0%,
    rgba(28, 57, 67, 0.7) 67.71%,
    rgba(52, 58, 61, 0.7) 100%
  );
  padding: 1rem 2rem;
  border-radius: 1rem;
  .ing {
    height: 100%;
    border-radius: 20px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      margin-right: 2rem;
    }
  }
  .progress {
    width: 23rem;
  }
}
.bonus_zone {
  height: 7rem;
  display: flex;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(45, 43, 43, 0.7) 0%,
    rgba(28, 57, 67, 0.7) 67.71%,
    rgba(52, 58, 61, 0.7) 100%
  );
  padding: 1rem 2rem;
  border-radius: 1rem;
  cursor: pointer;
  .ing {
    height: 100%;
    border-radius: 20px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      margin-right: 1rem;
    }
    .detail {
      .title {
        font-size: 1.5rem;
      }
    }
  }
}
.btn_wrapper {
  position: relative;
  width: 15rem;
  cursor: pointer;
  .btn_bg {
    width: 100%;
  }
  .text {
    font-size: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>