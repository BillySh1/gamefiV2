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
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/close.svg"
        alt=""
        @click="
          (e) => {
            e.stopPropagation();
            $emit('close');
          }
        "
      />

      <img
        class="bg"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/modal_bg.png"
        alt=""
      />
      <div class="title">战斗日志</div>
      <div class="content">2222</div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted,watch } from "vue";
export default {
  name: "inject_modal",
  props: ["value", "title", "btnText", "btnDisable"],
  setup(prop) {
    const data = reactive({});
    watch(
        ()=> prop.value,
        async()=>{
           await getRemoteData(0)
        }
    )
    const getRemoteData = async ()=>{
        console.log('gggg')
    }
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
