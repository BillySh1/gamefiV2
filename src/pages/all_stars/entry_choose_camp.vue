<template>
  <div class="box">
      <img class="bg" src="../../allstar_assets/all_stars/entry/choose_camp.png" alt="">
  </div>
</template>

<script>
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
.box{
    position: relative;
    width: 100%;
    height: 100%;
    background: black;
    .bg{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>