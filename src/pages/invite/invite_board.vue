<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <div class="border">
        <img src="../../assets/notice/border.svg" alt="" />
        <div class="inner">
          <CommonButton>邀请排行榜</CommonButton>
          <div class="table_content"></div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import CommonButton from "../../components/common_button";
import InjectGoBack from '../../components/inject_go_back.vue'
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack
  },
  setup() {
    const data = reactive({
      pageTitle: "邀请排行榜",
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
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
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
