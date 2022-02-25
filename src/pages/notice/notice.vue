<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="border">
        <img src="../../assets/notice/border.svg" alt="" />
        <div class="inner">
          <div v-for="item in noticeData" :key="item.key" class="inner_item">
            <NoticeItem :info="item" />
          </div>
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
import NoticeItem from "./notice_item";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    NoticeItem,
  },
  setup() {
    const data = reactive({
      pageTitle: "公告栏",
      noticeData: [
        {
          key: 0,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 1,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 1,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 1,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 1,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 1,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
      ],
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
  background: url("../../assets/notice/notice_bg.png") no-repeat;
  background-size: cover;
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
      overflow-x: hidden;
      overflow-y: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -45%);
    }
  }
}
</style>
