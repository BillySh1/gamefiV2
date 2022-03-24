<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <img class="bg_badge" src="../../assets/pack/bg_badge.svg" alt="" />
      <div class="border">
        <img src="../../assets/notice/border.svg" alt="" />
        <div v-if="noticeData.length > 0" class="inner">
          <div v-for="item in noticeData" :key="item.key" class="inner_item">
            222
          </div>
        </div>
        <div v-else class="empty">暂无数据</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
export default {
  name: "notice",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
  },
  setup() {
    const data = reactive({
      pageTitle: "我的收益",
      noticeData: [
        // {
        //   key: 0,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
        // {
        //   key: 1,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
        // {
        //   key: 1,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
        // {
        //   key: 1,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
        // {
        //   key: 1,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
        // {
        //   key: 1,
        //   time: new Date(),
        //   title: "富贾三国公测",
        //   content: "这是内容这是内容",
        // },
      ],
    });

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
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 0;
    bottom: 15%;
    opacity: 0.8;
  }
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
      overflow-x: hidden;
      overflow-y: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -45%);
    }
    .empty {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
    }
  }
}
</style>
