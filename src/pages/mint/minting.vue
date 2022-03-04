<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <img
      v-if="!loading"
      class="light"
      src="../../assets/store/success_bg.png"
      alt=""
    />
    <div class="content">
      <Lottie v-if="loading" :options="lottie_options" />
      <div v-else class="main">
        <div class="title">恭喜您获得了</div>
        <div class="up_box">
          <div :style="`color:${getRarityStyle};margin-right:1rem`">
            {{ curInfo.name }}
          </div>
          <div>
            <span :style="`color:${getQualityStyle}`">{{ curQuality }}</span>
            品质
          </div>
        </div>
        <div class="card">
          <HeroCardItem :info="curInfo" />
        </div>
        <div class="bottom">
          <CommonButton
            v-if="newMintedItems.length > 1 && curIndex > 0"
            @click="() => curIndex--"
            class="btn"
            >上一张</CommonButton
          >
          <CommonButton
            v-if="
              newMintedItems.length > 1 && curIndex < newMintedItems.length - 1
            "
            @click="() => curIndex++"
            class="btn"
            >下一张</CommonButton
          >
          <CommonButton
            class="btn"
            @click="
              () =>
                $router.push({
                  name: 'pack',
                  query: {
                    type: 0,
                  },
                })
            "
            >放入背包</CommonButton
          >
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import CommonPageFooter from "../../components/common_page_footer";
import CommonPageHeader from "../../components/common_page_header";
import initWeb3 from "../../utils/initWeb3.js";
import HeroCardItem from "../../components/hero_card_item.vue";
import useHeroDetail from "../../utils/useHeroDetail";
import CommonButton from "../../components/common_button.vue";
export default {
  name: "minging",
  components: {
    CommonPageFooter,
    CommonPageHeader,
    HeroCardItem,
    CommonButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
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
      if (route.query && route.query.tokenId) {
        await getNewHero();
      }
      await getCardList();
      data.loading = false;
    });
    const curInfo = computed(() => {
      return data.newMintedItems[data.curIndex];
    });
    const getRarityStyle = computed(() => {
      return ["white", "blue", "purple", "orange", "gold"][
        curInfo.value.rarity
      ];
    });
    const getQualityStyle = computed(() => {
      return ["white", "blue", "purple", "orange"][curInfo.value.quality];
    });
    const getNewHero = async () => {
      try {
        data.curIndex = 0;
        const c = store.state.c_hero;
        const res = await c.methods.getHero(route.query.tokenId).call();
        const uid =
          res.camp.toString() + res.rarity.toString() + res.heroId.toString();
        data.newMintedItems.push({
          ...res,
          uid,
          ...useHeroDetail(uid, res.preference),
        });
      } catch (e) {
        console.log(e);
      }
    };
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
      getRarityStyle,
      getQualityStyle,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .light {
    width: 35rem;
    animation: spin 3s ease-in-out infinite;
  }
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 2rem;
    }
    .up_box {
      display: flex;
      font-size: 2rem;
      margin: 1.5rem 0;
    }
    .bottom {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      margin-top: 1.5rem;
      .btn {
        cursor: pointer;
        margin-right: 1rem;
      }
    }
    .card {
      width: 15rem;
      height: 18rem;
    }
  }
}
</style>
