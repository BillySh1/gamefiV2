<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <Lottie v-if="loading" :options="lottie_options" />
      <div v-else class="main">
        <div class="title">恭喜您获得了</div>
        <div class="up_box">
          <div :style="getRarityStyle">{{ curInfo.name }}</div>
          <div :style="getQualityStyle">{{ curQuality }}品质</div>
        </div>
        <div class="card">
          <HeroCardItem :info="curInfo" />
        </div>
        <div class="bottom">
          <div class="btn">下一张</div>
          <div class="btn">显示全部</div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import CommonPageFooter from "../../components/common_page_footer";
import CommonPageHeader from "../../components/common_page_header";
import initWeb3 from "../../utils/initWeb3.js";
import HeroCardItem from "../../components/hero_card_item.vue";
import useHeroDetail from "../../utils/useHeroDetail";
export default {
  name: "minging",
  components: {
    CommonPageFooter,
    CommonPageHeader,
    HeroCardItem,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      jsonData: "",
      pageTitle: "招贤纳士",
      cardList: [],
      newMintedItems: [],
      curIndex: 0,
      loading: false,
      account: "",
      web3: "",
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/common/loading.json`),
      };
    });
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
      await getCardList();
      console.log(curInfo, "fff");
      data.loading = false;
    });
    const curInfo = computed(() => {
      return data.newMintedItems[data.curIndex];
    });

    const getCardList = async () => {
      try {
        data.curIndex = 0;
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        res.map((x) => {
          data.cardList.push({
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
          });
        });
        const before = JSON.parse(sessionStorage.getItem("before_pack")).map(
          (x) => x.tokenId
        );
        const newList = data.cardList.map((x) => x.tokenId);
        const newCards = newList.filter((item) => {
          if (!before.includes(item)) return item;
        });
        newCards.map((item) => {
          const res = data.cardList.find((i) => {
            return item === i.tokenId;
          });
          const uid =
            res.camp.toString() + res.rarity.toString() + res.heroId.toString();
          data.newMintedItems.push({
            ...res,
            uid,
            ...useHeroDetail(uid, res.preference),
          });
        });
      } catch (e) {
        console.log(e);
      }
    };
    const curQuality = computed(() => {
      return ["普通", "优秀", "史诗", "传说"][curInfo.value.quality];
    });
    const refData = toRefs(data);
    return {
      ...refData,
      lottie_options,
      curInfo,
      curQuality,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    .title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .up_box {
      display: flex;
      font-size: 3rem;
      gap: 2rem;
    }
    .bottom {
      font-size: 2.5rem;
    }
    .card {
      margin: 1vmin 0;
      width: 15rem;
    }
  }
}
</style>
