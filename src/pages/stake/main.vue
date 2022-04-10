<template>
  <div class="box">
    <StkBtn class="check_map" :text="'查看地图'" @click="()=>{
            $router.push({
                name:'stk_entry'
            })
        }" />
    <div class="right_top">
      <div class="item">
        <img src="../../assets/stake/main_item.png" alt="" />
        <div class="inner">
          <div class="title">总奖池</div>
          <div style="font-size: 1.2rem; margin: 0 1.5rem">154283929</div>
          <img class="coin" src="../../assets/stake/coin.png" alt="" />
        </div>
      </div>
      <div class="item">
        <img src="../../assets/stake/main_item.png" alt="" />
        <div class="inner">
          <div class="title">累计时间</div>
          <div class="str">09:08:23</div>
        </div>
      </div>
      <div class="item">
        <img src="../../assets/stake/main_item.png" alt="" />
        <div class="inner">
          <div class="title">累计收益</div>
          <div class="str">1515255</div>
        </div>
      </div>
    </div>
    <div class="left_bottom">
      <div class="btn_item">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="btn">查看部队</div>
      </div>
      <div class="btn_item">
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="btn">查看部队</div>
      </div>
    </div>
    <div class="place_zone" >
        <div class="text" >
            浮育城
        </div>
        <img class="img" src="../../assets/stake/city.png" alt="">
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import StkBtn from "./components/stk_btn.vue";
export default {
  name: "stk_main",
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
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
}
.check_map {
  position: absolute;
  top: 3%;
  left: 3%;
}
.right_top {
  position: absolute;
  top: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  .item {
    position: relative;
    margin-bottom: 1rem;
    width: 20rem;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      .title {
        font-size: 1.3rem;
      }
      .coin {
        width: 3rem;
      }
      .str {
        font-size: 1.5rem;
        font-weight: bold;
        margin-left: 2rem;
      }
    }
  }
}
.left_bottom {
  position: absolute;
  bottom: 3%;
  left: 3%;
  display: flex;
  flex-direction: column;
  .btn_item {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    .dia {
      width: 2.5rem;
      margin-right: 2rem;
    }
    .btn {
      padding: 0 1rem;
      font-size: 1.5rem;
      height: 3rem;
      background: url("../../assets/stake/btn_bg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 3rem;
    }
  }
}
.place_zone{
    position: absolute;
    bottom: 3%;
    right: 3%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text{
        background: url('../../assets/stake/place_text_bg.png') no-repeat;
        background-size: 100% 100%;
        width: 15rem;
        padding: 0.5rem 0;
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
    }
    .img{
        width: 10rem;
    }
}
</style>