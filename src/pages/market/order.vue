<template>
  <div class="pack_container">
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />

    <div class="pack_main">
      <div class="top_box">
        <img
          class="back"
          style="width: 2.5rem"
          src="../../assets/common/back.svg"
          @click="
            (e) => {
              $router.go(-1);
            }
          "
        />
        <div class="search_box">
          <CommonSearch />
        </div>
      </div>
      <div class="content">
        <div class="badge">
          <div class="tabs">
            <div
              v-for="(item, index) in tabs"
              :key="index"
              @click="() => (curTab = item.key)"
              :class="curTab == item.key ? 'item active' : 'item'"
            >
              {{ item.name }}
            </div>
          </div>
          <img
            class="divider"
            src="../../assets/market/order/divider.svg"
            alt=""
          />
        </div>
        <div class="card_content">
          <div class="empty" v-if="!rawData.length">未查询到订单</div>
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
            <MarketHeroItem :info="item" />
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
    </div>

    <CommonPageFooter />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  watch,
} from "vue";
import { useStore } from "vuex";
import MarketHeroItem from "./market_hero_item.vue";
import CommonSearch from "../../components/common_search";
import CommonPageHeader from "../../components/common_page_header.vue";
import CommonPageFooter from "../../components/common_page_footer.vue";
import initWeb3 from "../../utils/initWeb3.js";
import useHeroDetail from "../../utils/useHeroDetail.js";
import Page from "../../components/page";
export default {
  name: "market_camp_detail",
  components: {
    MarketHeroItem,
    Page,
    CommonSearch,
    CommonPageHeader,
    CommonPageFooter,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      pageTitle: "我的订单",
      curItems: [],
      web3: "",
      account: "",
      rawData: [],
      curPage: 1,
      total: 0,
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
      loading: false,
      tabs: [
        { key: 0, name: "挂单中" },
        { key: 1, name: "已购买" },
        { key: 2, name: "已售出" },
      ],
      curTab: 0,
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
      await getListingList();
      data.loading = false;
    });
    const getListingList = async () => {
      try {
        data.loading = true;
        const c = store.state.c_exchange;
        const res = await c.methods.getExchangeList(data.account).call();
        if (!res.length) {
          return;
        }
        res.map(({ detail, order }) => {
          const uid =
            detail.camp.toString() +
            detail.rarity.toString() +
            detail.heroId.toString();
          data.rawData.push({
            tokenId: detail.tokenId,
            heroId: detail.heroId,
            rarity: detail.rarity,
            quality: detail.quality,
            properties: detail.properties.map((x) => Number(x) / 100),
            power: detail.power,
            star: detail.star,
            rebirthTimes: detail.rebirthTimes,
            preference: detail.preference,
            native: detail.native,
            level: detail.level,
            camp: detail.camp,
            addition: detail.addition,
            uid: uid,
            ...useHeroDetail(uid, detail.preference),
            creator: order.creator,
            price: order.price,
          });
        });
        data.total = Math.ceil(data.rawData.length / 4);
        getCurShowItems();
      } catch (e) {
        console.log(e);
        proxy.$toast("获取市场失败", store.state.toast_error);
      } finally {
        data.loading = false;
      }
    };
    watch(
      () => data.curTab,
      async (v) => {
        data.rawData = [];
        data.curItems = [];
        if (v == 0) {
          getListingList();
        } else if (v == 1) {
          console.log("goumai");
        } else if (v == 2) {
          console.log("shouchu");
        }
      }
    );
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
  position: relative;
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
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0rem;
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
    height: 23rem;
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    .badge {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      .divider {
        height: 100%;
      }
      .tabs {
        width: 10rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          padding: 1rem 0;
          margin: 1rem 0;
        }
        .active {
          background: url("../../assets/pack/active_tab.png") no-repeat;
          background-size: 100% 100%;
        }
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
        width: 22%;
      }
    }
  }
  .page_nation_box {
    padding: 0.5rem 0;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row-reverse;
  }
}
</style>
