<template>
  <div class="back_c" >
      <img style="width:2rem" src="../../assets/stake/back_d.png" alt="">
      <div style="margin:0 1.5rem">返回主页</div>
      <img style="width: 6rem" src="../../assets/stake/cloud.png" alt="">
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'bch',
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
.back_c{
    cursor: pointer;
    position: fixed;
    bottom: 5%;
    left: 5%;
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
}
</style>