<template>
  <div class="box">
    <StkBtn
    class="top_left"
      :text="'返回'"
      @click="
        () =>
          $router.push({
            name: 'stk_main',
          })
      "
    />
  </div>
  <div class="center">维护中</div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import StkBtn from './components/stk_btn'
export default {
    name: 'staked_view',
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
<style scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/staked_view/stk_view.png") no-repeat;
  background-size: 100% 100%;
}
.top_left{
  position: absolute;
  left: 3%;
  top: 3%;
}
.center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 1.5rem;
}
</style>