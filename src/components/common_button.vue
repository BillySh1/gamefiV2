<template>
  <div ref="btn" :class="disabled ? 'btn_box disable' : 'btn_box'">
    <slot></slot>
  </div>
</template>

<script >
import { onMounted, ref } from "vue";
export default {
  name: "comon_button",
  props: ["disabled", "circle"],
  setup(prop) {
    const btn = ref(null);
    onMounted(() => {
      if (prop.circle) {
        btn.value.style.background = `url(http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/circle_btn.png) no-repeat`;
        btn.value.style.backgroundSize = "100% 100%";
      }
    });
    return {
      btn,
    };
  },
};
</script>
<style lang="less" scoped>
.btn_box {
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  position: relative;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: url("http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/active_tab.png")
    no-repeat;
  background-size: 100% 100%;
  font-size: 1.2rem;
}
.disable {
  pointer-events: none;
  filter: grayscale(100);
}
</style>
