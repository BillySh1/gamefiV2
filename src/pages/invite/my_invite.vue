<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <img class="bg_badge" src="../../assets/pack/bg_badge.svg" alt="" />
      <div class="border">
        <img src="../../assets/notice/border.svg" alt="" />
        <div v-if="inviteData.length > 0" class="inner">
          <div class="top">
            <img src="../../assets/invite/my_top_bg.png" alt="" />
            <div class="info_box">
              <div class="item title">
                <img src="../../assets/invite/icons/1.svg" alt="" />
                我的收益
              </div>
              <div class="item">
                <div class="num">0 <span class="xs">MMC</span></div>
                <div class="des">日收益</div>
              </div>
              <div class="item">
                <div class="num">0 <span class="xs">MMC</span></div>
                <div class="des">总收益</div>
              </div>
            </div>
          </div>
          <div v-for="item in inviteData" :key="item.key" class="inner_item">
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
      inviteData: [
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
          key: 2,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
        {
          key: 3,
          time: new Date(),
          title: "富贾三国公测",
          content: "这是内容这是内容",
        },
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
      display: flex;
      flex-direction: column;
      align-items: center;
      .top {
        width: 100%;
        position: relative;
        img {
          width: 100%;
        }
        .info_box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 80%;
          width: 70%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            .num {
              font-family: SF Pro Text;
              font-size: 3rem;
              font-style: italic;
              font-weight: 700;
              background: linear-gradient(
                48.4deg,
                #ffca7b 4.15%,
                #a67327 64.55%
              );
              color: transparent;
              background-clip: text;
              .xs {
                font-size: 1.5rem;
              }
            }
            .des {
              margin-top: 1rem;
              font-size: 1.2rem;
              color: white;
              opacity: 0.5;
            }
          }
        }
      }
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
