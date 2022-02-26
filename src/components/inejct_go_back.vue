<template>
  <div class="back_box" @click="back">
      <img src="../assets/common/back.svg" >
  </div>
</template>

<script >
import { reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name: 'inject_go_back',
      setup() {
          const router = useRouter()
          const data = reactive({

          })
          const back = ()=>{
              router.go(-1)
          }
          const refData = toRefs(data);
          return {
              ...refData,
              back
          }

      }
  };
</script>
<style lang='less' scoped>
.back_box{
    position: fixed;
    top: 10%;
    left: 4%;
    width: 4rem;
    cursor: pointer;
    &:hover{
        opacity: .7;
    }
}
</style>