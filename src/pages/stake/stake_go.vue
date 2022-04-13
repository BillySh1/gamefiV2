<template>
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
  <div class="box">
    <div class="top">
      <StkBtn :text="'返回'" @click="() => $router.go(-1)" />
      <div class="power">当前战力 2555000000</div>
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
      <div class="item">
        <StakeItem :info="{}" />
      </div>
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
      <div class="left">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="btn">出征</div>
      </div>
      <div class="right">
        <div class="cur_mission right_item">
          <img src="../../assets/stake/detail/m_0.png" alt="" />
          <div class="intro">
            <div>执行斥候任务</div>
            <div style="margin: 1rem 0">为期 7 天</div>
            <div>收益 15%</div>
          </div>
        </div>
        <div class="info right_item">
          <div class="top_info">
            <div class="">当前出战总人数 {{ selected.length }}</div>
            <div class="">触发羁绊 6</div>
            <div class="">战力总加成 6%</div>
          </div>
          <div class="middle_info">
            <div class="com_item">五子良将</div>
          </div>
          <div class="bottom_info">
            占位文案占位文案占位文案占位文案占位文案占位文案占位文案占位文案占位文案占
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
import StkBtn from "./components/stk_btn.vue";
import StakeItem from "./components/stake_item.vue";
import InjectPackHero from "../../components/inejct_pack_hero.vue";
export default {
  name: "stake_go",
  components: {
    StkBtn,
    StakeItem,
    InjectPackHero,
  },
  setup() {
    const data = reactive({
      selected: [{}, {}, {}, {}, {}],
      curIdx: 0,
      curPage: 1,
      showPack: false,
    });
    const selectedShow = computed(() => {
      return data.selected.slice(data.curPage * 5 - 5, data.curPage * 5 - 1);
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
    const handleClickStake = (index) => {
      data.curIdx = index;
      data.showPack = true;
    };
    const handleSelectHero = (info) => {
      data.selected[data.curIdx] = info;
      data.showPack = false;
    };
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      selectedShow,
      pageNum,
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
  margin: 2rem 0;
  .item {
    min-width: 15vmax;
    height: 100%;
    margin-right: 4rem;
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