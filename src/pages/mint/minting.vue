<template>
  <div class="container">
    <CommonPageHeader />
    <div class="content">
      <Lottie :options="lottie_options" />
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted,computed} from 'vue'
import {useRoute} from 'vue-router'
import CommonPageFooter from '../../components/common_page_footer'
import CommonPageHeader from '../../components/common_page_header'
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

          });
        const lottie_options = computed(()=>{
            return  {
                  animationData: require(`../../assets/mint/type${data.info.key}.json`),
              }
        })
          onBeforeMount(() => {
              data.info = JSON.parse(route.query.info)
          })
          onMounted(() => {
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
  align-items: center;
  justify-content: center;
}
</style>
