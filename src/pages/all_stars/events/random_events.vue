<template>
  <div
    class="events_mask"
    v-if="value && [0, 5].includes(Number(type))"
    @click="() => $emit('close')"
  >
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
       
      </div>
    </div>
    <div class="'confirm" @click="onConfirm">
      <div class="inner">
        <img src="../../../allstar_assets/popups/confirm_bg.png" alt="" />
        <div class="text">确认</div>
      </div>
    </div>
  </div>

</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "random_events",
  props: ["value", "type", "player"],
  components: {
  },
  setup(prop, ctx) {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      account: "",
      web3: "",
      btnDisable: false,
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
    });
    const onConfirm = async () => {
      await march(prop.type);
    };
    const march = async (idx) => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待决策确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .march(idx)
          .estimateGas({ from: data.account });
        const res = await c.methods.march(idx).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
        ctx.emit("refresh");
        ctx.emit("close");
      }
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
        align-items: flex-start;
        justify-content: space-between;
        .img_box {
          position: relative;
          width: 40%;
          img {
            width: 100%;
          }
          .img_inner {
            position: absolute;
            width: 95%;
            height: 95%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .intro {
          width: 55%;
          line-height: 1.5;
          font-size: 1.5rem;
        }
      }
    }
  }
}
.disable {
  pointer-events: none;
  filter: grayscale(100);
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