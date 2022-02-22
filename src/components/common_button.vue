<template>
  <div class="btn_box">
    <slot></slot>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
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
<style lang="less" scoped>
.btn_box {
  position: relative;
  width: fit-content;
  padding: 1rem 1.5rem;
  background: linear-gradient(
    180deg,
    rgba(95, 26, 26, 0.05) 0%,
    rgba(62, 18, 18, 0.05) 100%
  );
  border: 2px solid #a98461;
  border-radius: 10px;
  font-size: 1.5rem;
}
</style>
