<template>
  <div class="box">
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
          <div class="title">累计收益</div>
          <div style="font-size: 1.2rem; margin: 0 1.5rem">
            {{ player.totalReward }}
          </div>
          <img class="coin" src="../../assets/stake/coin.png" alt="" />
        </div>
      </div>
      <div class="item">
        <img src="../../assets/stake/main_item.png" alt="" />
        <div class="inner">
          <div class="title">累计时间</div>
          <div class="str">{{ stakedTime }}</div>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/stake/main_item.png" alt="" />
        <div class="inner">
          <div class="title">剩余时间</div>
          <div class="str">{{ remainTime }}</div>
        </div>
      </div>
    </div>
    <div class="left_bottom">
      <div class="btn_item" @click="() => $router.push({ name: 'stk_go' })">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="btn">查看部队</div>
      </div>
      <div class="btn_item" @click="() => $router.push({ name: 'stk_income' })">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="btn">查看收益</div>
      </div>
    </div>
    <div class="place_zone">
      <div class="text">浮育城</div>
      <img class="img" src="../../assets/stake/city.png" alt="" />
    </div>
    <div class="middle_bottom">
      <div class="ing">
        <img :src="require(`../../assets/stake/detail/m_${type}.png`)" alt="" />
        <div class="text">正在执行 {{ getDiffName }} 任务</div>
      </div>
      <div class="progress">
        <Progress :value="100 * Number(player.percent)" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import StkBtn from "./components/stk_btn.vue";
import Progress from "./components/progress.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "stk_main",
  components: {
    StkBtn,
    Progress,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      type: 0,
      account: "",
      web3: "",
      player: "",
      stakedTime: 0,
      remainTime: 0,
      ticker: "",
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
      getTime();
      console.log(data.player, "ggg");
    };
    const getDiffName = computed(() => {
      return ["斥候", "扫荡", "驻扎"][
        data.player.stakingInfo.stakingDifficulty
      ];
    });
    const refData = toRefs(data);
    return {
      ...refData,
      getDiffName,
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
}
.check_map {
  position: absolute;
  top: 3%;
  left: 3%;
}
.right_top {
  position: absolute;
  top: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
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
        font-size: 1.3rem;
      }
      .coin {
        width: 3rem;
      }
      .str {
        font-size: 1.5rem;
        font-weight: bold;
        margin-left: 2rem;
      }
    }
  }
}
.left_bottom {
  position: absolute;
  bottom: 3%;
  left: 3%;
  display: flex;
  flex-direction: column;
  .btn_item {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    .dia {
      width: 2.5rem;
      margin-right: 2rem;
    }
    .btn {
      padding: 0 1rem;
      font-size: 1.5rem;
      height: 3rem;
      background: url("../../assets/stake/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 3rem;
    }
  }
}
.place_zone {
  position: absolute;
  bottom: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
.middle_bottom {
  position: absolute;
  left: 50%;
  bottom: calc(3% + 2rem);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .ing {
    background: linear-gradient(
      180deg,
      rgba(45, 43, 43, 0.7) 0%,
      rgba(28, 57, 67, 0.7) 67.71%,
      rgba(52, 58, 61, 0.7) 100%
    );
    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      margin-right: 2rem;
    }
    margin-bottom: 2rem;
  }
  .progress {
    width: 23rem;
  }
}
</style>