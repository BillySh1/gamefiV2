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
                <div class="num">
                  {{ inviteDay }} <span class="xs">MMC</span>
                </div>
                <div class="des">日收益</div>
              </div>
              <div class="item">
                <div class="num">
                  {{ inviteTotal }} <span class="xs">MMC</span>
                </div>
                <div class="des">总收益</div>
              </div>
            </div>
          </div>
          <div class="inner_c">
            <TableItem
              v-for="item in inviteData"
              :key="item.key"
              :tableItem="item"
            />
          </div>
        </div>
        <div v-else class="empty">暂无数据</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
const host = "http://54.151.194.138:8999";
import { onBeforeMount, reactive, toRefs } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
import TableItem from "../../components/table_item.vue";
import postData from "../../utils/useFetch";
export default {
  name: "notice",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
    TableItem,
  },
  setup() {
    const data = reactive({
      pageTitle: "我的收益",
      account: "",
      web3: "",
      inviteDay: 0,
      inviteTotal: 0,
      inviteData: [],
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getAmount();
    });
    const getAmount = async () => {
      const url = host + "/invite/getAmount";
      const res = await postData(url, {
        from: data.account,
      }).then((res) => res.data);
      data.inviteDay = data.web3.utils.fromWei(res.invite_day, "ether");
      data.inviteTotal = data.web3.utils.fromWei(res.invite_total, "ether");
      data.inviteData = [];
      data.inviteData.push(["blockNumber", "地址", "收益"]);
      res.list.map((item) => {
        data.inviteData.push([
          item.block_number,
          item.buyer,
          data.web3.utils.fromWei(item.amount, "ether"),
        ]);
      });
    };
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
        margin-bottom: 2rem;
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
      .inner_c {
        width: 100%;
        max-height: 30rem;
        overflow-y: auto;
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
