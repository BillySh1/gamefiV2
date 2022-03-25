<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <div class="border">
        <img src="../../assets/notice/border.svg" alt="" />
        <div class="inner">
          <CommonButton>邀请排行榜</CommonButton>
          <div class="table_content">
            <TableItem
              v-for="item in boardData"
              :key="item.key"
              :tableItem="item"
            />
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script>
const host = "http://54.151.194.138:8999";
import { reactive, toRefs, onBeforeMount } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import CommonButton from "../../components/common_button";
import InjectGoBack from "../../components/inject_go_back.vue";
import TableItem from "../../components/table_item.vue";
import postData from "../../utils/useFetch";
import initWeb3 from "../../utils/initWeb3.js";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack,
    TableItem,
  },
  setup() {
    const data = reactive({
      pageTitle: "邀请排行榜",
      boardData: [],
      account: "",
      web3: "",
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
      await getBoard();
    });
    const getBoard = async () => {
      const url = host + "/invite/getTotal";
      const res = await postData(url, {
        page: 1,
        limit_num: 30,
      }).then((res) => res.data);
      res.list.sort((a, b) => {
        return Number(b.amount) - Number(a.amount);
      });
      console.log(res.list, "ggg");
      data.boardData = [];
      data.boardData.push(["排名", "地址", "收益"]);
      res.list.map((item, index) => {
        data.boardData.push([
          index + 1,
          item.inviter,
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
        max-height: 30rem;
        overflow-y: auto;
      }
    }
  }
}
</style>
