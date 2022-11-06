<template>
  <div class="com_box">
      skill
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
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
.com_box{
    width: 100%;
    height: 100%;
}
</style>