<template>
  <div class="hero_detail_box">
    <CommonPageHeader :title="pageTitle" />
    <div></div>
    <div class="inner">
      {{ tokenId }}
    </div>
    <CommonPageFooter />
    <img class="bg_badge" src="../../assets/pack/bg_badge.svg" />
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount} from 'vue'
import CommonPageHeader from '../../components/common_page_header';
import CommonPageFooter from '../../components/common_page_footer'
import {useRoute} from 'vue-router'
export default {
    name: 'hero_detail',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {
          const route = useRoute();
          const data = reactive({
              tokenId: 0,
              pageTitle:'卡牌详情'
          })
          onBeforeMount(() => {
              data.tokenId = route.query.tokenId || 0
          })
          
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