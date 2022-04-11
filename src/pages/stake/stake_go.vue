<template>
  <div class="box">22222</div>
</template>

<script>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'stake_go',
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
    background: url('../../assets/stake/stake/stake_bg.png') no-repeat;
    background-size: 100% 100%;
}
</style>