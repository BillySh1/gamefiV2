<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <img class="bg_badge" src="../../assets/pack/bg_badge.svg" alt="" />
      <div v-if="quality" class="main">
        <Lottie :options="lottie_options" />
      </div>
      <div v-else class="empty">暂无可领取的盲盒</div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from '../../components/inject_go_back.vue'
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack
  },
  setup() {
    const data = reactive({
      pageTitle: "空 投",

      quality: false,
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/aridrop/after2.json`),
      };
    });
    onBeforeMount(() => {});

    const refData = toRefs(data);
    return {
      ...refData,
      lottie_options,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 15%;
    opacity: 0.8;
  }
}
.empty {
  font-size: 2rem;
}
</style>
