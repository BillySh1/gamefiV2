<template>
  <div>222</div>
</template>

<script>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'stk_detail',
      setup() {
          const data = reactive({

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
<style lang='less' scoped>
</style>