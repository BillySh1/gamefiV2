<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">title</div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount} from 'vue'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
export default {
    name: 'store',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {

          const data = reactive({
            pageTitle:'我的称号'
          })

          onBeforeMount(() => {
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
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
