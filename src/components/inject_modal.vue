<template>
  <div v-if="value" class="mask" @click="$emit('close')">
    <div
      class="inner"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
    >
      <img
        class="close"
        src="../assets/common/close.svg"
        alt=""
        @click="(e)=>{
          e.stopPropagation()
          $emit('close')
        }"
      />

      <img class="bg" src="../assets/common/modal_bg.png" alt="" />
      <div class="title">{{ title }}</div>
      <div class="content">
        <slot></slot>
      </div>
      <div
        :class="btnDisable ? 'confirm disbale' : 'confirm'"
        @click="$emit('confirm')"
      >
        <div class="confirm_inner">
          <img src="../assets/common/modal_confirm_bg.svg" alt="" />
          <div class="text">{{ btnText || "确认" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "inject_modal",
  props: ["value", "title", "btnText", "btnDisable"],
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70rem;
  color: white;
  .close {
    position: absolute;
    cursor: pointer;
    top: 0%;
    right: 0%;
    transform: translate(50%, -50%);
    width: 1.5rem;
  }
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
    font-size: 2.5rem;
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
  .disbale {
    pointer-events: none;
    user-select: none;
    filter: grayscale(100);
  }
  .content {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
