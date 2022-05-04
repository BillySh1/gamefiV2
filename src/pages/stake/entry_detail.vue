<template>
  <div class="box">
    <div class="bottom_zone">
      <img class="man" src="../../assets/stake/detail/man.png" alt="" />
      <div class="intro">
        <div class="top">
          <div class="title" >
            <img src="../../assets/stake/detail/scroll.png" alt="">
            <div class="text" >简介</div>
          </div>
          <img src="../../assets/stake/divider.png" alt="">
        </div>
        <div class="text">
          这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介这里是简介
        </div>
      </div>
      <div class="ciry"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "stk_story",
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
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
}
.bottom_zone {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30vmin;
  background: rgba(38, 24, 24, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .man{
    width: 20rem;
    transform: translateY(-20%);
  }
  .intro {
    width: 60%;
    .top{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      img{
        width: 100%;
      }
      .title{
        display: flex;
        align-items: center;
        font-size: 2rem;
        img{
          width: 3rem;
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>