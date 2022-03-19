<template>
  <div class="box">
    <InjectPackHero
      :value="showPack"
      :toSelect="true"
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
    <div class="main" v-show="!showPack">
      <div
        class="main_item"
        v-for="(item, index) in selectedWarrior"
        :key="index"
        @click="() => handleClickItem(index)"
      >
        <StakeItem :info="item" />
      </div>
    </div>
    <div class="footer">
      <div class="back" @click="() => $router.go(-1)">
        <img src="../../../allstar_assets/store/back.png" alt="" />
        <div class="text">返回</div>
      </div>
      <div class="stake">
        <img src="../../../allstar_assets/stake/stake_btn_bg.png" alt="" />
        <div class="text">出征</div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
import StakeItem from "./stake_item.vue";
import InjectPackHero from "../../../components/inejct_pack_hero.vue";
import InjectModal from "../../../components/inject_modal.vue";
export default {
  name: "bf_stake",
  components: {
    StakeItem,
    InjectPackHero,
    InjectModal,
  },
  setup() {
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
      curIdx: 0,
      showPack: false,
      showRuleModal: false,
    });

    const curTotalPower = computed(() => {
      const dataMap = data.selectedWarrior;
      return (
        dataMap.reduce((pre, cur) => {
          pre += Number(cur.power);
          return pre;
        }, 0) || 0
      );
    });
    const handleClickItem = (idx) => {
      data.curIdx = idx;
      data.showPack = true;
    };
    const handleSelectHero = (item) => {
      data.selectedWarrior[data.curIdx] = item;
      data.showPack = false;
    };
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      curTotalPower,
      handleClickItem,
      handleSelectHero,
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