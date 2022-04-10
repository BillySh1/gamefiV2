<template>
  <div class="box">
    <BackToHome
      @click="
        () => {
          $router.push({
            name: 'home',
          });
        }
      "
    />
    <div class="help_text">请选择 {{ curPlace }} 开始挑战</div>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import BackToHome from './back_to_home'
export default {
    name: 'entry',
    components:{
      BackToHome
    },
      setup() {
          const data = reactive({
            curPlace:'浮育',
            citys:[
              {key:1,name:'浮育',size:0,x: 10,y:20},
              {key:2,name:'逾城',size:0,x:15,y:25},
              {key:3,name:'泗水',size:1,x:16, y:25},
              {key:4,name:'霓昂',size:1,x:16, y:25},
              {key:5,name:'凝关',size:1,x:16, y:25},
              {key:6,name:'泊寨',size:0,x:16, y:25}
            ]
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
  background: url("../../assets/stake/map_entry.png") no-repeat;
  background-size: 100% 100%;
}
.help_text {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: white;
}
</style>