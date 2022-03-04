<template>
  <div class="container">
    <InjectGoBack v-if="!loading" />
    <CommonPageHeader :title="pageTitle" />
    <Lottie
      v-if="loading"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <div v-if="!loading" class="content">
      <div class="stock_item_box">
        <div v-for="item in stockBox" :key="item.tokenId" class="stock_item">
          <img :src="item.img" />
          <div class="text">
            {{ item.name }} <br />
            {{ item.num }}
          </div>
        </div>
      </div>
      <div class="hero_card_big">
        <HeroCardItem :info="info" />
      </div>
      <div class="operate_box">
        <ComUpgrade v-if="curTab == 0" :info="info" :stockBox="stockBox" @refresh="refresh" />
        <ComOverfulfil v-if="curTab == 1" :info="info" @refresh="refresh" />
        <ComSkill v-if="curTab == 2" />
        <img class="divider" src="../../assets/upgrade/divider_tab.png" />

        <div class="tabs_box">
          <div
            v-for="(item, index) in tabMap"
            :key="index"
            class="tab_item"
            :style="curTab == index ? 'opacity:1' : ''"
            @click="
              () => {
                if (index == 2) return;
                curTab = index;
              }
            "
          >
            <img src="../../assets/upgrade/tab_bg.png" />
            <div class="inner">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!loading"
      class="tip_badge"
      @click="
        () =>
          $router.push({
            name: 'store',
            query: {
              type: 2,
            },
          })
      "
    >
      <div class="inner">
        <img src="../../assets/common/tip_badge.svg" />
        <div class="text">前往商城</div>
      </div>
    </div>
    <img class="bg_badge" src="../../assets/pack/bg_badge.svg" />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import initWeb3 from "../../utils/initWeb3";
import useHeroDetail from "../../utils/useHeroDetail";
import HeroCardItem from "../../components/hero_card_item.vue";
import CommonPageHeader from "../../components/common_page_header.vue";
import { useGetShopDetailByTokenId } from "../store/use_shop_items";
import ComUpgrade from "./com_upgrade.vue";
import ComOverfulfil from "./com_overfulfil.vue";
import ComSkill from "./com_skill.vue";
import InjectGoBack from "../../components/inject_go_back.vue";
export default {
  name: "upgrade",
  components: {
    HeroCardItem,
    CommonPageHeader,
    ComUpgrade,
    ComOverfulfil,
    ComSkill,
    InjectGoBack,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      pageTitle: "卡牌升级",
      info: "",
      account: "",
      web3: "",
      loading: false,
      stockBox: [],
      costNum: "",
      curTab: 0,
      tabMap: ["升级", "突破", "技能"],
    });
    const getWeb3 = async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
    };

    const getHeroInfo = async () => {
      const c = store.state.c_hero;
      const res = await c.methods.getHero(route.query.tokenId).call();
      const uid =
        res.camp.toString() + res.rarity.toString() + res.heroId.toString();
      data.info = { ...res, ...useHeroDetail(uid, res.preference), uid: uid };
      data.info.power = Number(data.info.power) / 100
    };
    const getStockBox = async () => {
      data.stockBox = []
      const c = store.state.c_richShop;
      const map = [0, 1, 2, 3, 7];
      for (let i = 0; i < map.length; i++) {
        await data.stockBox.push({
          ...useGetShopDetailByTokenId(map[i]),
          num: await c.methods
            .balanceOf(data.account, map[i].toString())
            .call(),
        });
      }
    };
    const refresh = async()=>{
      data.loading = true;
      await getHeroInfo();
      await getStockBox();
      data.loading = false;
    }
    onBeforeMount(async () => {
      data.loading = true;
      await getWeb3();
      await getHeroInfo();
      await getStockBox();
      data.loading = false;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      refresh
    };
  },
};
</script>
<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  background: #2c0707;
  .tip_badge {
    cursor: pointer;
    position: fixed;
    bottom: 15%;
    left: 0;
    width: 10rem;
    z-index: 50;
     white-space: nowrap;
    .inner {
      position: relative;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        white-space: nowrap;
        transform: translate(-50%, -50%);
      }
    }
  }
  .bg_badge {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    opacity: 0.8;
  }
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hero_card_big {
    width: 20%;
  }
  .stock_item_box {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .stock_item {
      display: flex;
      align-items: center;
      img {
        width: 5rem;
      }
      .text {
        text-align: center;
      }
    }
  }
  .operate_box {
    width: 50%;
    height: 35rem;
    display: flex;
    .divider {
      margin-left: 2rem;

      height: 100%;
    }
    .tabs_box {
      width: 30%;
      height: 100%;

      .tab_item {
        position: relative;
        width: 8rem;
        margin-bottom: 4px;
        color: white;
        cursor: pointer;
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
        img {
          width: 100%;
        }
        .inner {
          width: 100%;
          font-size: 1.2rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>