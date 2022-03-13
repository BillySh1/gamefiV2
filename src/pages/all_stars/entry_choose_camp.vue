<template>
  <div class="box">
    <img
      class="bg"
      src="../../allstar_assets/all_stars/entry/choose_camp.png"
      alt=""
    />
    <img class="logo" src="../../assets/common/logo.png" alt="" />
    <div class="container">
      <div
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
import { reactive, toRefs, onBeforeMount } from "vue";
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
      cur: "",
      showModal: false,
    });
    const choose = (x) => {
      data.cur = x;
      data.showModal = true;
    };
    const onConfirm = () => {
      data.showModal = false;
      router.push({
        name: "bf_main",
      });
    };
    onBeforeMount(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      choose,
      onConfirm,
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
.container {
  position: absolute;
  width: fit-content;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
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