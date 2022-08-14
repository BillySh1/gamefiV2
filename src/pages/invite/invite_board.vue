<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <div class="border">
        <img
          src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/notice/border.svg"
          alt=""
        />
        <div class="inner">
          <div class="top">
            <CommonButton
              @click="
                () => {
                  curTab = 'all';
                  switchData();
                }
              "
              style="margin-right: 2rem"
              >{{ t("all_board") }}</CommonButton
            >
            <CommonButton
              @click="
                () => {
                  curTab = 'day';
                  switchData();
                }
              "
              >{{ t("day_board") }}</CommonButton
            >
          </div>

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
import { useI18n } from "vue-i18n";
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
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const data = reactive({
      pageTitle: t("invite_board"),
      boardData: [],
      dayData: [],
      totalData: [],
      account: "",
      web3: "",
      curTab: "all",
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
      await getDayBoard();
      switchData();
    });
    const switchData = () => {
      data.boardData = [];
      if (data.curTab == "all") {
        data.boardData = data.totalData;
        data.pageTitle = t("all_board");
      } else if (data.curTab == "day") {
        data.boardData = data.dayData;
        data.pageTitle = t("all_board");
      }
    };
    const getBoard = async () => {
      const url = host + "/invite/getTotal";
      const res = await postData(url, {
        page: 1,
        limit_num: 30,
      }).then((res) => res.data);
      res.list.sort((a, b) => {
        return Number(b.amount) - Number(a.amount);
      });
      data.totalData = [];
      data.totalData.push([t("rank"), t("address"), t("income")]);
      res.list.map((item, index) => {
        data.totalData.push([
          index + 1,
          item.inviter,
          data.web3.utils.fromWei(item.amount, "ether") + " MDAO",
        ]);
      });
    };
    const getDayBoard = async () => {
      const url = host + "/invite/getDay";
      const res = await postData(url, {
        page: 1,
        limit_num: 30,
      }).then((res) => res.data);
      res.list.sort((a, b) => {
        return Number(b.amount) - Number(a.amount);
      });
      data.dayData = [];
      data.dayData.push([t("rank"), t("address"), t("income")]);
      res.list.map((item, index) => {
        data.dayData.push([
          index + 1,
          item.inviter,
          data.web3.utils.fromWei(item.amount, "ether") + " MDAO",
        ]);
      });
    };

    const refData = toRefs(data);
    return {
      t,
      ...refData,
      switchData,
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
      .top {
        display: flex;
        align-items: center;
      }
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
