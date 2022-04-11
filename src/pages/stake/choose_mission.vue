<template>
  <div class="box">
    <div class="bottom">
      <StkBtn :text="'考虑一下'" />
      <img src="../../assets/stake/divider.png" alt="" />
    </div>
    <div class="place_zone">
      <div class="text">浮育城</div>
      <img class="img" src="../../assets/stake/city.png" alt="" />
    </div>
    <div class="top_right">
      <img src="../../assets/stake/coin.png" alt="" />
      <div class="text" >总奖池</div>
      <div class="text">154892734</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import StkBtn from "./components/stk_btn.vue";
export default {
  name: "choose_mission",
  components: {
    StkBtn,
  },
  setup() {
    const data = reactive({});
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
}
.bottom {
  width: 70%;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 1rem;
    width: 100%;
  }
}
.place_zone {
  position: absolute;
  bottom: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    background: url("../../assets/stake/place_text_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 15rem;
    padding: 0.5rem 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .img {
    width: 10rem;
  }
}
.top_right{
    position: absolute;
    top: 3%;
    right: 3%;
    display: flex;
    align-items: center;
    img{
        width: 4rem;
        margin-right: 1.5rem;
    }
    .text{
        font-size: 1.3rem;
        margin-right: 1rem;
    }

}
</style>