<template>
  <div class="container">
    <CommonPageHeader />
    22
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
export default {
    name: 'mint',
    components:{
      CommonPageHeader,
      CommonPageFooter
    },
      setup() {
          const data = reactive({
          })
          onBeforeMount(() => {
          })
          onMounted(() => {
          })
          return {
              ...toRefs(data),
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
</style>
