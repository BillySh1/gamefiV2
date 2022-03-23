<template>
  <div class="detail_container" v-if="value" @click="() => $emit('close')">
    <div
      class="main"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <div class="status">
        <img src="../../../allstar_assets/main/pack/active.png" alt="" />
      </div>
      <img src="../../../allstar_assets/main/pack/pack_bg.png" alt="" />
      <div class="inner">
        <div class="title">行军背包</div>
        <div class="left">
          <div class="inner">
            <div class="empty">暂无道具</div>
          </div>
        </div>
        <div class="right">
          <div class="inner">
            <div class="detail_img">
              <img src="../../../allstar_assets/store/0_3.png" alt="" />
            </div>
            <div class="intro">龙刻运行 数量 x {{ num }}</div>
            <div class="intro">速率加成 {{ totalSpeedAdd }}</div>
            <div class="input_box">
              <img
                style="cursor: pointer"
                class="img_action"
                src="../../../assets/mint/minus.svg"
                @click="
                  () => {
                    const temp = num - 1;
                    if (temp < 0) {
                      num = 0;
                      return;
                    }
                    num = temp;
                  }
                "
              />
              <div class="ipt_bg">
                <img
                  class="ipt_img"
                  src="../../../assets/mint/input.png"
                  alt=""
                />
                <input
                  v-model="num"
                  class="input"
                  @input="num = Number($event.target.value.replace(/\D+/, ''))"
                />
              </div>
              <img
                class="img_action"
                style="cursor: pointer"
                src="../../../assets/mint/add.svg"
                @click="
                  () => {
                    num += 1;
                  }
                "
              />
            </div>
            <CommonButton class="btn" :disabled="true" :circle="true">使用</CommonButton>
          </div>
        </div>
      </div>
    </div>
    <div class="back_home" @click="() => $emit('close')">返回</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted, computed } from "vue";
import CommonButton from "../../../components/common_button.vue";
export default {
  name: "bf_pack",
  props: ["value"],
  components: {
    CommonButton,
  },
  setup() {
    const data = reactive({
      num: 1,
    });
    const totalSpeedAdd = computed(() => {
      return 14400;
    });
    onBeforeMount(() => {
    });
    onMounted(() => {
    });
    const refData = toRefs(data);
    return {
      ...refData,
      totalSpeedAdd,
    };
  },
};
</script>
<style lang='less' scoped>
.detail_container {
  @media screen and(max-height: 414px) {
    transform: scale(0.9);
  }
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
.back_home {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 1%;
  bottom: 1%;
  width: 20rem;
  padding: 0.5rem 0;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 2rem;
}
.main {
  position: relative;
  width: 85%;
  height: 40rem;
  .status {
    position: absolute;
    top: 0%;
    right: 0%;
    width: 6rem;
    transform: translate(50%, -50%);
    img {
      width: 100%;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: left;
      margin-top: 3rem;
      margin-left: 10rem;
      font-size: 2rem;
    }
    .left {
      position: absolute;
      top: 7rem;
      left: 7rem;
      width: 53%;
      height: 67%;
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        .empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.3rem;
        }
      }
    }
    .right {
      position: absolute;
      height: 83%;
      top: 1.8rem;
      right: 8%;
      width: 28%;
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .detail_img {
          width: 8rem;
          img {
            width: 100%;
          }
        }
        .intro {
          font-size: 2rem;
        }
        .input_box {
          display: flex;
          align-items: center;
          .img_action {
            width: 2rem;
          }
          .ipt_img {
            margin: 0 1rem;
            width: 12.5rem;
          }
        }
        .ipt_bg {
          position: relative;
          margin: 0 1rem;
        }
        .input {
          width: 60%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -55%);
          outline: none;
          background: transparent;
          border: none;
          text-align: center;
          font-size: 2.5rem;
          color: #f2dbb9;
        }
        .btn {
          font-size: 1.5rem;
          padding: 1rem 4rem;
        }
      }
    }
  }
}
</style>