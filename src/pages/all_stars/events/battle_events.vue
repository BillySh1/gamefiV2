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
          <div>{{ getStatusText }}</div>
        </div>
      </div>
      <div class="inner">
        <div class="intro">
          此处属于敌军前往鹿原的必经之地，我军提前在此设伏可大量消耗敌军的有生力量从而在鹿原取得先机。伏击可获得战力加成，
        </div>
        <div class="info">
          <div class="item">
            <div class="red">5%</div>
            <div>您将获得战力加成</div>
          </div>
          <img src="../../../allstar_assets/popups/divider.png" alt="" />
          <div class="item">
            <img class="green" :src="getCampImg" alt="" />
            <div>敌对阵营</div>
          </div>
        </div>
        <div class="action">
          <div
            v-if="false"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="march(1)"
          >
            <img src="../../../allstar_assets/popups/btn_green.png" alt="" />
            <div class="text">投降</div>
          </div>
          <div :class="btnDisable ? 'btn disable' : 'btn'" @click="march(0)">
            <img src="../../../allstar_assets/popups/btn_green.png" alt="" />
            <div class="text">继续前进</div>
          </div>
          <div :class="btnDisable ? 'btn disable' : 'btn'" @click="march(2)">
            <img src="../../../allstar_assets/popups/btn_orange.png" alt="" />
            <div class="text">准备战斗</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  computed,
} from "vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "battleEvents",
  props: ["value", "type", "player"],
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
    const getCampImg = computed(() => {
      return [
        require("../../../assets/cardImgs/hero/bg/c0.png"),
        require("../../../assets/cardImgs/hero/bg/c1.png"),
        require("../../../assets/cardImgs/hero/bg/c2.png"),
        require("../../../assets/cardImgs/hero/bg/c3.png"),
      ][0];
    });
    const getStatusText = computed(() => {
      return ["准备设伏！", "中埋伏了！", "遭遇敌军！", "战斗结束"][0];
    });
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
        data.btnDisable = false;
        ctx.emit("refresh");
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getStatusText,
      getCampImg,
      march,
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
    width: 60rem;
    height: 80vmin;
  }
  .top {
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -31%);
    display: flex;
    align-items: center;
    .place {
      width: 40%;
      position: relative;
      white-space: nowrap;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
      }
      margin-right: 2rem;
    }
    .status {
      height: 5rem;
      background: #3f2a12;
      border-radius: 4px;
      padding: 0.5rem 2rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img {
        height: 60%;
        margin-right: 1rem;
      }
      font-size: 1.5rem;
    }
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 81%;
    height: 76%;
    background: rgba(0, 0, 0, 0.3);
    padding: 3rem 3.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .intro {
      font-size: 1.5rem;
      line-height: 1.5;
      text-align: center;
    }
    .info {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 5rem;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .red {
          font-size: 4rem;
          color: #bb4a31;
          margin-bottom: 1.5rem;
        }
        .green {
          height: 5rem;
          margin-bottom: 1.5rem;
        }
      }
    }
    .action {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .disable {
        pointer-events: none;
        filter: grayscale(100);
      }
      .btn {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        position: relative;
        width: 45%;
        img {
          width: 100%;
        }
        .text {
          font-size: 1.2rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }
      }
    }
  }
}
</style>