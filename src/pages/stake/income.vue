<template>
  <div class="box">
    <StkBtn class="back" :text="'返回'" />
    <div class="bottom_bar">
      <div class="progress">
        <Progress :value="23" />
      </div>
      <div class="info">
        <div class="check">
          <img src="../../assets/stake/income/check.png" alt="" />
          <div>查看</div>
        </div>
        <div class="power">
          <div class="total">
            <div class="item">
              <span class="mar">总战力</span>
              <span>14529999</span>
            </div>
            <div>
              <span class="mar">累计时间</span>
              <span>09:08:32</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">原部队战力</span>
              <span>14529999</span>
            </div>
            <div>
              <span class="mar">累计收益增长</span>
              <span>09:08:32</span>
            </div>
          </div>
          <div class="common">
            <div class="item">
              <span class="mar">雇佣兵战力</span>
              <span>14529999</span>
            </div>
            <div>
              <span class="mar">累计收益增长</span>
              <span>09:08:32</span>
            </div>
          </div>
        </div>
      </div>
      <div class="place_zone">
        <div class="text">浮育城</div>
        <img class="img" src="../../assets/stake/city.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import StkBtn from "./components/stk_btn";
import Progress from "./components/progress.vue";
export default {
  name: "income",
  components: {
    StkBtn,
    Progress,
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
  background: url("../../assets/stake/income/income_bg.png") no-repeat;
  background-size: 100% 100%;
}
.back {
  position: absolute;
  left: 4em;
  top: 2rem;
}
.bottom_bar {
  position: absolute;
  bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .place_zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
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
  .progress {
    width: 20rem;
    margin-left: 4rem;
  }
  .info {
    display: flex;
    align-items: center;
    .check {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 2rem;
      img {
        width: 4rem;
        margin-bottom: 1rem;
      }
    }
    .power{
        .total{
            display: flex;
            align-items: center;
            font-size: 1.5rem;
        }
        .common{
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            margin-top: 1rem;
        }
        .mar{
            margin-right: 2rem;
        }
        .item{
            margin-right: 2rem;
        }
    }
  }
}
</style>