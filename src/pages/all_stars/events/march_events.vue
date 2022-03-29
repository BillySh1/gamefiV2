<template>
  <div
    class="events_mask"
    v-if="value && [0, 5, 'ing'].includes(type)"
    @click="() => $emit('close')"
  >
    <img
      style="width: 100%"
      src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/light_bg.png"
      alt=""
    />
    <img
      @click="() => $emit('close')"
      class="close"
      src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/close.svg"
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
        <img
          src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/stake/road/scroll_bg.png"
          alt=""
        />
        <div class="main">
          <div class="title">
            <div v-if="type == 0">继续前进</div>
            <div v-if="type == 3">鹿原决战！</div>
            <div v-if="type == 'ing'">死战中！</div>
          </div>
          <div class="bottom">
            <div class="img_box">
              <img
                src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/img_bg.png"
                alt=""
              />
              <div class="img_inner">
                <img
                  v-if="type == 0"
                  src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/insert_0.png"
                  alt=""
                />
                <img
                  v-if="type == 5 || type == 'ing'"
                  src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/insert_3.png"
                  alt=""
                />
              </div>
            </div>
            <div class="intro">
              <div v-if="type == 0">
                您已抵达据点，军队正在据点休整，风声鹤唳，草木皆兵，此地不宜久留，耽误鹿原大计，请点击确定继续行军
              </div>
              <div v-if="type == 5">
                您已抵达鹿原，军队正在修整。点击确认即可立即开拨进入决战之地，角逐最终的胜利，成为鹿原霸主！
              </div>
              <div v-if="type == 'ing'">
                您的军队在该据点遭遇敌军，正在死战，请在
                <span>{{ getEndTime }}</span>
                后查看战斗结果
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="btnDisable ? 'confirm disable' : 'confirm'" @click="onConfirm">
      <div class="inner">
        <img
          src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/confirm_bg.png"
          alt=""
        />
        <div class="text">确认</div>
      </div>
    </div>
  </div>
  <BattleEvents
    :type="type"
    :placeText="placeText"
    @refresh="() => $emit('refresh')"
    @close="() => $emit('close')"
    v-if="value && ![0, 5, 'ing'].includes(type)"
  />
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  computed,
  watch,
} from "vue";
import initWeb3 from "../../../utils/initWeb3";
import BattleEvents from "./battle_events.vue";
import { useStore } from "vuex";
export default {
  name: "random_events",
  props: ["value", "type", "endTime", "placeText"],
  components: {
    BattleEvents,
  },
  setup(prop, ctx) {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      account: "",
      web3: "",
      btnDisable: false,
      ticker: undefined,
      timing: "0时0分0秒",
    });
    watch(
      () => prop.value,
      async () => {
        getTicker();
      }
    );
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
    // onBeforeUnmount(() => {
    //   if (data.ticker) {
    //     clearInterval(data.ticker);
    //   }
    // });
    const getEndTime = computed(() => {
      return data.timing;
    });
    const getRTime = (endTime) => {
      // counting time next node
      const now = new Date().getTime();
      const delta = Number(endTime) - (Number(now) / 1000).toFixed(0);
      let h = Math.floor((delta / 60 / 60) % 24);
      let m = Math.floor((delta / 60) % 60);
      let s = Math.floor(delta % 60);
      if (parseInt(h, 10) < 0) h = "0";
      if (parseInt(m, 10) < 0) m = "0";
      if (parseInt(s, 10) < 0) s = "0";
      data.timing = `${h}时${m}分${s}秒`;
    };
    const getTicker = () => {
      if (prop.type == "ing") {
        if (data.ticker === undefined) {
          clearInterval(data.ticker);
        }
        data.ticker = setInterval(() => {
          getRTime(prop.endTime);
        }, 1000);
      }
    };

    const onConfirm = async () => {
      if (prop.type == "ing") {
        console.log(prop.endTime);
        return;
      }
      await march(prop.type);
    };
    const march = async (idx) => {
      if (idx == 5) idx = 3;
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
          gas: Number(gas) + 100000,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("决策成功,正在行军...", store.state.toast_info);
          ctx.emit("refresh");
          ctx.emit("close");
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("决策出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
      getEndTime,
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