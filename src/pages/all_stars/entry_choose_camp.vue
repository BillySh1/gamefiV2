<template>
  <InjectGoBack />
  <div class="box">
    <img
      class="bg"
      src="../../allstar_assets/all_stars/entry/choose_camp.png"
      alt=""
    />
    <img class="logo" src="../../assets/common/logo.png" alt="" />
    <Lottie
      v-if="loading"
      class="lottie"
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
    <div v-if="!loading" class="container">
      <Lottie
        v-show="playing && cur.key == 0"
        class="lottie"
        :options="{
          ...defaultOptions,
          animationData: require('../../allstar_assets/main/choose/chose_0.json'),
        }"
        @animCreated="handleAni0"
      />
      <Lottie
        v-show="playing && cur.key == 1"
        class="lottie"
        :options="{
          ...defaultOptions,
          animationData: require('../../allstar_assets/main/choose/chose_1.json'),
        }"
        @animCreated="handleAni1"
      />
      <Lottie
        v-show="playing && cur.key == 2"
        class="lottie"
        :options="{
          ...defaultOptions,
          animationData: require('../../allstar_assets/main/choose/chose_2.json'),
        }"
        @animCreated="handleAni2"
      />
      <Lottie
        v-show="playing && cur.key == 3"
        class="lottie"
        :options="{
          ...defaultOptions,
          animationData: require('../../allstar_assets/main/choose/chose_3.json'),
        }"
        @animCreated="handleAni3"
      />

      <div
        v-show="!playing"
        class="item"
        v-for="(item, index) in campMap"
        :key="index"
        @click="() => choose(item)"
      >
        <img
          class="b"
          src="../../allstar_assets/all_stars/entry/camp/ball.png"
          alt=""
        />
        <img
          class="c"
          :src="
            require(`../../allstar_assets/all_stars/entry/camp/c_${item.key}.png`)
          "
          alt=""
        />
        <img
          class="p"
          :src="require(`../../assets/cardImgs/hero/bg/c${item.key}.png`)"
          alt=""
        />
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
    <InjectModal
      :title="'征战确认'"
      class="modal"
      :value="showModal"
      :btnDisable="btnDisable"
      @close="() => (showModal = false)"
      @confirm="bind"
    >
      <div class="up">
        确定要为 <span class="camp">{{ cur.name }}</span> 出战吗
      </div>
      <div class="warning">一旦选择阵营，本次战役期间不可更改</div>
    </InjectModal>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeUnmount,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import InjectModal from "../../components/inject_modal.vue";
import { useRouter } from "vue-router";
import initWeb3 from "../../utils/initWeb3";
import InjectGoBack from "../../components/inject_go_back.vue";
import { useStore } from "vuex";

export default {
  name: "entry_choose_camp",
  components: {
    InjectModal,
    InjectGoBack,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      campMap: [
        {
          key: 0,
          name: "魏国",
        },
        {
          key: 1,
          name: "蜀国",
        },
        {
          key: 2,
          name: "吴国",
        },
        {
          key: 3,
          name: "群雄",
        },
      ],
      cur: 0,
      showModal: false,
      ani0: undefined,
      ani1: undefined,
      ani2: undefined,
      ani3: undefined,
      playing: false,
      defaultOptions: {
        autoplay: false,
        loop: true,
      },
      web3: "",
      account: "",
      loading: false,
      btnDisable: false,
    });

    const choose = (x) => {
      data.cur = x;
      data.playing = true;
      const ani = data[`ani${x.key}`];
      ani.play();
      ani.addEventListener("loopComplete", () => {
        ani.stop();
        data.playing = false;
        data.showModal = true;
      });
    };
    const bind = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .bond(data.cur.key)
          .estimateGas({ from: data.account });
        const res = await c.methods.bond(data.cur.key).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("绑定成功，正在跳转...", store.state.toast_info);
          data.showModal = false;
          router.push({
            name: "bf_main",
          });
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("选择阵营出错", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };

    const handleAni0 = (ani) => {
      data.ani0 = ani;
    };
    const handleAni1 = (ani) => {
      data.ani1 = ani;
    };
    const handleAni2 = (ani) => {
      data.ani2 = ani;
    };
    const handleAni3 = (ani) => {
      data.ani3 = ani;
    };
    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getPlayer();
      data.loading = false;
    });
    const getPlayer = async () => {
      const c = store.state.c_battle;
      const player = await c.methods.players(data.account).call();
      if (player.isBond) {
        router.push({
          name: "bf_main",
        });
      }
    };
    onBeforeUnmount(() => {
      data.ani0.destroy();
      data.ani1.destroy();
      data.ani2.destroy();
      data.ani3.destroy();
    });
    const refData = toRefs(data);
    return {
      ...refData,
      choose,
      bind,
      handleAni0,
      handleAni1,
      handleAni2,
      handleAni3,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: black;
  .bg {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .logo {
    width: 20rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(10%, -20%);
  }
  .modal {
    font-size: 2rem;
    line-height: 1.5;
    .up {
      .camp {
        font-size: 2.5rem;
        margin: 0 1rem;
      }
    }
    .warning {
      color: red;
    }
  }
}
.lottie {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 999;
}
.container {
  position: absolute;
  width: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50%;
  .item {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .b {
      width: 5rem;
    }
    .c {
      width: 20rem;
      margin: 2rem 1rem;
    }
    .p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 16%);
      width: 5.5rem;
    }
    .text {
      font-size: 2.5rem;
      background: conic-gradient(
        from 180deg at 50% 50%,
        #000000 0deg,
        #ebb11d 123.75deg,
        #8c590c 245.62deg,
        #ffbb0c 305.62deg,
        #000000 360deg
      );
      background-clip: text;
      color: transparent;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
}
</style>