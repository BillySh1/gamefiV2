<template>
  <div v-if="value" class="pack_container">
    <Lottie v-if="loading" :options="lottie_options" />

    <div class="pack_main">
      <div class="top_box">
        <img
          class="back"
          style="width: 2.5rem"
          src="../assets/common/back.svg"
          @click="
            (e) => {
              e.stopPropagation();
              $emit('back');
            }
          "
        />
        <div class="filter_box" @click="() => (showFilter = true)">
          <CommonPackFilter :value="showFilter" />
        </div>
        <div class="search_box">
          <CommonSearch />
        </div>
      </div>
      <div class="content">
        <div class="badge">
          <div class="tabs">
            <div class="title">
              <img src="../assets/pack/tab_title_bg.png" alt="" />
              <div class="inner">武将</div>
            </div>
            <div
              v-for="(item, index) in tabs"
              :key="index"
              @click="() => filterTab(item)"
              :class="curTab == item.key ? 'item active' : 'item'"
            >
              {{ item.name }}
            </div>
          </div>
          <img
            class="divider"
            src="../assets/market/order/divider.svg"
            alt=""
          />
        </div>
        <div class="card_content">
          <div
            class="left"
            v-if="curPage > 1"
            @click="
              () => {
                curPage--;
                getCurShowItems();
              }
            "
          >
            <img src="../assets/store/left.png" alt="" />
          </div>
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
          <div
            class="right"
            v-if="curPage < total"
            @click="
              () => {
                curPage++;
                getCurShowItems();
              }
            "
          >
            <img src="../assets/store/right.png" alt="" />
          </div>
        </div>
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
export default {
  name: "inject_pack_hero",
  props: ["value", "toSelect"],
  components: {
    PackHeroItem,
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
      tabs: [
        { key: 0, name: "战力" },
        { key: 1, name: "品级" },
        { key: 2, name: "稀有度" },
      ],
      curTab: 0,
      showFilter: false,
    });
    const getCurShowItems = () => {
      data.curItems = [];
      const curPage = data.curPage;
      const rawData = data.rawData;
      const startIndex = (curPage - 1) * 4;
      const endIndex =
        curPage * 4 > rawData.length ? rawData.length - 1 : curPage * 4 - 1;
      data.curItems = rawData.slice(startIndex, endIndex + 1);
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
      filterTab({ key: 0 });
      data.loading = false;
    });
    const filterTab = (item) => {
      data.curTab = item.key;
      const _v = ["power", "quality", "rarity"][item.key];
      data.rawData.sort((a, b) => {
        return Number(b[_v]) - Number(a[_v]);
      });
      getCurShowItems();
    };
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
      filterTab,
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
  z-index: 20;
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
    height: 24rem;
    display: flex;
    align-items: center;
    padding: 1rem 0rem;
    .badge {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 2rem;
      .divider {
        margin-left: 1rem;
        height: 100%;
      }
      .tabs {
        width: 13rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title {
          position: relative;
          img {
            width: 100%;
          }
          .inner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            font-weight: 600;
            white-space: nowrap;
          }
        }
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: 10px;
          padding: 1rem 0;
          margin: 1rem 0;
        }
        .active {
          background: url("../assets/pack/active_tab.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .card_content {
      height: 100%;
      display: flex;
      align-items: center;
      transform: translateX(10%);
      .left {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
        cursor: pointer;
        width: 2rem;
        img {
          width: 100%;
        }
      }
      .right {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
        cursor: pointer;
        width: 2rem;
        img {
          width: 100%;
        }
      }
      .empty {
        width: 100%;
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
        margin: 0 1rem;
        height: 90%;
        width: 16rem;
      }
    }
  }
}
</style>
