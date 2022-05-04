<template>
  <div class="container">
    <InjectGoBack />
    <CommonPageHeader :title="pageTitle" />
    <div class="content">称号系统正在开发中，敬请期待</div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
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
      pageTitle: "我的称号",
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
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
</style>
