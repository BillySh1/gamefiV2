<template>
  <div class="box">
    <img
      class="bg"
      src="../../allstar_assets/all_stars/entry/choose_camp.png"
      alt=""
    />
    <img class="logo" src="../../assets/common/logo.png" alt="" />
    <div class="container">
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
      @close="() => (showModal = false)"
      @confirm="onConfirm"
    >
      <div class="up">
        确定要为 <span class="camp">{{ cur.name }}</span> 出战吗
      </div>
      <div class="warning">一旦选择阵营，本次战役其间不可更改</div>
    </InjectModal>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeUnmount } from "vue";
import InjectModal from "../../components/inject_modal.vue";
import { useRouter } from "vue-router";

export default {
  name: "entry_choose_camp",
  components: {
    InjectModal,
  },
  setup() {
    const router = useRouter();
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

    const onConfirm = () => {
      data.showModal = false;
      router.push({
        name: "bf_main",
      });
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
      onConfirm,
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