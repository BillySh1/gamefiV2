<template>
  <div class="box">
    <StkBtn
      class="back"
      :text="'返回'"
      @click="
        () =>
          $router.push({
            name: 'stk_main',
          })
      "
    />
    <div class="main">
      <div class="main_top">
        <div class="cur_mission">
          <img :src="curDiffInfo.img" alt="" />
          <div class="intro">执行{{ curDiffInfo.name }}任务</div>
        </div>
        <div class="income">收益 {{ curDiffInfo.apy }} 战力天/MMC</div>
      </div>
      <div class="main_info">
        <div class="item">
          任务剩余时间 <span style="font-size: 2rem">{{ remainTime }}</span>
        </div>
        <div class="white">
          当前已累计收益
          <span style="font-size: 1.5rem">{{ player.totalReward }} MMC</span>
        </div>
        <!-- <div class="white">
          继续探索将享受战力加成
          <span style="font-size: 1.5rem">
            {{ 10 * Number(player.stakingInfo.power) }}
          </span>
        </div> -->
      </div>
      <div class="main_action">
        <div class="left">
          <div class="income_info">
            <img src="../../assets/stake/coin.png" alt="" />
            <div>
              <div class="item">当前可领取</div>
              <div class="item">{{ player.canClaimReward }} MMC</div>
            </div>
          </div>
          <div>累计收益自动招募雇佣兵提升战力</div>
        </div>
        <div class="btn">召回部队</div>
      </div>
    </div>
    <div class="bottom_bar">
      <div class="progress">
        <Progress :value="100 * Number(player.percent)" />
      </div>
      <div class="info">
        <div class="check">
          <img src="../../assets/stake/income/check.png" alt="" />
          <div>查看</div>
        </div>
        <div class="power">
          <div class="total">
            <div class="item">
              <span class="mar">总战力</span>
              <span>{{ Number(player.stakingInfo.power) / 100 }}</span>
            </div>
            <div>
              <span class="mar">累计时间</span>
              <span>{{ stakedTime }}</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">原部队战力</span>
              <span>{{
                Number(player.stakingInfo.power) / 100 - additionPower
              }}</span>
            </div>
            <div>
              <span class="mar">累计收益增长</span>
              <span>{{ stakedTime }}</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">雇佣兵战力</span>
              <span>{{ additionPower }}</span>
            </div>
            <div>
              <span class="mar">累计收益增长</span>
              <span>{{ stakedTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="place_zone">
        <div class="text">浮育城</div>
        <img class="img" src="../../assets/stake/city.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import StkBtn from "./components/stk_btn";
import Progress from "./components/progress.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "income",
  components: {
    StkBtn,
    Progress,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      stakedTime: 0,
      remainTime: 0,
      player: "",
      map: [
        {
          name: "斥候",
          apy: 1000,
          img: require("../../assets/stake/detail/m_0.png"),
        },
        {
          name: "扫荡",
          apy: 900,
          img: require("../../assets/stake/detail/m_1.png"),
        },
        {
          name: "驻扎",
          apy: 800,
          img: require("../../assets/stake/detail/m_2.png"),
        },
      ],
    });
    const curDiffInfo = computed(() => {
      if (data.player) {
        return data.map[data.player.stakingInfo.stakingDifficulty];
      }
      return {
        name: "err",
        apy: "err",
        img: require("../../assets/stake/detail/m_2.png"),
      };
    });
    const additionPower = computed(() => {
      return Number(data.player.canClaimReward || 0) * 10;
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
      await getPlayer();
    });
    const getRTime = (startTime, endTime) => {
      const delta = Number(endTime) - Number(startTime);
      let d = Math.floor(delta / (60 * 60 * 24));
      let h = Math.floor((delta / 60 / 60) % 24);
      let m = Math.floor((delta / 60) % 60);
      if (parseInt(h, 10) < 0) h = "0";
      if (parseInt(m, 10) < 0) m = "0";
      if (parseInt(d, 10) < 0) d = "0";
      return `${d}天${h}时${m}分`;
    };
    const getTime = () => {
      const now = (Number(new Date().getTime()) / 1000).toFixed(0);
      const startStaked = data.player.stakingInfo.stakingStartTime;
      const endStaked = data.player.stakingInfo.stakingEndTime;
      data.stakedTime = getRTime(startStaked, now);
      data.remainTime = getRTime(now, endStaked);
    };
    const getPlayer = async () => {
      const c = store.state.c_staking;
      const res = await c.methods.players(data.account).call();
      data.player = res;
      console.log(data.player, "ggg");
      getTime();
    };
    const refData = toRefs(data);
    return {
      curDiffInfo,
      additionPower,
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/income/income_bg.png") no-repeat;
  background-size: 100% 100%;
}
.back {
  position: absolute;
  left: 4em;
  top: 2rem;
}
.bottom_bar {
  position: absolute;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .place_zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    .text {
      background: url("../../assets/stake/place_text_bg.png") no-repeat;
      background-size: 100% 100%;
      width: 15rem;
      padding: 0.5rem 0;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }
    .img {
      width: 10rem;
    }
  }
  .progress {
    width: 20rem;
    margin-left: 4rem;
  }
  .info {
    display: flex;
    align-items: center;
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
.main {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .main_top {
    display: flex;
    align-items: center;
    .cur_mission {
      display: flex;
      align-items: center;
      padding: 0.5rem 2rem;
      background: linear-gradient(
        180deg,
        rgba(45, 43, 43, 0.7) 0%,
        rgba(28, 57, 67, 0.7) 67.71%,
        rgba(52, 58, 61, 0.7) 100%
      );
      border-radius: 1rem;
      img {
        width: 3rem;
        margin-right: 1rem;
      }
      .intro {
        font-size: 1.3rem;
      }
    }
    .income {
      margin-left: 2rem;
      color: white;
    }
  }
  .main_info {
    margin-top: 1.5rem;
    span {
      margin-left: 2rem;
    }
    .item {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
    }
    .white {
      margin-top: 1rem;
      text-align: left;
      color: white;
      font-size: 1.5rem;
    }
  }
  .main_action {
    display: flex;
    align-items: center;
    margin-top: 4rem;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      .income_info {
        display: flex;
        align-items: center;
        img {
          width: 5rem;
          margin-right: 3rem;
        }
        .item {
          margin-bottom: 2rem;
          font-size: 2rem;
        }
      }
    }
    .btn {
      cursor: pointer;
      padding: 0.7rem 2rem;
      box-sizing: border-box;
      background: url("../../assets/stake/stake/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 4rem;
      font-size: 2rem;
      margin-left: 8rem;
    }
  }
}
</style>