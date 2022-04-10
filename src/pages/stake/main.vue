<template>
  <div class="box">
      <StkBtn class="check_map" :text="'查看地图'" />
  </div>
</template>

<script>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import StkBtn from './components/stk_btn.vue'
export default {
    name: 'stk_main',
    components:{
        StkBtn
    },
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
    position: relative;
    background: url('../../assets/stake/detail/story_bg.png') no-repeat;
    background-size: 100% 100%;
}
.check_map{
    position: absolute;
    top: 5%;
    left: 5%;
    
}
</style>