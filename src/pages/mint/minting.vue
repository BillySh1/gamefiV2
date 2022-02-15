<template>
  <div class="container">
    <CommonPageHeader />
    <div class="content">
      <Lottie :options="lottie_optins" />
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import CommonPageFooter from '../../components/common_page_footer'
import CommonPageHeader from '../../components/common_page_header'
export default {
    name: 'minging',
    components:{
        CommonPageFooter,
        CommonPageHeader
    },
      setup() {
          const data = reactive({
              lottie_optins:{
                  animationData: require('../../assets/mint/type0.json')
              }
          })
          onBeforeMount(() => {
          })
          onMounted(() => {
          })
          const refData = toRefs(data);
          return {
              ...refData,
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
