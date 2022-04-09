<template>
  <BattleRecod
    :value="showBattleRecord"
    @close="() => (showBattleRecord = false)"
    :player="account"
  />
  <BfPack
    :disable="isBattleIng"
    @refresh="allInit"
    @close="allInit"
    :value="showPack"
    :timing="rideTimging"
  />
  <MarchEvents
    :type="eventType"
    :value="showMarchEvents"
    :endTime="times[3]"
    :player="player"
    :placeText="nodePlaceName"
    @close="() => (showMarchEvents = false)"
    @refresh="allInit"
  />
  <RandomEvents
    :value="showRandomEvents"
    :text="curEventsText"
    @close="() => (showRandomEvents = false)"
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

  <div class="box">
    <img class="map" :src="getMap" alt="" />
    <img
    :class="getPosDirection"
      v-if="player.isBond"
      :style="curPosition"
      src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pos.gif"
      alt=""
    />

    <div class="main">
      <div class="inner">
        <div
          class="top_left"
          :style="[1, 3].includes(Number(curCamp)) ? 'left:92%' : ''"
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
                src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/city_img.png"
                alt=""
              />
              <div class="txt">主城</div>
            </div>
          </div>
          <div class="rules" @click="() => (showRuleModal = true)">规则</div>
          <div class="rules" @click="() => (showBattleRecord = true)">
            战斗日志
          </div>
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
              ? 'right:74%; align-items:flex-start'
              : ''
          "
        >
          <div class="day_step">
            <div class="des">第{{ dayNum }}日</div>
            <div
              v-if="additionEvents[0] == 0 && additionEvents[2] != 0"
              style="display: flex; align-items: center"
            >
              <div class="des">风和日丽, 快马加鞭</div>
            </div>
            <div
              v-if="additionEvents[0] == 1 && additionEvents[2] != 0"
              style="display: flex; align-items: center"
            >
              <div class="des">狂风暴雨, 行军受阻</div>
            </div>
            <div
              v-if="player.baseSpeed != 0 && additionEvents[2] == 0"
              class="des"
            >
              和风煦日，无事发生
            </div>
            <div v-if="player.baseSpeed == 0" class="des">暂未出征</div>
          </div>
          <div
            class="power_zone"
            @click="
              () => {
                $router.push({
                  name: 'bf_stake',
                });
              }
            "
          >
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/power_zone.png"
              alt=""
            />
            <div class="power_inner">
              {{ power > 0 ? "我的战力:" + power : "暂未出征" }}
            </div>
          </div>
          <div v-if="player.baseSpeed != 0" class="random_events">
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/speed.png"
              alt=""
            />
            当前速度 {{ curSpeed }}
          </div>
          <div
            class="random_events"
            v-for="item in randomEvents"
            :key="item.key"
            @click="() => clickEventBar(item)"
          >
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/clock.png"
              alt=""
            />
            {{ item.name }}
          </div>
        </div>
        <div class="right_bottom">
          <div class="refresh_field" @click="allInit">
            <div class="inner">
              <img
                src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/to_final.png"
                alt=""
              />
              <div class="text">刷新战场</div>
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
              <img
                src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/to_final.png"
                alt=""
              />
              <div class="text">鹿原奖池</div>
            </div>
          </div>
        </div>

        <div class="forage_zone">
          <img src="../../assets/store/item/type_0_0.png" alt="" />
          当前随军粮草 {{ player.nowForages }}
        </div>
        <div class="pre_time_view" v-if="times[4] != 0">您已抵达战场</div>

        <div
          class="pre_time_view"
          @click="showDecision"
          v-if="player.baseSpeed != 0 && times[4] == 0"
        >
          <div v-if="!isBattleIng">
            <span v-if="!arriveNext">距离下一个据点</span>
            <span v-else>当前据点</span>
            <span v-if="!arriveNext" style="color: red; margin: 0 1rem">{{
              nodePlaceName
            }}</span>
            <span v-else style="color: red; margin: 0 1rem">{{
              nodePlaceName
            }}</span>
            <span v-if="!arriveNext">还剩</span>
          </div>
          <div v-else>
            <span>据点 {{ nodePlaceName }}</span>
          </div>

          <div class="time_row" v-if="!arriveNext && !isBattleIng">
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/clock.png"
              alt=""
            />
            {{ timing }}
          </div>
          <div class="time_row" v-if="arriveNext && !isBattleIng">
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/clock.png"
              alt=""
            />
            <span style="color: red">请点击此处决策</span>
          </div>
          <div class="time_row" v-if="isBattleIng">
            <img
              src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/clock.png"
              alt=""
            />
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
import { eventsTextMap } from "../../utils/useRandomEvents";
import RandomEvents from "./events/random_events.vue";
import BattleRecod from "./town/battle_record.vue";
export default {
  name: "bf_main",
  components: {
    BfPack,
    MarchEvents,
    InjectModal,
    RandomEvents,
    BattleRecod,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
      account: "",
      web3: "",
      curCamp: 0,
      nextName: "",
      showPack: false,
      showMarchEvents: false,
      showRuleModal: false,
      randomEvents: [],
      player: "",
      currentNode: {
        id: 0,
        name: "",
      },
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
      eventType: null,
      times: [],
      dayNum: 1,
      additionEvents: [],
      curEventsText: "",
      showRandomEvents: false,
      showBattleRecord: false,
      curNodeInfo: "",
      nextNodeInfo: "",
      curPosition: `position:absolute;height:6rem;top:0%;left:0%`,
      forage: [0, 0],
      rideTimging: null,
    });
    const curSpeed = computed(() => {
      const now = new Date().getTime();
      if (Number(data.times[2]) * 1000 > Number(now)) {
        return (
          Number(data.player.baseSpeed) + Number(data.player.additionSpeed)
        );
      }
      return data.player.baseSpeed;
    });
    const getPosDirection = computed(()=>{
      if(data.curCamp){
        if([0,2].includes(Number(data.curCamp))){
          return ''
        }
        if([1,3].includes(Number(data.curCamp))){
          return 'reversePos'
        }
      }
      return ''
    })
    const campText = computed(() => {
      return ["魏", "蜀", "吴", "群"][data.curCamp];
    });
    const getDecisionText = (idx) => {
      return ["前进", "投降", "战斗", "进入鹿原"][idx];
    };
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
          // data.account = "0xAAd1f995F6994BEf38Cadc711f533F9629e4839c"; // TEST
        },
        (p) => {
          data.web3 = p;
        }
      );
      await allInit();
    });
    const nodePlaceName = computed(() => {
      if (!data.arriveNext) return data.nextNode.name;
      if (data.player.state != 0) return data.currentNode.name;
      return data.nextNode.name;
    });
    const allInit = async () => {
      (data.arriveNext = false), (data.showPack = false);
      data.showMarchEvents = false;
      data.randomEvents = [];
      await getPlayer();
      await getNode();
      await getPower();
      await getTimes();
      await getRandomEvents();
      if (data.times[4] != 0) {
        return;
      }
      await getStartTime();
      await getDecisions();
      console.log(
        "raw decisions",
        data.decisions,
        "player",
        data.player,
        "type",
        data.eventType,
        "times",
        data.times,
        "currentNode",
        data.curNodeInfo,
        "nextNode",
        data.nextNodeInfo
      );
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
      const nodeInfo = await c.methods.nodeInfo(data.currentNode.id).call();
      data.curNodeInfo = nodeInfo;
      data.nextNodeInfo = await c.methods.nodeInfo(data.nextNode.id).call();
      const isLock = await c.methods
        .isLock(data.currentNode.id, data.account)
        .call();
      const canUnlock =
        Number(new Date().getTime()) >=
        Number(nodeInfo.nowConflictEndTime) * 1000;
      if (isLock && canUnlock && data.player.state == 1) {
        data.eventType = "lock";
        data.randomEvents.push({
          key: "jdsd",
          name: "据点锁定，打扫战场",
          type: 1,
        });
        return;
      }

      if (isLock && !canUnlock && data.player.state == 1) {
        data.eventType = "ing";
        data.randomEvents.push({
          key: "szz",
          name: "死战中",
          type: 1,
        });
      }

      // player.state 0前进中 1战斗中 2准备战斗 3抵达鹿原

      if (res[0] && !res[1] && !res[2] && !res[3]) {
        if (data.player.state == 0) {
          data.eventType = 0; // 纯前进
        } else {
          data.eventType = 2; // 战斗结束, 只能选择继续前进
          data.randomEvents.push({
            key: "jbzjsqj",
            name: "集结中",
            type: 1,
          });
        }
        return;
      }
      if (!res[0] && res[1] && res[2] && !res[3]) {
        data.eventType = 2; // 遭遇埋伏，可选投降
        data.randomEvents.push({
          key: "zymf",
          name: "遭遇埋伏",
          type: 1,
        });
        return;
      }
      if (res[0] && !res[1] && res[2] && !res[3]) {
        if (nodeInfo.lock) {
          data.eventType = "wait";
          data.randomEvents.push({
            key: "ddjs",
            name: "等待解锁",
            type: 1,
          });
          return;
        }
        if (data.player.state == 0) {
          data.eventType = 3; // 首次抵达, 可选埋伏或蹲点遭遇他人或离开
          data.randomEvents.push({
            key: "kxmf",
            name: "可选埋伏",
            type: 1,
          });
        }
        if (data.player.state == 1) {
          data.eventType = 4; // 战斗结束， 选择继续战斗或是离开
          data.randomEvents.push({
            key: "jbzjsjz",
            name: "局部战结束，抉择",
            type: 1,
          });
        }
        return;
      }
      if (res[3]) {
        data.eventType = 5; // 进入鹿原
        return;
      }
      if (!res[0] && !res[1] && res[2] && !res[3]) {
        if (data.player.state == 0) {
          data.eventType = 6; // 遭遇战，必须战斗
          data.randomEvents.push({
            key: "zydjzd",
            name: "遭遇敌军",
            type: 1,
          });
        }
        return;
      }
    };
    const getRandomEvents = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getEvent(data.account).call();
      console.log(res, "rdm events");
      data.additionEvents = res;
      if (res[2] != 0) {
        data.curEventsText = eventsTextMap[res[0]][res[1]];
        data.randomEvents.push({
          key: "rdmevts",
          name: "触发随机事件!",
          type: 0,
        });
      }
    };
    const clickEventBar = (item) => {
      if (item.type == 0) {
        data.showRandomEvents = true;
      } else if (item.type == 1) {
        data.showMarchEvents = true;
      }
    };
    const showDecision = () => {
      if (data.arriveNext) {
        // console.log(data.eventType, data.player, "ggg");
        data.showMarchEvents = true;
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
      return `${h}时${m}分${s}秒`;
    };

    const getTimes = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getTimes(data.account).call();
      data.times = res;
      const now = new Date().getTime();
      const delta = Number(res[1]) * 1000 - Number(now);
      getPos(now, res[1] * 1000);
      if (data.ticker) {
        clearInterval(data.ticker);
      }
      if (delta <= 0) {
        data.arriveNext = true;
        if (data.ticker) {
          clearInterval(data.ticker);
          await allInit();
        }
        return;
      }
      data.ticker = setInterval(() => {
        data.timing = getRTime(res[1]);
        if (Number(res[2]) * 1000 - Number(now) > 0) {
          data.rideTimging = getRTime(res[2]);
        }
      }, 1000);
    };
    const getStartTime = async () => {
      const c = store.state.c_battle;
      const start_time = await c.methods.battleStartTime().call();
      const now = new Date().getTime();
      data.dayNum =
        Math.ceil((Number(now) - start_time * 1000) / (24 * 60 * 60 * 1000)) ||
        1;
    };
    const getPower = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getCardsAndPower(data.account).call();
      data.power = Number(res[2] / 100);
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
      data.player = player;
      data.curCamp = player.camp;
    };
    const getNode = async () => {
      const c = store.state.c_battle;
      const res0 = await c.methods.getNode(data.account, 0).call();
      data.currentNode = {
        id: res0,
        name: map[res0],
      };
      const res1 = await c.methods.getNode(data.account, 1).call();
      data.nextNode = {
        id: res1,
        name: map[res1],
      };
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
          data.showMarchEvents = false;
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
        "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/map_0.png",
        "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/map_1.png",
        "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/map_2.png",
        "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/map_3.png",
      ][data.curCamp];
    });
    const getPos = (now, arriveTime) => {
      const cur =
        positions[data.curCamp][data.player.road][data.currentNode.id];
      const next = positions[data.curCamp][data.player.road][data.nextNode.id];
      const final = positions[data.curCamp][data.player.road][24];
      if (data.times[4] != 0)
        return (data.curPosition = `position:absolute;height:6rem;top:${final[0]}%;left:${final[1]}%`);
      if (!cur || !next) {
        return;
      }
      if (!arriveTime || data.player.state != 0) {
        data.curPosition = `position:absolute;height:6rem;top:${cur[0]}%;left:${cur[1]}%`;
        return;
      }
      if (now >= arriveTime && data.player.state == 0) {
        data.curPosition = `position:absolute;height:6rem;top:${next[0]}%;left:${next[1]}%`;
      } else {
        const deltaX = (cur[0] + next[0]) / 2;
        const deltaY = (cur[1] + next[1]) / 2;
        data.curPosition = `position:absolute;height:6rem;top:${deltaX}%;left:${deltaY}%`;
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      campText,
      getMap,
      isBattleIng,
      curSpeed,
      nodePlaceName,
      getPosDirection,
      getDecisionText,
      showDecision,
      march,
      allInit,
      clickEventBar,
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
  .reversePos{
    transform: rotateY(180deg);
  }
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
.right_bottom {
  position: absolute;
  bottom: 10%;
  right: 1%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  .fina_pool {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 5.5rem;
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
  .refresh_field {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 5.5rem;
    margin-bottom: 1rem;
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
}

.forage_zone {
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 8px;
  padding: 0 1rem;
  img {
    height: 2.5rem;
    margin-right: 2rem;
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
    width: 7rem;
    height: 15rem;
    background: url("http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/main_camp.png")
      no-repeat;
    background-size: 100% 100%;
    margin-bottom: 1.5rem;
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
        font-size: 3rem;
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
        font-size: 2rem;
      }
    }
  }
  .rules {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 100%;
    font-size: 1;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
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
  width: 15rem;
  padding: 0.5rem 0;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 1rem;
}
.pack_btn {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 2%;
  bottom: 15%;
  width: 5rem;
  height: 5rem;
  background: url("http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack_bg.png")
    no-repeat;
  background-size: 100% 100%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    white-space: nowrap;
  }
}
.right-top {
  position: absolute;
  top: 2%;
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
    border: 1px solid #edf129;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .des {
      margin: 0.5rem 2rem;
    }
    img {
      width: 3rem;
    }
  }
  .power_zone {
    position: relative;
    cursor: pointer;
    width: 25rem;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 100%;
    }
    .power_inner {
      position: absolute;
      top: 50%;
      left: 55%;
      transform: translate(-50%, -50%);
    }
  }
  .random_events {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 15rem;
    padding: 0.3rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(63, 42, 18, 0.8);
    border-radius: 4px;
    margin-bottom: 1rem;
    img {
      height: 2rem;
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
  font-size: 1.2rem;
  text-align: center;

  .time_row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 1.2rem;
    margin-top: 1rem;
    img {
      margin: 0 1rem;
      height: 2rem;
    }
  }
}
</style>