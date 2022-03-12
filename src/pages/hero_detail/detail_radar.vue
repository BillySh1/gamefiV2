<template>
  <div class="c_box">
    <canvas id="radar"></canvas>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onMounted,ref} from 'vue'
import init from './useRadarCanvas.js'
export default {
    name: 'detail_radar',
    props:['data'],
      setup(prop) {
          const radar = ref(null)
          const data = reactive({
          })
          onMounted(() => {
            //   const sum = prop.data.value.reduce((pre,cur)=>{
                
            //   })
              console.log(prop.data)
              init()
          })

          const refData = toRefs(data);
          return {
              ...refData,
              radar
          }

      }
  };
</script>
<style lang='less' scoped>
.c_box {
  width: 100%;
  height: 100%;
}
</style>