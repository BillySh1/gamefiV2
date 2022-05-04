<template>
  <div class="box"></div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'main',
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
.box{
    width: 100%;
    height: 100%;
    background: url('../../all_stars/cliam/main.vue') no-repeat;
    background-size: 100% 100%;
}
</style>