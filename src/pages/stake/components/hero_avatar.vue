<template>
  <div class="hero_avatar_item">
    <img class="avatar" :src="item.avatar" alt="">
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'hero_avatar',
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
.hero_avatar_item{
    position: relative;
    .avatar{
        width: 100%;
        height: 100%;
    }
}
</style>