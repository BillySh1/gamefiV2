<template>
  <div class="box">
    <div class="left">
      <div class="back">
        <img src="../../assets/stake/stake/back.png" alt="" />
        <div class="text">返回</div>
      </div>
    </div>
    <div class="scroll">
      <div
        class="hero_item"
        v-for="(item, index) in rawData"
        :key="index"
        @click="() => onSelect(item)"
      >
        <stake_pack_item :info="item" :selected="selected.includes(item)" />
      </div>
    </div>
    <div class="right">
      <div>
        <div class="curPower">
          <img src="../../assets/stake/stake/curPowerBg.png" alt="" />
          <div class="text">当前战力 {{ curTotalPower }}</div>
        </div>
        <div class="curInfo">
          <img src="../../assets/stake/stake/curInfoBg.png" alt="" />
          <div class="info">
            <div style="display: flex">
              <div class="title">当前总出战人数</div>
              <div class="red">{{ selected.length }}</div>
            </div>
            <div class="gap">已选择</div>
            <div class="red">
              {{ selected.map((x) => x.name).join(", ") }}
            </div>
          </div>
        </div>
      </div>

      <div class="btn_wrapper" @click="clickMission">
        <img class="btn_bg" src="../../assets/stake/choose/btn_bg.png" alt="" />
        <div class="text">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  computed,
} from "vue";
import { useStore } from "vuex";
import useHeroDetail from "../../utils/useHeroDetail.js";
import initWeb3 from "../../utils/initWeb3";
import stake_pack_item from "./components/stake_pack_item.vue";
export default {
  name: "stk_go",
  components: {
    stake_pack_item,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      rawData: [],
      selected: [],
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
      await getPack();
    });
    const curTotalPower = computed(() => {
      return data.selected.reduce((pre, cur) => {
        if (cur && cur.power) {
          pre += Number(cur.power);
        }
        return pre;
      }, 0);
    });
    const onSelect = (item) => {
      const idx = data.selected.findIndex((x) => {
        return x.tokenId === item.tokenId;
      });
      if (idx == -1) {
        data.selected.push(item);
      } else {
        data.selected.splice(idx, 1);
      }
    };
    const getPack = async () => {
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        data.rawData = [];
        res.map((x) => {
          const uid =
            x.camp.toString() + x.rarity.toString() + x.heroId.toString();
          data.rawData.push({
            tokenId: x.tokenId,
            heroId: x.heroId,
            rarity: x.rarity,
            quality: x.quality,
            properties: x.properties.map((x) => Number(x) / 100),
            power: Number(x.power) / 100,
            star: x.star,
            rebirthTimes: x.rebirthTimes,
            preference: x.preference,
            native: x.native,
            level: x.level,
            camp: x.camp,
            addition: x.addition,
            uid: uid,
            ...useHeroDetail(uid, x.preference),
          });
        });
      } catch (e) {
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      curTotalPower,
      onSelect,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  background: url("../../assets/stake/stake/stake_bg.png") no-repeat;
  background-size: 100% 100%;
}
.left {
  position: relative;
  width: 10%;
  height: 100%;
  .back {
    position: absolute;
    left: 0;
    bottom: 4rem;
    transform: translateX(-3rem);
    img {
      width: 80%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
    }
  }
}
.scroll {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow-y: auto;
  justify-content: space-around;
  .hero_item {
    width: 15rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}

.right {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .curPower {
    position: relative;
    margin-bottom: 4rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
    }
  }
  .curInfo {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      z-index: 0;
    }
    .info {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      z-index: 100;
      font-size: 1.3rem;
      .title {
        margin-right: 2rem;
      }
      .gap {
        margin: 2rem 0;
      }
      .red {
        color: #fc6262;
      }
    }
  }
  .btn_wrapper {
    position: relative;
    width: 15rem;
    margin-bottom: 4rem;
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
}
</style>