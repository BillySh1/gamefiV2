<template>
  <div class="box">
    <StkBtn
      class="top_left"
      :text="'返回'"
      @click="
        () =>
          $router.push({
            name: 'stk_main',
          })
      "
    />
  </div>
  <div class="center">
    <div class="tab_topbar">
      <div class="left">
        <div
          class="item"
          v-for="item in tabMap"
          :key="item.key"
          @click="() => (curTab = item.key)"
        >
          <img
            v-if="curTab == item.key"
            src="../../assets/stake/staked_view/tab_active.png"
            alt=""
          />
          <img v-else src="../../assets/stake/staked_view/tab_bg.png" alt="" />
          <div class="text">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="power">
        <div>质押战力</div>
        <div class="value">
          {{ Number(player.stakingInfo.power) / 100 }}
        </div>
      </div>
    </div>
    <div class="stake_container">
      <div class="stake_item" v-for="(item, index) in staked" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
  <div class="right">
    <div class="inner">
      <img src="../../assets/stake/map/ing.png" alt="" />
      <div class="text">我的部队</div>
    </div>
  </div>
  <div class="bottom_left">
    <img src="../../assets/stake/staked_view/addition_icon.png" alt="" />
    <div class="intro">雇佣兵详情</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import StkBtn from "./components/stk_btn";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import useHeroDetail from "../../utils/useHeroDetail";
import { useQualityText } from "../../utils/useHeroInfo";
export default {
  name: "staked_view",
  components: {
    StkBtn,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      tabMap: [
        {
          key: 0,
          name: "主公",
        },
        {
          key: 1,
          name: "武将",
        },
        {
          key: 2,
          name: "佣兵",
        },
      ],
      curTab: 0,
      account: "",
      web3: "",
      alreadyKings: [],
      alreadyWarriors: [],
      player: "",
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
      await getStakedHero();
    });
    const staked = computed(() => {
      return [data.alreadyKings, data.alreadyWarriors][data.curTab];
    });
    const getStakedHero = async () => {
      const c = store.state.c_staking;
      const hero = store.state.c_hero;
      const res = await c.methods.players(data.account).call();
      data.player = res;
      data.staked = res.stakingInfo.stakingHeros;
      if (data.staked.length > 0) {
        for (let i = 0; i < data.staked.length; i++) {
          const tokenId = data.staked[i];
          const x = await hero.methods.getHero(tokenId).call();
          const uid =
            x.camp.toString() + x.rarity.toString() + x.heroId.toString();
          const heroItem = {
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
            qualityName: useQualityText(x.quality),
          };
          if (heroItem.rarity == 4) {
            data.alreadyKings.push(heroItem);
          } else {
            data.alreadyWarriors.push(heroItem);
          }
        }
      }
    };

    const refData = toRefs(data);
    return {
      ...refData,
      staked,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/staked_view/stk_view.png") no-repeat;
  background-size: 100% 100%;
}
.top_left {
  position: absolute;
  left: 3%;
  top: 3%;
}
.center {
  min-width: 60%;
  min-height: 50vmin;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  .tab_topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      position: relative;
      width: 5rem;
      height: 5rem;
      font-size: 1.5rem;
      cursor: pointer;
      img {
        width: 100%;
      }
      margin-right: 2rem;
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  .power {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../../assets/stake/staked_view/power_bg.png") no-repeat;
    background-size: 100% 100%;
    font-size: 2rem;
    .value {
      margin: 0 1rem;
      background: linear-gradient(48.4deg, #ffca7b 4.15%, #a67327 64.55%);
      background-clip: text;
      color: transparent;
    }
  }
  .stake_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    .stake_item {
      display: flex;
      width: calc(50% - 1rem);
    }
  }
}
.right {
  position: absolute;
  right: 5%;
  top: 10%;
  width: 5rem;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
  }
  .text {
    position: absolute;
    font-size: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.bottom_left {
  position: absolute;
  bottom: 3%;
  left: 3%;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 3rem;
    margin-right: 2rem;
  }
  .intro {
    min-width: 10rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(
      180deg,
      #400b0b 0%,
      #330404 55.73%,
      #400b0b 100%
    );
    border-radius: 0.5rem;
    color: white;
    font-size: 1.5rem;
  }
}
</style>