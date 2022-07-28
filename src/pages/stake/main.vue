<template>
  <div class="box">
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
            <div class="title">全网累计收益</div>
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
            <div class="lg">任务剩余时间 9天18小时30分25秒</div>
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
              当前历史累计收益 2000000MDAO
            </div>
            <div class="lg white">每区块奖励 9999MDAO</div>
          </div>
        </div>
        <div class="item">
          <div class="badge">
            <img class="bg" src="../../assets/stake/stake/badge.png" alt="" />
            <div class="text">额外收益</div>
          </div>
          <div class="detail">
            <div class="lg">1587 MDAO</div>
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
          <div class="cur">当前可质押 300000 MDAO</div>
          <div class="rule">规则说明</div>
          <div class="stk_btn">
            <img src="../../assets/stake/stake/stk_btn_bg.png" alt="" />
            <div class="text">质押</div>
          </div>
        </div>
        <div class="middle"></div>
        <div class="bottom"></div>
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
              <span>200000</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">原军队战力</span>
              <span>{{ 22222 }}</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">追加增幅</span>
              <span>{{ 2222 }}</span>
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

      <div class="bonus_zone">
        <div class="ing">
          <img :src="require('../../assets/stake/bonus.png')" alt="" />
          <div class="detail">
            <div class="title">复利进行中</div>
            <div>奖励余额</div>
            <div>156781239 MDAO</div>
            <div>剩余天数 28天</div>
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
import StkBtn from "./components/stk_btn.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "stk_main",
  components: {
    StkBtn,
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
      totalPower: 0,
      totalIncome: 0,
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
      await getGlobalPower();
      await getPlayer();
    });

    // const getRTime = (startTime, endTime) => {
    //   const delta = Number(endTime) - Number(startTime);
    //   let d = Math.floor(delta / (60 * 60 * 24));
    //   let h = Math.floor((delta / 60 / 60) % 24);
    //   let m = Math.floor((delta / 60) % 60);
    //   if (parseInt(h, 10) < 0) h = "0";
    //   if (parseInt(m, 10) < 0) m = "0";
    //   if (parseInt(d, 10) < 0) d = "0";
    //   return `${d}天${h}时${m}分`;
    // };
    // const getTime = () => {
    //   const now = (Number(new Date().getTime()) / 1000).toFixed(0);
    //   const startStaked = data.player.stakingInfo.stakingStartTime;
    //   const endStaked = data.player.stakingInfo.stakingEndTime;
    //   data.stakedTime = getRTime(startStaked, now);
    //   data.remainTime = getRTime(now, endStaked);
    // };
    const getPlayer = async () => {
      const c = store.state.c_staking;
      data.player = await c.methods.getUserInfo(data.account).call();
      console.log(data.player, "player");
    };
    const getGlobalPower = async () => {
      const c = store.state.c_staking;
      data.totalPower = await c.methods.totalPowers.call();
      data.totalIncome = await c.methods.paidOut.call();
    };
    const getDiffName = computed(() => {
      if (data.player) {
        return ["斥候", "扫荡", "驻扎"][
          data.player.stakingInfo.stakingDifficulty
        ];
      }
      return "err";
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
}
.check_map {
  display: flex;
  align-items: center;
  .text {
    top: 28%;
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
        font-size: 1.3rem;
      }
      .coin {
        width: 3rem;
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
</style>