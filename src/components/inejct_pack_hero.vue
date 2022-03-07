<template>
  <div v-if="showFilter" class="mask" @click="showFilter = false" >
    <InjectGoBack :custom="true" @back="() => (showFilter = false)" />
    <div class="box">
      <div
        class="filter_item"
        @click="
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerFilter(null);
          }
        "
      >
        <div class="left">重置</div>
      </div>
      <div v-for="(item, index) in filters" :key="index" class="filter_item">
        <div class="left">
          {{ item.name }}
        </div>
        <div class="right">
          <div
            class="item"
            v-for="(i, idx) in item.items"
            :key="i.key"
            @click="(e) => {
              e.stopPropagation()
              triggerFilter(index, idx)
            }"
          >
            <img v-if="item.key != 'preference'" :src="i.img" alt="" />
            <div v-else class="text">{{ i.name }}</div>
            <div class="selected" v-if="item.selected == i.key">
              <img src="../assets/pack/filter/selected.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
          <div class="text">筛选</div>
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
import CommonSearch from "./common_search";
import initWeb3 from "../utils/initWeb3.js";
import useHeroDetail from "../utils/useHeroDetail.js";
import InjectGoBack from "./inject_go_back.vue";
export default {
  name: "inject_pack_hero",
  props: ["value", "toSelect"],
  components: {
    PackHeroItem,
    CommonSearch,
    InjectGoBack,
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
      filteredData: [],
      filters: [
        {
          name: "稀有度",
          key: "rarity",
          selected: null,
          items: [
            {
              key: 0,
              img: require("../assets/pack/filter/rarity/0.png"),
            },
            {
              key: 1,
              img: require("../assets/pack/filter/rarity/1.png"),
            },
            {
              key: 2,
              img: require("../assets/pack/filter/rarity/2.png"),
            },
            {
              key: 3,
              img: require("../assets/pack/filter/rarity/3.png"),
            },
            {
              key: 4,
              img: require("../assets/pack/filter/rarity/4.png"),
            },
          ],
        },
        {
          name: "阵营",
          key: "camp",
          selected: null,
          items: [
            {
              key: 0,
              img: require("../assets/pack/filter/camp/0.png"),
            },
            {
              key: 1,
              img: require("../assets/pack/filter/camp/1.png"),
            },
            {
              key: 2,
              img: require("../assets/pack/filter/camp/2.png"),
            },
            {
              key: 3,
              img: require("../assets/pack/filter/camp/3.png"),
            },
          ],
        },
        {
          name: "品级",
          key: "quality",
          selected: null,
          items: [
            {
              key: 0,
              img: require("../assets/pack/filter/quality/0.png"),
            },
            {
              key: 1,
              img: require("../assets/pack/filter/quality/1.png"),
            },
            {
              key: 2,
              img: require("../assets/pack/filter/quality/2.png"),
            },
            {
              key: 3,
              img: require("../assets/pack/filter/quality/3.png"),
            },
          ],
        },
        {
          name: "职业",
          key: "preference",
          selected: null,
          items: [
            {
              key: 0,
              name: "盾",
            },
            {
              key: 1,
              name: "战",
            },
            {
              key: 2,
              name: "谋",
            },
            {
              key: 3,
              name: "刺",
            },
            {
              key: 4,
              name: "辅",
            },
          ],
        },
      ],
    });
    const getCurShowItems = () => {
      data.total = Math.ceil(data.filteredData.length / 4);
      data.curItems = [];
      const curPage = data.curPage;
      const rawData = data.filteredData;
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
    const triggerFilter = async (index, idx) => {
      data.curPage = 1;
      if (!index && !idx && index !== 0) {
        data.filters.map((i) => (i.selected = null));
        data.filteredData = JSON.parse(JSON.stringify(data.rawData));
        getCurShowItems();
        return;
      }
      const cur = data.filters[index];
      cur.selected = cur.items[idx].key;
      const temp = [];
      data.rawData.map((item) => {
        let res = 1;
        for (let i = 0; i < data.filters.length; i++) {
          const _f = data.filters[i];
          if (_f.selected !== null) {
            if (item[_f.key] != _f.selected) {
              res = 0;
            }
          }
        }
        if (res == 1) {
          temp.push(item);
        }
      });
      data.filteredData = temp;
      getCurShowItems();
    };
    const filterTab = (item) => {
      data.curTab = item.key;
      const _v = ["power", "quality", "rarity"][item.key];
      data.filteredData.sort((a, b) => {
        return Number(b[_v]) - Number(a[_v]);
      });
      getCurShowItems();
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
        data.filteredData = JSON.parse(JSON.stringify(data.rawData));
        data.total = Math.ceil(data.filteredData.length / 4);
      } catch (e) {
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getCurShowItems,
      filterTab,
      triggerFilter,
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
      &:hover {
        opacity: 1;
      }
      opacity: 0.6;
      cursor: pointer;
      padding: 0.5rem 1.5rem;
      background: linear-gradient(
        89.54deg,
        rgba(102, 99, 29, 0.5) -138.99%,
        rgba(0, 0, 0, 0.5) -54.05%,
        rgba(162, 95, 33, 0.5) 19.67%,
        rgba(131, 43, 20, 0.5) 98.2%,
        rgba(255, 101, 101, 0.5) 168.72%
      );
      border-radius: 99px;
      border: 1px solid #3e3002;
      .text {
        font-size: 1.5rem;
      }
    }
    .search_box{
      cursor: pointer;
      transform: translateX(-5rem);
    }
  }
  .content {
    margin: 1rem 0;
    background: rgba(0, 0, 0, 0.5);
    height: 26rem;
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
      min-width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      transform: translateX(7%);
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
        width: 16vmax;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .box {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    .filter_item {
      user-select: none;
      cursor: pointer;
      width: fit-content;
      height: 3rem;
      display: flex;
      margin: 2rem 0;
      padding: 4px;
      border-radius: 200px;
      background: rgba(0, 0, 0, 0.8);
      .border {
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      .left {
        width: 8rem;
        font-size: 1.5rem;
        line-height: 3rem;
        height: 100%;
        background: rgba(101, 31, 31);
        border: 1px solid rgba(255, 255, 255, 0.13);
        box-sizing: border-box;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 200px;
        white-space: nowrap;
        margin-right: 1rem;
      }
      .right {
        display: flex;
        align-items: center;
        .item {
          position: relative;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
          height: 3rem;
          margin: 0 8px;
          img {
            height: 100%;
          }
          .text {
            font-size: 1.5rem;
            margin: 0 1rem;
            line-height: 3rem;
          }
          .selected {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 150%);
            width: 1rem;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
