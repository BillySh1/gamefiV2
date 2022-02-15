<template>
  <div class="container">
    <CommonPageHeader />
    <div class="content">sss</div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount} from 'vue'
import {useRoute} from 'vue-router'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
export default {
    name: 'mint_detail',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {
        const route = useRoute();
          const data = reactive({
            type: 0,
          })
          onBeforeMount(() => {
            data.type = route.query.type;
          })

          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang="less" scoped></style>
