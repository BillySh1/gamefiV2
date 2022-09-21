<template>
  <div class="back_box" @click="back">
      <img src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/back.svg" >
  </div>
</template>

<script >
import { reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
export default {
    name: 'inject_go_back',
    props:['custom'],
      setup(prop,ctx) {
          const router = useRouter()
          const data = reactive({

          })
          const back = ()=>{
              if(prop.custom){
                  ctx.emit('back')
                  return
              }
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
    width: 3rem;
    z-index: 2;
    cursor: pointer;
    &:hover{
        opacity: .7;
    }
    img{
        width: 100%;
    }
}
</style>