<template>
  <div class="box">
    <div class="mask">
      <div class="content">
        <img
          class="logo"
          src="../../allstar_assets/all_stars/entry/logo.png"
          alt=""
        />
        <img
          class="text"
          src="../../allstar_assets/all_stars/entry/text.png"
          alt=""
        />
        <img
          class="divider"
          src="../../allstar_assets/all_stars/entry/divider.png"
          alt=""
        />
        <div class="enter" @click="jump">
          <img src="../../allstar_assets/all_stars/entry/btn_bg.png" alt="" />
          <div class="text">加入战斗</div>
        </div>
        <div class="back" @click="() => $router.push({ name: 'home' })">
          返回
        </div>
      </div>
    </div>
    <div class="fire">
      <Lottie
        :options="{
          animationData: require('../../allstar_assets/all_stars/entry/fire.json'),
        }"
      />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from "vue";
// import { useRouter } from "vue-router";
export default {
  name: "all_stars_entry",
  setup() {
    // const router = useRouter();
    const data = reactive({});
    const jump = () => {
      // router.push({
        // name: "bf_choose",
      // });
    };
    onBeforeMount(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      jump,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  background: url("../../allstar_assets/all_stars/entry/bg.png") no-repeat;
  background-size: 100% 100%;
  .mask {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../../allstar_assets/all_stars/entry/mask.png") no-repeat;
    background-size: 100% 100%;
  }
  .fire {
    position: absolute;
    bottom: 0%;
    z-index: 2;
    width: 120%;
  }
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  .logo {
    width: 50rem;
  }
  .text {
    width: 30rem;
    margin: 1.5rem 0;
  }
  .divider {
    width: 50rem;
  }
  .enter {
    cursor: pointer;
    margin-top: 2rem;
    position: relative;
    height: 4.5rem;
    img {
      height: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 100%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 2rem;
    }
  }
  .back {
    cursor: pointer;
    margin-top: 2rem;
    font-size: 2rem;
  }
}
</style>