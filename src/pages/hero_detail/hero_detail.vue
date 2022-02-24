<template>
  <div class="hero_detail_box">
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />
    <div class="inner">
      {{ tokenId }}
    </div>
    <CommonPageFooter />
    <img class="bg_badge" src="../../assets/pack/bg_badge.svg" />
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import CommonPageHeader from '../../components/common_page_header';
import CommonPageFooter from '../../components/common_page_footer'
import {useRoute} from 'vue-router'
import initWeb3 from '../../utils/initWeb3.js'
import useHeroDetail from '../../utils/useHeroDetail.js'
export default {
    name: 'hero_detail',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {
          const route = useRoute();
          const store = useStore()
          const data = reactive({
              tokenId: 0,
              info:'',
              pageTitle:'卡牌详情',
              loading: false,
              lottie_options:{
                  animationData:require('../../assets/common/loading.json')
              }
          })
          onBeforeMount(async () => {
              data.tokenId = route.query.tokenId || 0;
              data.loading = true;
            await initWeb3.Init(
              (addr)=>{
                data.account = addr
              },
              (p)=>{
                data.web3 = p
              }
            );
            await getTokenInfo();
            data.loading = false;
          })
             const getTokenInfo = async()=>{
                 const c = store.state.c_hero
                 const res = await c.methods.getHero(data.tokenId).call();
                 const uid = res.camp.toString() + res.rarity.toString()+ res.heroId.toString()
                 data.info = {...res,...useHeroDetail(uid), uid: uid}
             }
          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang='less' scoped>
.hero_detail_box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/hero_detail/hero_detail_bg.png");
  background-size: cover;
  .bg_badge {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 2;
    opacity: 0.8;
  }
  .inner {
    position: absolute;
    width: 85rem;
    height: 35rem;
    background: rgba(123, 23, 54, 0.5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
}
</style>