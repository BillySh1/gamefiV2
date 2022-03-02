<template>
  <div class="pack_container">
    <CommonPageHeader :pageTitle="pageTitle" />
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
        <div class="filter_box">
          <CommonPackFilter />
        </div>
        <div class="search_box">
          <CommonSearch />
        </div>
      </div>
      <div class="content">
        <div class="badge">
          <img src="../../assets/pack/hero_badge.svg" alt="" />
          <div class="text">蜀</div>
        </div>
        <div class="card_content">
          <div class="empty" v-if="!rawData.length">市场中暂无卡牌</div>
          <div
            v-for="(item, index) in curItems"
            :key="index"
            class="card_item"
            @click="
              () => {
                $router.push({
                  name: 'orderDetail',
                  query: { tokenId: item.tokenId },
                });
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
      <img style="width: 100%" src="../../assets/pack/bottom_border.svg" />
    </div>
    <div class="tip_badge" @click="() => $router.push({ name: 'order' })">
      <div class="inner">
        <img src="../../assets/common/tip_badge.svg" />
        <div class="text">我的订单</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import MarketHeroItem from "./market_hero_item.vue";
import CommonPackFilter from "../../components/common_pack_filter";
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
    CommonPackFilter,
    CommonSearch,
    CommonPageHeader,
    CommonPageFooter,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      pageTitle: "卡牌市场",
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
      await getList();
      getCurShowItems();
      data.loading = false;
    });
    const getList = async () => {
      try {
        const c = store.state.c_exchange;
        const res = await c.methods
          .getExchangeList("0x0000000000000000000000000000000000000000")
          .call();
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
      } catch (e) {
        console.log(e);
        proxy.$toast("获取市场失败", store.state.toast_error);
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
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/market/bg.png");
  .tip_badge {
    cursor: pointer;
    position: absolute;
    bottom: 8rem;
    left: 0;
    .inner {
      position: relative;
      img {
        width: 10rem;
        opacity: 1;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
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
    height: 23rem;
    display: flex;
    align-items: center;
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
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
