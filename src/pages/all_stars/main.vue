<template>
  <BfPack @refresh="allInit" @close="allInit" :value="showPack" />
  <MarchEvents
    :type="eventType"
    :value="showEvents"
    :player="player"
    @close="() => (showEvents = false)"
    @refresh="allInit"
  />
  <InjectModal
    :value="showRuleModal"
    :title="'群英会战'"
    @close="() => (showRuleModal = false)"
    @confirm="() => (showRuleModal = false)"
  >
    <div class="modal_text">
      群英会战单个战役将为期7天，玩家一旦质押卡牌本次战役期间禁止更改，7天内到达总战场鹿原参加决战才有资格参与最终分红争夺，战役期间可能会触发随机事件影响玩家行军速率，可购买道具增加速率，行军决策快人一步，
      最终分红规则将参考玩家抵达战场的先后，与玩家战力综合计算。
    </div>
  </InjectModal>

  <Lottie
    v-if="loading"
    :options="{ animationData: require('../../assets/common/loading.json') }"
  />
  <div v-else class="box">
    <img class="map" :src="getMap" alt="" />
    <img
      v-if="player.isBond"
      :style="getPos"
      src="../../allstar_assets/main/pos.png"
      alt=""
    />

    <div class="main">
      <div class="inner">
        <div
          class="top_left"
          :style="[1, 3].includes(Number(curCamp)) ? 'left:90%' : ''"
        >
          <div
            class="city_main"
            @click="() => $router.push({ name: 'bf_base' })"
          >
            <div class="inner">
              <div class="up">
                {{ campText }}
              </div>
              <img
                class="p"
                src="../../allstar_assets/main/city_img.png"
                alt=""
              />
              <div class="txt">主城</div>
            </div>
          </div>
          <div class="rules" @click="() => (showRuleModal = true)">规则</div>
        </div>
        <div class="pack_btn" @click="() => (showPack = true)">
          <div class="text">行军背包</div>
        </div>
        <div class="back_home" @click="() => $router.push({ name: 'home' })">
          返回主页
        </div>
        <div
          class="right-top"
          :style="
            [1, 3].includes(Number(curCamp))
              ? 'right:69%; align-items:flex-start'
              : ''
          "
        >
          <div class="day_step">
            <div>第一日</div>
            <div class="des">风和日丽</div>
            <img src="../../allstar_assets/weather/sunny.png" alt="" />
          </div>
          <div class="power_zone">
            <img src="../../allstar_assets/main/power_zone.png" alt="" />
            <div class="power_inner">
              {{ power > 0 ? "我的战力:" + power : "暂未出征" }}
            </div>
          </div>
          <div
            class="random_events"
            v-for="item in randomEvents"
            :key="item.key"
            @click="() => (showEvents = true)"
          >
            <img src="../../allstar_assets/main/clock.png" alt="" />
            {{ item.name }}
          </div>
        </div>
        <div
          class="fina_pool"
          @click="
            () => {
              $router.push({
                name: 'bf_pool',
              });
            }
          "
        >
          <div class="inner">
            <img src="../../allstar_assets/main/to_final.png" alt="" />
            <div class="text">鹿原奖池</div>
          </div>
        </div>
        <div
          class="pre_time_view"
          @click="showDecision"
          v-if="player.baseSpeed != 0"
        >
          <div v-if="!isBattleIng">
            <span v-if="!arriveNext">距离下一个据点</span>
            <span v-else>即将到达据点</span>
            <span style="color: red; margin: 0 1rem">{{ nextNode.name }}</span>
            <span v-if="!arriveNext">还剩</span>
          </div>
          <div class="time_row" v-if="!arriveNext && !isBattleIng">
            <img src="../../allstar_assets/main/clock.png" alt="" />
            {{ timing }}
          </div>
          <div class="time_row" v-if="arriveNext && !isBattleIng">
            <img src="../../allstar_assets/main/clock.png" alt="" />
            <span style="color: red">请点击此处决策</span>
          </div>
          <div class="timerow" v-if="isBattleIng">
            <img src="../../allstar_assets/main/clock.png" alt="" />
            <span style="color: red">战斗进行中</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
} from "vue";
import initWeb3 from "../../utils/initWeb3";
import BfPack from "./town/bf_pack.vue";
import MarchEvents from "./events/march_events.vue";
import InjectModal from "../../components/inject_modal.vue";
import { positions, map } from "../../utils/useRoutes";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "bf_main",
  components: {
    BfPack,
    MarchEvents,
    InjectModal,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
      account: "",
      web3: "",
      curCamp: 0,
      nextName: "合川",
      loading: false,
      showPack: false,
      showEvents: false,
      showRuleModal: false,
      decisionShow: false,
      randomEvents: [],
      player: "",
      currentNode: undefined,
      power: 0,
      nextNode: {
        id: 0,
        name: "",
      },
      timing: "0时0分0秒",
      ticker: undefined,
      decisions: [],
      arriveNext: false,
      btnDisable: false,
      eventType: undefined,
      times: [],
    });
    const campText = computed(() => {
      return ["魏", "蜀", "吴", "群"][data.curCamp];
    });
    const getDecisionText = (idx) => {
      return ["前进", "投降", "战斗", "进入鹿原"][idx];
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
      await allInit();
      data.loading = false;
    });
    const allInit = async () => {
      data.showPack = false;
      data.showEvents = false;
      clearInterval(data.ticker);
      await getPlayer();
      await getCurrentNode();
      await getPower();
      await getTimes();
      await getNextNode();
      await getDecisions();
    };
    onBeforeUnmount(() => {
      if (data.ticker) {
        clearInterval(data.ticker);
      }
    });
    const getDecisions = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getMarchTactics(data.account).call();
      data.decisions = res;
      data.randomEvents = [];

      const isLock = await c.methods.nodeInfo(data.currentNode).call();

      if (isLock.lock) {
        data.eventType = "lock";
        data.randomEvents.push({
          key: "jdsd",
          name: "据点锁定，打扫战场",
        });
        return;
      }
      // player.state 0前进中 1战斗中 2准备战斗 3抵达鹿原
      switch (res) {
        case [true, false, false, false]:
          if (data.player.state == 0) {
            data.eventType == 0; // 纯前进
          } else {
            data.eventType == 1; // 战斗结束, 只能选择继续前进
            data.randomEvents.push({
              key: "jbzjsqj",
              name: "局部战结束，前进",
            });
          }
          break;
        case [false, true, true, false]:
          data.eventType = 2; // 遭遇埋伏，可选投降
          data.randomEvents.push({
            key: "zymf",
            name: "遭遇埋伏",
          });
          break;
        case [true, false, true, false]:
          if (data.player.state == 0) {
            data.eventType = 3; // 首次抵达, 可选埋伏或蹲点遭遇他人或离开
            data.randomEvents.push({
              key: "kxmf",
              name: "可选埋伏",
            });
          }
          if (data.player.state == 1) {
            data.eventType = 4; // 战斗结束， 选择继续战斗或是离开
            data.randomEvents.push({
              key: "jbzjsjz",
              name: "局部战结束，抉择",
            });
          }
          break;
        case [false, false, false, true]:
          data.eventType = 5; // 进入鹿原
          break;
        case [false, false, true, false]:
          if (data.player.state == 0) {
            data.eventType = 6; // 遭遇战，必须战斗
            data.randomEvents.push({
              key: "zydjzd",
              name: "遭遇敌军",
            });
          }
          break;
        default:
          break;
      }
    };
    const showDecision = () => {
      if (data.arriveNext) {
        data.decisionShow = true;
      }
    };
    const getRTime = (endTime) => {
      // counting time next node
      const now = new Date().getTime();
      const delta = Number(endTime) - (Number(now) / 1000).toFixed(0);
      let h = Math.floor((delta / 60 / 60) % 24);
      let m = Math.floor((delta / 60) % 60);
      let s = Math.floor(delta % 60);
      if (parseInt(h, 10) < 0) h = "0";
      if (parseInt(m, 10) < 0) m = "0";
      if (parseInt(s, 10) < 0) s = "0";
      data.timing = `${h}时${m}分${s}秒`;
    };
    const getNextNode = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getNextNode(data.account).call();
      data.nextNode = {
        id: res,
        name: map[res],
      };
    };
    const getTimes = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getTimes(data.account).call();
      data.times = res;
      const now = new Date().getTime();
      const delta = Number(res[1]) - (Number(now) / 1000).toFixed(0);
      if (delta < 0) {
        data.arriveNext = true;
        return;
      }
      data.ticker = setInterval(() => {
        getRTime(res[1]);
      }, 1000);
    };
    const getPower = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getCardsAndPower(data.account).call();
      console.log(res, "cards");

      data.power = Number(res[2] / 100).toFixed(0);
    };
    const getPlayer = async () => {
      const c = store.state.c_battle;
      const player = await c.methods.players(data.account).call();
      if (!player.isBond) {
        proxy.$toast("请先选择阵营", store.state.toast_error);
        router.push({
          name: "bf_choose",
        });
      }
      console.log(player, "player");
      data.player = player;
      data.curCamp = player.camp;
    };
    const getCurrentNode = async () => {
      const c = store.state.c_battle;
      data.currentNode = await c.methods.getCurrentNode(data.account).call();
    };
    const isBattleIng = computed(() => {
      const last = data.times[3];
      const now = new Date().getTime();
      if (last * 1000 > now) {
        return true;
      } else {
        return false;
      }
    });
    const march = async (idx) => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待决策确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .march(idx)
          .estimateGas({ from: data.account });
        const res = await c.methods.march(idx).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
          data.decisionShow = false;
          await allInit();
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const getMap = computed(() => {
      return [
        require("../../allstar_assets/main/map_0.png"),
        require("../../allstar_assets/main/map_1.png"),
        require("../../allstar_assets/main/map_2.png"),
        require("../../allstar_assets/main/map_3.png"),
      ][data.curCamp];
    });
    const getPos = computed(() => {
      const cur = positions[data.curCamp][data.player.road][data.currentNode];
      return `position:absolute;height:8rem;top:${cur[0]}%;left:${cur[1]}%`;
    });
    const refData = toRefs(data);
    return {
      ...refData,
      campText,
      getMap,
      getPos,
      isBattleIng,
      getDecisionText,
      showDecision,
      march,
      allInit,
    };
  },
};
</script>
<style lang='less' scoped>
.decision_conent {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: auto;
  .item {
    width: 35%;
    padding: 1rem 0;
    font-size: 1.5rem;
  }
}
.modal_text {
  font-size: 1.5rem;
  line-height: 1.5;
  width: 70%;
  margin: auto;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
  .main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    .inner {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
.fina_pool {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  bottom: 20%;
  right: 1%;
  width: 6rem;
  .inner {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.top_left {
  position: absolute;
  left: 1%;
  top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .city_main {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 9rem;
    height: 18rem;
    background: url("../../allstar_assets/main/main_camp.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 2rem;
    .inner {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .up {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 3.5rem;
      }
      .p {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translateX(-50%);
        width: 4rem;
      }
      .txt {
        white-space: nowrap;
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 3rem;
      }
    }
  }
  .rules {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 100%;
    font-size: 1.2rem;
    padding: 0.5rem 0;
    background: rgba(44, 3, 3, 0.6);
    border-radius: 16px;
  }
}

.back_home {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 1%;
  bottom: 1%;
  width: 20rem;
  padding: 0.5rem 0;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 1.5rem;
}
.pack_btn {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 2%;
  bottom: 15%;
  width: 7rem;
  height: 7rem;
  background: url("../../allstar_assets/main/pack_bg.png") no-repeat;
  background-size: 100% 100%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    white-space: nowrap;
  }
}
.right-top {
  position: absolute;
  top: 1%;
  right: 1%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .day_step {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    background: rgba(44, 3, 3, 0.6);
    border: 2px solid #edf129;
    border-radius: 20px;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    min-width: 25rem;
    .des {
      margin: 0 2rem;
    }
    img {
      width: 3rem;
    }
  }
  .power_zone {
    position: relative;
    cursor: pointer;
    width: 30rem;
    &:hover {
      opacity: 0.8;
    }
    font-size: 1.5rem;
    img {
      width: 100%;
    }
    .power_inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .random_events {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 15rem;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(63, 42, 18, 0.8);
    border-radius: 4px;
    margin-bottom: 2rem;
    img {
      width: 2.5rem;
      margin-right: 1rem;
    }
  }
}

.pre_time_view {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  right: 1%;
  bottom: 1%;
  min-width: 20rem;
  padding: 0.5rem 1rem;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 1.5rem;
  text-align: center;

  .time_row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.5rem;
    margin-top: 1rem;
    img {
      margin: 0 1rem;
      width: 2.5rem;
    }
  }
}
</style>