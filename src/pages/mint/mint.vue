<template>
  <lottie width="80%" height="80%" :options="defaultOptions" />
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
      setup() {

          const data = reactive({
            defaultOptions:{
              animationData: require('../../assets/mint/type0.json')
            }
          })
          onBeforeMount(() => {
          })
          onMounted(() => {
            console.log(window,'ff')
          })
          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang="less" scoped></style>
