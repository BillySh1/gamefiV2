<template>
  <div class="container">
      <IndexHeader/>
      <IndexFooter/>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import IndexHeader from '../../components/index_header'
import IndexFooter from '../../components/index_footer'
export default {
    name: 'home',
    components:{
        IndexHeader,
        IndexFooter
    },
      setup() {
          console.log('1-开始创建组件-setup')
          const data = reactive({

          })
          onBeforeMount(() => {
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang='less' scoped>
.container{
    width: 100%;
    height: 100%;
    background: url('../../assets/index/home_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>