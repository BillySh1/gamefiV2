<template>
  <div class="container">
    <CommonPageHeader />
    <InjectGoBack v-if="!showValue" />
    <div v-if="showValue" class="res_inner">
      <div class="main">
        <img
          @click="() => (showValue = false)"
          class="close"
          src="../../assets/common/close.svg"
          alt=""
        />
        <div class="info">
          关键词 {{ value }}, 找到
          {{ curItems && curItems.length > 0 ? curItems.length : 0 }} 个结果
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
            <img src="../../assets/store/left.png" alt="" />
          </div>
          <div class="empty" v-if="!curItems.length">暂无武将</div>
          <div
            v-for="(item, index) in curItems"
            :key="index"
            class="card_item"
            @click="() => clickItem(item)"
          >
            <MarketHeroItem v-if="$route.query.type == 1" :info="item" />
            <PackHeroItem v-else :info="item" />
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
            <img src="../../assets/store/right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="inner">
      <div class="search_box">
        <input
          class="input"
          placeholder="请输入英雄名称搜索"
          v-model="value"
          @keyup.enter="onSearch"
          type="text"
        />
        <img
          @click="onSearch()"
          style="width: 2rem"
          src="../../assets/pack/search.svg"
          alt=""
        />
      </div>
    </div>

    <CommonPageFooter />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import CommonPageHeader from "../../components/common_page_header.vue";
import CommonPageFooter from "../../components/common_page_footer.vue";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
import PackHeroItem from "../../components/pack_hero_item.vue";
import MarketHeroItem from "../market/market_hero_item.vue";
import useHeroDetail from "../../utils/useHeroDetail";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "serach",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
    PackHeroItem,
    MarketHeroItem,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      value: "",
      showValue: false,
      curItems: [],
      curPage: 1,
      rawData: [],
      resData: [],
      total: 0,
      account: "",
      web3: "",
    });
    const getCurShowItems = () => {
      data.total = Math.ceil(data.resData.length / 4);
      data.curItems = [];
      const curPage = data.curPage;
      const rawData = data.resData;
      const startIndex = (curPage - 1) * 4;
      const endIndex =
        curPage * 4 > rawData.length ? rawData.length - 1 : curPage * 4 - 1;
      data.curItems = rawData.slice(startIndex, endIndex + 1);
    };
    const onSearch = () => {
      data.resData = data.rawData.filter((item) => {
        return item.name == data.value;
      });
      getCurShowItems();
      data.showValue = true;
    };
    const clickItem = (item) => {
      const type = route.query.type;
      if (type == 0) {
        router.push({
          name: "heroDetail",
          query: {
            tokenId: item.tokenId,
          },
        });
      } else if (type == 1) {
        router.push({
          name: "orderDetail",
          query: { tokenId: item.tokenId },
        });
      }
    };
    const getRawData = async () => {
      const type = route.query.type || 0;
      try {
        const c = type == 1 ? store.state.c_exchange : store.state.c_hero;
        const res =
          type == 1
            ? await c.methods
                .getExchangeList("0x0000000000000000000000000000000000000000")
                .call()
            : await c.methods.cardList(data.account).call();
        data.rawData = [];
        if (type == 1) {
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
        } else {
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
        }
      } catch (e) {
        console.log(e);
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
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
      await getRawData();
    });
    const refData = toRefs(data);
    return {
      ...refData,
      getCurShowItems,
      onSearch,
      clickItem,
    };
  },
};
</script>
<style lang='less' scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/pack/pack_hero_bg.svg") no-repeat;
  background-size: cover;
}
.res_inner {
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 40rem;
  z-index: 20;
  .main {
    position: relative;
    width: 100%;
    padding-top: 5rem;
    .close {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      position: absolute;
      top: 5%;
      left: 5%;
      width: 2rem;
    }
    .info {
      white-space: nowrap;
      font-size: 2rem;
      color: white;
      margin-bottom: 2rem;
    }

    .card_content {
      position: relative;
      height: 25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .left {
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translate(0%, -50%);
        cursor: pointer;
        width: 2rem;
        img {
          width: 100%;
        }
      }
      .right {
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(0, -50%);
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
        width: 16vmax;
      }
    }
  }
}
.inner {
  position: absolute;
  top: 30%;
  left: 50%;
  width: 50rem;
  transform: translateX(-50%);
  .search_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:hover {
      opacity: 1;
    }
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-sizing: border-box;
    border-radius: 200px;
    display: flex;
    align-items: center;
    opacity: 0.6;
    img {
      cursor: pointer;
    }
    .input {
      margin-left: 1rem;
      font-size: 1.5rem;
      width: 80%;
      background: transparent;
      border: none;
      outline: none;
      color: white;
    }
  }
}
</style>