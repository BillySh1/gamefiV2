<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <img class="mist" src="../assets/mix/mix_mist.svg" alt="" />
      <div class="main">
        <div class="title">恭喜您获得了</div>
        <div class="up_box">
          <div :style="getRarityStyle">吕蒙</div>
          <div :style="getQualityStyle">史诗品质</div>
        </div>
        <img class="card" src="../assets/mix/temp_card.svg" />
        <div class="bottom">进阶成功</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import CommonPageHeader from "./common_page_header";
import CommonPageFooter from "./common_page_footer";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
  },
  setup() {
    const data = reactive({
      pageTitle: "",
    });

    onBeforeMount(() => {});
    const getRarityStyle = computed(() => {
      return "";
    });
    const getQualityStyle = computed(() => {
      return "";
    });

    const refData = toRefs(data);
    return {
      ...refData,
      getRarityStyle,
      getQualityStyle,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-size: 100%;
  background: black;
}
.content {
  position: relative;
  height: 100%;
  background: radial-gradient(
    80.32% 80.32% at 50.04% 11.21%,
    #0e408a 0%,
    rgba(78, 11, 11, 0) 100%
  );
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    .title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }
    .up_box {
      display: flex;
      font-size: 3rem;
      gap: 2rem;
    }
    .bottom {
      font-size: 2.5rem;
    }
    .card {
      margin: 1vmin 0;
      width: 15rem;
    }
  }
}
.mist {
  position: absolute;
  right: 0;
  height: calc(100% - 9rem);
  top: 4rem;
  bottom: 5rem;
}
</style>
