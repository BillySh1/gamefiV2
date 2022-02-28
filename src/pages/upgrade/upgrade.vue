<template>
  <div class="container">
       <CommonPageHeader :title="pageTitle" />
    <Lottie
      v-if="loading"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <div v-if="!loading" class="content">
      <div class="hero_card_big">
        <HeroCardItem :info="info" />
      </div>
    </div>
    <CommonPageFooter />
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
import CommonPageHeader from '../../components/common_page_header.vue'
import CommonPageFooter from '../../components/common_page_footer.vue'
export default {
  name: "upgrade",
  components: {
    HeroCardItem,
    CommonPageHeader,
    CommonPageFooter
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      info: "",
      account: "",
      web3: "",
      loading: false,
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
    };
    onBeforeMount(async () => {
      data.loading = true;
      await getWeb3();
      await getHeroInfo();
      data.loading = false;
    });

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  background: #2C0707;
  .bg_badge {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 2;
    opacity: 0.8;
  }
}
.content {
  position: absolute;
  width: 85rem;
  height: 35rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .hero_card_big {
    width: 25%;
    height: 100%;
  }
}
</style>