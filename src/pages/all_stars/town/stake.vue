<template>
  <ChooseRoad
    @back="() => (showChoose = false)"
    :camp="camp"
    @choose="
      (item) => {
        road = item;
        btnStep = 1;
      }
    "
    v-if="showChoose"
  />
  <div v-else class="box">
    <InjectPackHero
      :value="showPack"
      :toSelect="true"
      :selected="selectedTokenIds"
      @select="(x) => handleSelectHero(x)"
      @back="
        () => {
          showPack = false;
        }
      "
    />
    <InjectModal
      :value="showRuleModal"
      :title="'出征规则'"
      @confirm="() => (showRuleModal = false)"
      @close="() => (showRuleModal = false)"
    >
      <div class="rule_modal_item">
        至少抵押一张卡牌，最多抵押五张卡牌出征，金卡数量不限
      </div>
      <div class="rule_modal_item">
        出征将收取一定的粮草和战鼓用以振奋军心,请各位指挥官提早准备
      </div>

      <div class="rule_modal_item" style="color: red">
        注意:
        一旦出征，卡牌在背包中将不可见，在此战役期间您将无法再对出征的卡牌做任何操作,战役结束卡牌自动归还
      </div>
    </InjectModal>
    <InjectModal
      :value="showDoubleCheck"
      :title="'出征确认'"
      @confirm="onConfirm"
      @close="() => (showDoubleCheck = false)"
      :btnText="btnText"
      :btnDisable="btnDisable"
    >
      <div class="rule_modal_item">
        需要消耗粮草
        <img
          style="width: 4rem"
          src="../../../assets/store/item/type_0_0.png"
          alt=""
        />
        数量：
        {{ cost[0] }}
      </div>
      <div class="rule_modal_item">
        需要消耗衅鼓
        <img
          style="width: 4rem"
          src="../../../assets/store/item/type_0_1.png"
          alt=""
        />
        数量：
        {{ cost[1] }}
      </div>
      <div class="rule_modal_item">武将队伍： {{ getWarrorNames }}</div>
      <div class="rule_modal_item">主公队伍: {{ getKingNames }}</div>
      <div class="rule_modal_item">
        路线: {{ roadText }}
        <CommonButton
          style="margin-left: 2rem"
          @click="() => (showChoose = true)"
          >更改</CommonButton
        >
      </div>
      <div class="rule_modal_item" style="color: red">
        总战力： {{ totalPower }}
      </div>

      <div class="rule_modal_item" style="color: red">
        注意:一旦出征，本此战役期间均无法更改，确认出征？
      </div>
    </InjectModal>
    <div class="topbar">
      <div class="title">
        <img src="../../../allstar_assets/store/title_bg.png" alt="" />
        <div class="text">天策府</div>
      </div>
      <div class="tabs">
        <div
          class="tab_item"
          v-for="item in tabs"
          :key="item.key"
          v-show="activeTab == item.key"
          @click="() => (activeTab = item.next)"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
      <div class="power">
        <img src="../../../allstar_assets/stake/power_bg.png" alt="" />
        <div class="text">
          <div class="t">战力</div>
          <div class="bg_v">{{ curTotalPower }}</div>
        </div>
      </div>
      <div class="rule" @click="() => (showRuleModal = true)">
        <img src="../../../allstar_assets/stake/rule_bg.png" alt="" />
        <div class="text">出征规则</div>
      </div>
    </div>
    <div class="main" v-show="!showPack && activeTab == 0">
      <div
        class="main_item"
        v-for="(item, index) in selectedWarrior"
        :key="index"
        @click="() => handleClickItem(index)"
      >
        <StakeItem :info="item" />
      </div>
    </div>
    <div class="main" v-show="!showPack && activeTab == 1">
      <div
        class="main_item"
        v-for="(item, index) in selectedKing"
        :key="index"
        @click="() => handleClickItem(index)"
      >
        <StakeItem :info="item" />
      </div>
      <div
        class="main_item"
        @click="() => handleClickItem(selectedKing.length)"
      >
        <StakeItem :info="{}" />
      </div>
    </div>
    <div class="footer">
      <div class="back" @click="() => $router.go(-1)">
        <img src="../../../allstar_assets/store/back.png" alt="" />
        <div class="text">返回</div>
      </div>
      <div v-if="isCombined" class="combine">
        触发了组合
        <span style="color: red">{{ isCombined }}</span> 战力更上一层楼
      </div>
      <div class="stake" @click="doubleCheck">
        <img src="../../../allstar_assets/stake/stake_btn_bg.png" alt="" />
        <div class="text">出征</div>
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
} from "vue";
import StakeItem from "./stake_item.vue";
import InjectPackHero from "../../../components/inejct_pack_hero.vue";
import InjectModal from "../../../components/inject_modal.vue";
import ChooseRoad from "./choose_road.vue";
import initWeb3 from "../../../utils/initWeb3";
import { useQualityText } from "../../../utils/useHeroInfo";
import { initRoads } from "../../../utils/useRoutes";
import { combineMap, findCombineIndex } from "../../../utils/useCombine";
import CommonButton from "./../../../components/common_button.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "bf_stake",
  components: {
    StakeItem,
    InjectPackHero,
    InjectModal,
    ChooseRoad,
    CommonButton,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      tabs: [
        {
          key: 0,
          img: require("../../../allstar_assets/stake/wujiang.png"),
          next: 1,
        },
        {
          key: 1,
          img: require("../../../allstar_assets/stake/zhugong.png"),
          next: 0,
        },
      ],
      activeTab: 0,
      selectedWarrior: [{}, {}, {}, {}, {}],
      selectedKing: [],
      cost: [0, 10],
      curIdx: 0,
      showPack: false,
      showRuleModal: false,
      showDoubleCheck: false,
      account: "",
      web3: "",
      showChoose: false,
      camp: 0,
      player: "",
      btnDisable: false,
      btnStep: 0,
      road: undefined,
      isCombined: false,
    });

    const curTotalPower = computed(() => {
      const dataMap =
        data.activeTab == 0 ? data.selectedWarrior : data.selectedKing;
      return dataMap.reduce((pre, cur) => {
        if (cur && cur.power) {
          pre += Number(cur.power);
        }
        return pre;
      }, 0);
    });
    const btnText = computed(() => {
      return ["路线", "授权", "授权道具", "出征"][data.btnStep];
    });
    const roadText = computed(() => {
      return initRoads[data.camp][data.road] || "暂未选择路线";
    });
    const totalPower = computed(() => {
      const temp1 = data.selectedWarrior.reduce((pre, cur) => {
        if (cur && cur.power) {
          pre += Number(cur.power);
        }
        return pre;
      }, 0);
      const temp2 = data.selectedKing.reduce((pre, cur) => {
        if (cur && cur.power) {
          pre += Number(cur.power);
        }
        return pre;
      }, 0);
      return temp1 + temp2;
    });
    const selectedTokenIds = computed(() => {
      const temp = [];
      data.selectedWarrior.forEach((item) => {
        if (item && item.tokenId) temp.push(item.tokenId);
      });
      data.selectedKing.forEach((item) => {
        if (item && item.tokenId) temp.push(item.tokenId);
      });
      return temp;
    });
    const handleClickItem = (idx) => {
      data.curIdx = idx;
      data.showPack = true;
    };
    const handleSelectHero = async (item) => {
      if (item.camp != data.camp) {
        proxy.$toast(`请选择您的阵营`, store.state.toast_error);
        return;
      }
      if (data.activeTab == 0) {
        if (item.rarity == 4) {
          proxy.$toast(`当前位置不支持选择金卡`, store.state.toast_error);
          return;
        }
        data.selectedWarrior[data.curIdx] = item;
      } else if (data.activeTab == 1) {
        if (item.rarity != 4) {
          proxy.$toast(`当前位置只支持选择金卡`, store.state.toast_error);
          return;
        }
        data.selectedKing[data.curIdx] = item;
      }

      await combileInfo();
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
      await getPlayer();
    });
    const getPlayer = async () => {
      const c = store.state.c_battle;
      const player = await c.methods.players(data.account).call();
      data.player = player;
      data.camp = player.camp;
    };
    const doubleCheck = async () => {
      await getCost();
      data.showDoubleCheck = true;
    };
    const onConfirm = async () => {
      if (data.btnStep == 0) {
        data.showChoose = true;
        data.btnStep = 1;
      } else if (data.btnStep == 1) {
        await approve();
      } else if (data.btnStep == 2) {
        await approveStock();
      } else if (data.btnStep == 3) {
        await go();
      }
    };

    const warriors = computed(() => {
      return data.selectedWarrior.reduce((pre, cur) => {
        if (cur && cur.tokenId) pre.push(cur.tokenId);
        return pre;
      }, []);
    });
    const kings = computed(() => {
      return data.selectedKing.reduce((pre, cur) => {
        if (cur && cur.tokenId) pre.push(cur.tokenId);
        return pre;
      }, []);
    });
    const approve = async () => {
      try {
        proxy.$toast("等待授权", store.state.toast_info);
        data.btnDisable = true;
        const c = store.state.c_hero;
        const addr = store.state.c_battle.options.address;
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
          data.btnStep = 2;
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };

    const approveStock = async () => {
      try {
        data.btnDisable = true;
        const c = store.state.c_richShop;
        const addr = store.state.c_battle.options.address;
        const isApproved = await c.methods
          .isApprovedForAll(data.account, addr)
          .call();
        if (isApproved) {
          proxy.$toast(`授权额度足够，无需授权`, store.state.toast_info);
          data.btnStep = 3;
          data.btnDisable = false;
          return;
        }
        proxy.$toast(`等待授权道具`, store.state.toast_info);
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
          data.btnStep = 3;
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    const combileInfo = async () => {
      const c = store.state.c_battle;
      console.log(warriors.value, kings.value, "ggg");
      const res = await c.methods.isCombine(warriors.value, kings.value).call();
      const idx = res.findIndex((x) => {
        return x == true;
      });
      if (idx == -1) {
        data.isCombined = false;
      } else {
        data.isCombined = combineMap[data.camp][idx];
      }
      console.log(data.isCombined, "gggg");
    };
    const go = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        console.log(
          "params",
          data.road,
          warriors.value,
          kings.value,
          !!data.isCombined,
          findCombineIndex(data.camp, data.isCombined)
        );
        const gas = await c.methods
          .fight(
            data.road,
            warriors.value,
            kings.value,
            !!data.isCombined,
            findCombineIndex(data.camp, data.isCombined)
          )
          .estimateGas({ from: data.account });
        const res = await c.methods
          .fight(
            data.road,
            warriors.value,
            kings.value,
            !!data.isCombined,
            findCombineIndex(data.camp, data.isCombined)
          )
          .send({
            gasPrice: gasPrice,
            gas: gas,
            from: data.account,
          });
        if (res.status) {
          proxy.$toast("出征成功", store.state.toast_success);
          router.push({
            name: "bf_main",
          });
        }
      } catch (e) {
        proxy.$toast("出征失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    const getCost = async () => {
      const c = store.state.c_battle;
      const tokenIds1 = data.selectedWarrior.reduce((pre, cur) => {
        if (cur && cur.tokenId) pre.push(cur.tokenId);
        return pre;
      }, []);
      const tokenIds2 = data.selectedKing.reduce((pre, cur) => {
        if (cur && cur.tokenId) pre.push(cur.tokenId);
        return pre;
      }, []);
      if (!tokenIds1.length && !tokenIds2.length) {
        proxy.$toast(`请至少选择一张卡片`, store.state.toast_error);
        return;
      }
      data.cost[0] = await c.methods.ticketAmount(tokenIds1, tokenIds2).call();
      console.log(data.cost[0]);
    };
    const getWarrorNames = computed(() => {
      const res = data.selectedWarrior.reduce((pre, cur) => {
        if (cur && cur.tokenId) {
          pre.push(`${cur.name} (${useQualityText(cur.quality)}) `);
        }
        return pre;
      }, []);
      return res.length > 0 ? res.join(",") : "无";
    });
    const getKingNames = computed(() => {
      const res = data.selectedKing.reduce((pre, cur) => {
        if (cur && cur.tokenId) {
          pre.push(`${cur.name} (${useQualityText(cur.quality)}) `);
        }
        return pre;
      }, []);
      return res.length > 0 ? res.join(",") : "无";
    });
    const refData = toRefs(data);
    return {
      ...refData,
      curTotalPower,
      selectedTokenIds,
      getWarrorNames,
      getKingNames,
      totalPower,
      handleClickItem,
      handleSelectHero,
      getCost,
      doubleCheck,
      onConfirm,
      roadText,
      btnText,
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
  background: url("../../../allstar_assets/stake/stake_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.rule_modal_item {
  max-width: 60%;
  margin: 1rem auto;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bg_v {
  font-size: 2rem;
  background: linear-gradient(48.4deg, #ffca7b 4.15%, #a67327 64.55%);
  color: transparent;
  background-clip: text;
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    position: relative;
    width: 20rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 48%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
    }
  }
  .tabs {
    width: 20rem;
    display: flex;
    align-items: center;
    .tab_item {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      width: 30%;
      img {
        width: 100%;
      }
    }
  }
  .power {
    width: 20rem;
    position: relative;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      .t {
        font-size: 1.5rem;
        margin-right: 1rem;
        white-space: nowrap;
      }
    }
  }
  .rule {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    position: relative;
    width: 12rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 40%;
      font-size: 1.5rem;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }
  }
}
.main {
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  overflow-x: auto;
  .main_item {
    min-width: 20vmax;
    height: 100%;
    margin-right: 2rem;
  }
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .back {
    cursor: pointer;
    display: flex;
    font-size: 2rem;
    align-items: center;
    img {
      width: 3rem;
      margin-right: 2rem;
    }
  }
  .combine {
    font-size: 1.5rem;
  }
  .stake {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    position: relative;
    width: 10rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
    }
  }
}
</style>