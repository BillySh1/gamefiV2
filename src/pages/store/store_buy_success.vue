<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <img class="bg" src="../../assets/store/success_bg.svg" alt="" />
      <img class="item" :src="info.img" alt="" />
      <div class="text" >
          购买成功
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,computed} from 'vue'
import {useRoute} from 'vue-router'
import CommonPageFooter from '../../components/common_page_footer'
import CommonPageHeader from '../../components/common_page_header'
import {useGetShopDetailByTokenId} from './use_shop_items.js'
export default {
    name: 'minging',
    components:{
        CommonPageFooter,
        CommonPageHeader
    },
      setup() {
          const route = useRoute()
          const data = reactive({
              info:'',
              jsonData:'',
              pageTitle:'招贤纳士'

          });
        const lottie_options = computed(()=>{
            return  {
                  animationData: require(`../../assets/mint/type${data.info.key}.json`),
              }
        })
          onBeforeMount(() => {
              data.info = useGetShopDetailByTokenId(route.query.info)
          })

          const refData = toRefs(data);
          return {
              ...refData,
              lottie_options
          }

      }
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .bg {
    width: 35rem;
    animation: spin 3s ease-in-out infinite;
  }
  .item {
    width: 20rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
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
  .text{
    transform: translateY(-5rem);
    font-size: 2rem;
  }
}
</style>
