<template>
  <div v-if="value" class="mask" @click="() => $emit('close')">
    <div
      class="inner"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <div class="innerContent">
        <CommonButton class="title">{{ t("generate_invite") }}</CommonButton>
        <div class="data">
          {{ data }}
        </div>
        <div class="btn" @click="copy">
          <img
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/button_round.png"
            alt=""
          />
          <div class="text">{{ t("copy") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import CommonButton from "../../components/common_button.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "invite_modal",
  props: ["value", "data"],
  components: {
    CommonButton,
  },
  setup(prop, ctx) {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({});

    const copy = (e) => {
      e.stopPropagation();
      const aux = document.createElement("input");
      aux.setAttribute("value", prop.data);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      proxy.$toast(t("common_tip_success"), store.state.toast_success);
      ctx.emit("close");
    };
    const refData = toRefs(data);
    return {
      t,
      ...refData,
      copy,
    };
  },
};
</script>
<style lang='less' scoped>
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
  min-width: 30rem;
  background: linear-gradient(180deg, rgba(41, 22, 22, 0.54) 0%, #291616 100%);
  border-radius: 20px;
  border: 1px solid #765b34;
  border-image-source: linear-gradient(180deg, #765b34 0%, #825f2c 100%);
  .innerContent {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 4rem;
    .title {
      user-select: none;
      pointer-events: none;
      width: 30%;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.5rem;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
    }
    .data {
      word-break: break-all;
      text-align: left;
      max-width: 80%;
      padding: 1rem 2rem;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.6);
    }
    .btn {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      position: relative;
      width: 25%;
      margin: 2rem 0;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
      }
    }
  }
}
</style>