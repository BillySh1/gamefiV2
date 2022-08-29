<template>
  <div class="stk_btn">
    <img src="../../../assets/stake/stk_btn_bg.png" alt="" />
    <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'stk_btn',
    props:['text'],
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
.stk_btn {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: relative;
  width: 15rem;
  color: white;
  img {
    width: 100%;
  }
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>