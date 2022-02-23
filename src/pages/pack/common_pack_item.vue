<template>
  <div class="box">
    <img :src="info.img" />
    <div class="name">{{ info.name }}</div>
    <div class="num">{{ info.num }}</div>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'common_pack_item',
    props:['info'],
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
.box {
  position: relative;
  width: 100%;
  height: 100%;
  img{
      width: 100%;
      height: 100%;
  }
  .num{
      position: absolute;
      right: 0.5rem;
      top: 0;
      font-size: 1.5rem;
  }
  .name{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%,1rem);
    
      font-size: 1.2rem;
      white-space: nowrap;
  }
}
</style>