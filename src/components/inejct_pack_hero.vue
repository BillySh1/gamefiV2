<template>
  <div v-if="value" class="pack_container">
    <Lottie v-if="loading" :options="lottie_options" />

    <div class="pack_main">
      <div class="top_box">
        <img
          class="back"
          style="width: 2.5rem"
          src="../assets/common/back.svg"
          @click="() => $emit('back')"
        />
        <div class="filter_box">
          <CommonPackFilter />
        </div>
        <div class="search_box">
          <CommonSearch />
        </div>
      </div>
      <div class="content">
        <div class="badge">
          <img src="../assets/pack/hero_badge.svg" alt="" />
          <div class="text">蜀</div>
        </div>
        <div class="card_content">
          <div class="empty" v-if="!curItems.length">暂无武将</div>
          <div
            v-for="(item, index) in curItems"
            :key="index"
            class="card_item"
            @click="
              () => {
                if (toSelect) {
                  $emit('select', item);
                } else {
                  $router.push({
                    name: 'heroDetail',
                    query: { tokenId: item.tokenId },
                  });
                }
              }
            "
          >
            <PackHeroItem :info="item" />
          </div>
        </div>
      </div>
      <div class="page_nation_box">
        <Page
          @change="
            (num) => {
              curPage = num;
              getCurShowItems();
            }
          "
          :current="curPage"
          :total="total"
        />
      </div>
      <img style="width: 100%" src="../assets/pack/bottom_border.svg" />
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import PackHeroItem from "./pack_hero_item";
import CommonPackFilter from "./common_pack_filter";
import CommonSearch from "./common_search";
import initWeb3 from "../utils/initWeb3.js";
import useHeroDetail from "../utils/useHeroDetail.js";
import Page from "./page";
export default {
  name: "inject_pack_hero",
  props: ["value", "toSelect"],
  components: {
    PackHeroItem,
    Page,
    CommonPackFilter,
    CommonSearch,
  },
  setup() {
    const store = useStore();
    const proxy = getCurrentInstance();
    const data = reactive({
      pageTitle: "我的背包",
      allItems: [],
      curItems: [],
      web3: "",
      account: "",
      rawData: [],
      curPage: 1,
      total: 0,
      lottie_options: {
        animationData: require("../assets/common/loading.json"),
      },
      loading: false,
    });
    const getCurShowItems = () => {
      data.curItems = [];
      const curPage = data.curPage;
      const rawData = data.rawData;
      const startIndex = (curPage - 1) * 4;
      const endIndex =
        curPage * 4 > rawData.length ? rawData.length - 1 : curPage * 4 - 1;
      data.curItems = rawData.slice(startIndex, endIndex + 1);
      console.log(data.curItems);
    };
    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getPack();
      getCurShowItems();
      data.loading = false;
    });
    const getPack = async () => {
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
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
        data.total = Math.ceil(data.rawData.length / 4);
      } catch (e) {
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getCurShowItems,
    };
  },
};
</script>
<style lang="less" scoped>
.pack_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.pack_main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .top_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    background: rgba(0, 0, 0, 0.5);
    .back {
      cursor: pointer;
      margin-left: 4rem;
    }
    .filter_box {
      transform: translateX(-10rem);
    }
  }
  .content {
    margin: 1rem 0;
    background: rgba(0, 0, 0, 0.5);
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    .badge {
      position: relative;
      height: 100%;
      img {
        height: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 3rem;
        font-size: 3rem;
      }
    }
    .card_content {
      height: 100%;
      width: 80%;
      display: flex;
      align-items: center;
      gap: 2rem;
      transform: translateX(10%);
      .empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
      }
      .card_item {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        height: 100%;
        width: 20%;
      }
    }
  }
  .page_nation_box {
    padding: 0.5rem 0;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row-reverse;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
