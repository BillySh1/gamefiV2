<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div></div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
  },
  setup() {
    const data = reactive({
      pageTitle: "交易市场",
    });

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
  background: url('../../assets/market/bg.png') no-repeat;
  background-size: cover;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
