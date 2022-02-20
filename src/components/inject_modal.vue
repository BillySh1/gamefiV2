<template>
  <div v-if="value" class="mask" @click="$emit('close')" >
    <img class="close" src="../assets/common/close.svg" alt="" />
    <div class="inner">
      <img class="bg" src="../assets/common/modal_bg.svg" alt="" />
      <div class="title">{{ title }}</div>
        <div class="content" >
            <slot></slot>
        </div>
      <div class="confirm">
        <div class="confirm_inner">
          <img src="../assets/common/modal_confirm_bg.svg" alt="" />
          <div class="text">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'inject_modal',
    props:['value','title'],
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
.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
.close {
  position: absolute;
  cursor: pointer;
  top: 7rem;
  left: 5rem;
  width: 1.5rem;
}
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70rem;
  color: white;
  .bg {
    width: 100%;
  }
  .title {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-55%);
    font-size: 3rem;
  }
  .confirm {
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translate(-55%, 25%);
    bottom: 0;
    font-size: 3rem;
    .confirm_inner {
      position: relative;
      img {
        width: 15rem;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .content{
      position: absolute;
      max-width: 80%;
      margin: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
  }
}
</style>
