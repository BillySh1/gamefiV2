<template>
<div v-if="showPack"  class="pack_mask">
   <InjectPackHero
    :value="showPack"
    :toSelect="true"
    :selected="
      selected.reduce((arr, cur) => {
        arr.push(cur.tokenId);
        return arr;
      }, [])
    "
    :camp="camp"
    :hideName="true"
    @select="(x) => handleSelectHero(x)"
    @back="
      () => {
        showPack = false;
      }
    "
  />
</div>
 
  <div class="box">
    <div class="top">
      <StkBtn :text="'返回'" @click="() => $router.go(-1)" />
      <div class="power">当前战力 {{ totalPowers }}</div>
    </div>
    <div class="stake_zone">
      <div
        class="item"
        v-for="(item, index) in selectedShow"
        :key="index"
        @click="() => handleClickStake(index)"
      >
        <StakeItem :info="item" />
      </div>
      <!-- <div class="item">
        <StakeItem :info="{}" />
      </div> -->
    </div>
    <div class="action">
      <div class="page">
        <div
          :class="curPage > 1 ? 'btn' : 'btn disable'"
          @click="() => curPage--"
        >
          上一页
        </div>
        <div
          :class="curPage < pageNum ? 'btn' : 'btn disable'"
          @click="() => curPage++"
        >
          下一页
        </div>
      </div>
      <div class="pagnation">
        <div
          class="page_item"
          v-for="(item, idx) in pageNum"
          :key="item"
          @click="() => (curPage = idx + 1)"
        >
          {{ item }}
        </div>
      </div>
      <div class="check_rule">
        <img src="../../assets/stake/stake/rule_bg.png" alt="" />
        <div class="text">查看规则</div>
      </div>
    </div>
    <div class="bottom_info">
      <div class="left" @click="onConfirm">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div :class="btnDisable ? 'btn disable' : 'btn'">{{ btnText }}</div>
      </div>
      <div class="right">
        <div class="cur_mission right_item">
          <img :src="curDiff.img" alt="" />
          <div class="intro">
            <div>执行 {{ curDiff.name }} 任务</div>
            <div style="margin: 1rem 0">为期 {{ curDiff.time }} 天</div>
            <div>收益 {{ curDiff.speed }} 战力天/MMC</div>
          </div>
        </div>
        <div class="info right_item">
          <div class="top_info">
            <div class="">
              当前出战总人数
              {{
                selected.reduce((res, x) => {
                  if (x && x.tokenId) {
                    res++;
                  }
                  return res;
                }, 0)
              }}
            </div>
          </div>
          <div class="middle_info">
            <div class="com_item" style="color: white">触发羁绊</div>
            <div class="com_item">{{ combineName }}</div>
          </div>
          <div class="bottom_info">
            仅可触发一种羁绊，羁绊所加战力各不相同，征集多国武将，触发强大的羁绊将会使征战效率大幅提升
          </div>
        </div>
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import StkBtn from "./components/stk_btn.vue";
import StakeItem from "./components/stake_item.vue";
import InjectPackHero from "../../components/inejct_pack_hero.vue";
import initWeb3 from "../../utils/initWeb3";
import { combineMap } from "../../utils/useCombine";
export default {
  name: "stake_go",
  components: {
    StkBtn,
    StakeItem,
    InjectPackHero,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      selected: [{}, {}, {}, {}, {}],
      curIdx: 0,
      curPage: 1,
      showPack: false,
      btnStatus: 0,
      account: "",
      web3: "",
      diffculty: 0,
      combineInfo: "",
      btnDisable: false,
    });
    const btnText = computed(() => {
      return ["授权", "出征"][data.btnStatus];
    });
    const selectedShow = computed(() => {
      return data.selected.slice(data.curPage * 5 - 5, data.curPage * 5);
    });
    const combineName = computed(() => {
      if (!data.combineInfo || !data.combineInfo.combine)
        return "暂未触发组合羁绊";
      return (
        combineMap[data.combineInfo.combineCamp][data.combineInfo.combineId] ||
        "暂未触发组合羁绊"
      );
    });
    const pageNum = computed(() => {
      const res = [];
      const maxPageNum = Math.ceil(
        data.selected.length / selectedShow.value.length
      );
      for (let i = 0; i < maxPageNum; i++) {
        res.push(i + 1);
      }
      return res;
    });
    const onConfirm = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await stake();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast("t('common_wait_approve')", store.state.toast_info);
        data.btnDisable = true;
        const c = store.state.c_hero;
        const addr = store.state.c_staking.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .setApprovalForAll(addr, true)
          .estimateGas({ from: data.account });
        const res = await c.methods.setApprovalForAll(addr, true).send({
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
    const stake = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast('wait', store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const selectedTokenId = data.selected.reduce((res, x) => {
          if (x && x.tokenId) {
            res.push(x.tokenId);
          }
          return res;
        }, []);
        console.log(
          "params",
          selectedTokenId,
          data.combineInfo.combine,
          data.combineInfo.combineCamp,
          data.combineInfo.combineId,
          data.diffculty
        );
        const gas = await c.methods
          .staking(
            selectedTokenId,
            data.combineInfo.combine,
            data.combineInfo.combineCamp,
            data.combineInfo.combineId,
            data.diffculty
          )
          .estimateGas({ from: data.account });
        const res = await c.methods
          .staking(
            selectedTokenId,
            data.combineInfo.combine,
            data.combineInfo.combineCamp,
            data.combineInfo.combineId,
            data.diffculty
          )
          .send({
            gasPrice: gasPrice,
            gas: gas,
            from: data.account,
          });
        if (res.status) {
          proxy.$toast("出征成功", store.state.toast_success);
          router.push({
            name: "stk_main",
          });
        }
      } catch (e) {
        proxy.$toast("出征失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    const handleClickStake = (index) => {
      data.curIdx = index;
      data.showPack = true;
    };
    const handleSelectHero = async (info) => {
      data.selected[data.curIdx] = info;
      const selected = data.selected.reduce((res, x) => {
        if (x && x.tokenId) {
          res.push(x.tokenId);
        }
        return res;
      }, []);
      data.combineInfo = await store.state.c_staking.methods
        .isCombine(selected)
        .call();
      data.showPack = false;
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
      data.diffculty = localStorage.getItem("stake_diff");
    });
    const curDiff = computed(() => {
      return [
        {
          name: "斥候",
          img: require("../../assets/stake/detail/m_0.png"),
          time: 7,
          speed: 1000,
        },
        {
          name: "扫荡",
          img: require("../../assets/stake/detail/m_1.png"),
          time: 15,
          speed: 900,
        },
        {
          name: "驻扎",
          img: require("../../assets/stake/detail/m_2.png"),
          time: 30,
          speed: 800,
        },
      ][data.diffculty];
    });
    const totalPowers = computed(() => {
      return data.selected.reduce((res, x) => {
        if (x && x.power) res += Number(x.power);
        return res;
      }, 0);
    });
    const refData = toRefs(data);
    return {
      ...refData,
      selectedShow,
      pageNum,
      btnText,
      totalPowers,
      curDiff,
      combineName,
      onConfirm,
      handleClickStake,
      handleSelectHero,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/stake/stake_bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.pack_mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 100,
}
.top {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.power {
  padding: 1rem 2rem;
  box-sizing: border-box;
  background: url("../../assets/stake/stake/power_bg.png") no-repeat;
  background-size: 100% 100%;
  font-size: 1.2rem;
}
.stake_zone {
  width: 100%;
  height: 25rem;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  .item {
    width: 15vmax;
    height: 100%;
    margin-right: 2rem;
    transform: translateY(1.5rem);
  }
}
.action {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .disable {
      pointer-events: none;
      filter: grayscale(100);
    }
    .btn {
      cursor: pointer;
      width: 8rem;
      padding: 0.7rem 0;
      box-sizing: border-box;
      background: url("../../assets/stake/stake/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 4rem;
      color: white;
    }
  }
  .pagnation {
    display: flex;
    align-items: center;
    .page_item {
      cursor: pointer;
      width: 3rem;
      height: 3rem;
      background: url("../../assets/stake/stake/page_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 3rem;
      text-align: center;
      font-size: 1.2rem;
      margin-right: 2rem;
    }
  }
  .check_rule {
    position: relative;
    cursor: pointer;
    img {
      width: 10rem;
    }
    .text {
      position: absolute;
      white-space: nowrap;
      top: 50%;
      left: 50%;
      transform: translate(-74%, -59%);
      font-size: 1.2rem;
    }
  }
}
.bottom_info {
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  .left {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    display: flex;
    align-items: center;
    .dia {
      width: 2.5rem;
      margin-right: 2rem;
    }
    .btn {
      padding: 0.5rem 2rem;
      font-size: 2rem;
      height: 3rem;
      background: url("../../assets/stake/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 3rem;
    }
    .disable {
      pointer-events: none;
      filter: grayscale(1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    .right_item {
      padding: 1rem 3rem;
      background: linear-gradient(
        180deg,
        rgba(45, 43, 43, 0.7) 0%,
        rgba(28, 57, 67, 0.7) 67.71%,
        rgba(52, 58, 61, 0.7) 100%
      );
      border-radius: 1rem;
      margin-left: 2rem;
    }
    .cur_mission {
      display: flex;
      align-items: center;
      img {
        width: 4rem;
        margin-right: 1rem;
      }
      .intro {
        font-size: 1.5rem;
      }
    }
    .info {
      max-width: 35rem;
      .top_info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5rem;
      }
      .middle_info {
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        text-align: left;
        color: rgba(255, 153, 0, 1);
        margin: 1rem 0;
        .com_item {
          margin-right: 1rem;
        }
      }
      .bottom_info {
        text-align: left;
        font-size: 1.2rem;
        line-height: 1.2;
      }
    }
  }
}
</style>