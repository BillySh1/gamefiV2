<template>
  <div class="events_mask" @click="() => $emit('close')">
    <img
      @click="() => $emit('close')"
      class="close"
      src="../../../allstar_assets/popups/close.svg"
      alt=""
    />
    <div class="content">
      <img
        class="c_bg"
        src="../../../allstar_assets/popups/scroll_vertical.png"
        alt=""
      />
      <div class="top">
        <div class="place">
          <img src="../../../allstar_assets/popups/place_bg.png" alt="" />
          <div class="text">地点</div>
        </div>
        <div class="status">
          <img src="../../../allstar_assets/popups/alert_icon.png" alt="" />
          <div v-if="value == 1">被埋伏了！</div>
          <div v-if="value == 2">遭遇敌军！</div>
          <div v-if="value == 5">选择埋伏!</div>
        </div>
      </div>
      <div class="inner"></div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "battleEvents",
  props: ["value", "type"],
  components: {},
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
          ctx.emit("close");
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        ctx.emit("refresh");
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
  position: relative;
  width: auto;
  height: auto;
  .c_bg {
    width: 40rem;
    height: 80vmin;
  }
  .top {
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -50%);
    .place {
      width: 50rem;
      position: relative;
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
  }
}
</style>