<template>
  <div class="events_mask" v-if="value" @click="() => $emit('close')">
    <img
      style="width: 100%"
      src="../../../allstar_assets/popups/light_bg.png"
      alt=""
    />
    <img
      @click="() => $emit('close')"
      class="close"
      src="../../../allstar_assets/popups/close.svg"
      alt=""
    />
    <div
      class="content"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
    >
      <div class="inner">
        <img src="../../../allstar_assets/stake/road/scroll_bg.png" alt="" />
        <div class="main">
          <div class="title">故事情节</div>
          <div class="bottom">
            <div class="img_box">
              <img src="../../../allstar_assets/popups/img_bg.png" alt="" />
            </div>
            <div class="intro">
              故事细节的占位故事细节的占位故事细节的占位故事细节的占位故事细节的占位故事细节的占位故事细节的占位故事细
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirm" @click="onConfirm">
      <div class="inner">
        <img src="../../../allstar_assets/popups/confirm_bg.png" alt="" />
        <div class="text">确认</div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "random_events",
  props: ["value"],
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {});
    const onConfirm = () => {
      console.log("confirm");
    };
    const refData = toRefs(data);
    return {
      ...refData,
      onConfirm,
    };
  },
};
</script>
<style lang='less' scoped>
.events_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close {
  cursor: pointer;
  position: absolute;
  left: 10%;
  top: 10%;
  width: 3rem;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 55rem;
  height: unset;

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
    .main {
      width: 70%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .title {
        width: 100%;
        text-align: center;
        padding: 1rem 0;
        box-sizing: border-box;
        font-size: 2rem;
        margin-bottom: 2rem;
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .img_box {
          width: 40%;
          img {
            width: 100%;
          }
        }
        .intro {
          width: 50%;
          font-size: 1.5rem;
        }
      }
    }
  }
}
.confirm {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 10rem;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
    }
  }
}
</style>