<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <div class="border">
        <img
          src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/notice/border.svg"
          alt=""
        />
        <div v-if="noticeData.length > 0" class="inner">
          <div v-for="item in noticeData" :key="item.key" class="inner_item">
            <NoticeItem :info="item" />
          </div>
        </div>
        <div v-else class="empty">{{ $t("empty") }}</div>
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
import NoticeItem from "./notice_item";
import { useI18n } from "vue-i18n";
export default {
  name: "notice",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    NoticeItem,
    InjectGoBack,
  },
  setup() {
    const { t } = useI18n();
    const data = reactive({
      pageTitle: t("notice"),
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
  background: url("https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/notice/notice_bg.png")
    no-repeat;
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
