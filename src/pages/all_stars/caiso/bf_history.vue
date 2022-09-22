<template>
  <div class="container">
    <InjectGoBack />
    <div class="content">
      <div class="border">
        <img
          src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/notice/border.svg"
          alt=""
        />
        <div class="inner">
          <CommonButton>历史战役</CommonButton>
          <div class="table_content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
import CommonButton from "../../../components/common_button";
import InjectGoBack from "../../../components/inject_go_back.vue";
export default {
  name: "store",
  components: {
    CommonButton,
    InjectGoBack,
  },
  setup() {
    const data = reactive({});

    onBeforeMount(() => {});

    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/allstar_assets/casio/bg.png")
    no-repeat;
  background-size: 100% 100%;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .border {
    position: relative;
    width: 70rem;
    img {
      width: 100%;
      height: 100%;
    }
    .inner {
      position: absolute;
      width: 85%;
      height: 80%;
      overflow: hidden;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -45%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .table_content {
        width: 100%;
        margin-top: 1rem;
        overflow-x: hidden;
        overflow-y: auto;
        border-top: 1px solid rgba(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
