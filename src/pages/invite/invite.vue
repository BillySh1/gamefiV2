<template>
  <div class="container">
    <InviteModal
      :value="showModal"
      :data="encodeData"
      @close="() => (showModal = false)"
    />
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack  />
    <div class="content">
      <img class="bg_badge" src="../../assets/pack/bg_badge.svg" alt="" />
      <div class="invite_box">
        <div class="up">
          <img src="../../assets/invite/up_bg.png" alt="" />
          <div class="info_box">
            <div class="item title">
              <img src="../../assets/invite/icons/1.svg" alt="" />
              我的收益
            </div>
            <div class="item">
              <div class="num">3000 <span class="xs">MMC</span></div>
              <div class="des">日收益</div>
            </div>
            <div class="item">
              <div class="num">12,000 <span class="xs">MMC</span></div>
              <div class="des">总收益</div>
            </div>
          </div>
        </div>
        <div class="bottom_box">
          <div
            class="item"
            @click="() => $router.push({ name: 'inviteBoard' })"
          >
            <img src="../../assets/invite/item_1.png" alt="" />
            <div class="inner">
              <img src="../../assets/invite/icons/2.svg" alt="" />
              邀请排行榜
            </div>
          </div>
          <div class="item">
            <img src="../../assets/invite/item_2.png" alt="" />
            <div class="inner">
              <img src="../../assets/invite/icons/3.svg" alt="" />
              邀请规则
            </div>
          </div>
          <div class="item" @click="generate">
            <img src="../../assets/invite/item_3.png" alt="" />
            <div class="inner">
              <img src="../../assets/invite/icons/4.svg" alt="" />
              生成我的邀请码
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InviteModal from "./invite_modal.vue";
import initWeb3 from "../../utils/initWeb3";
import InjectGoBack from '../../components/inject_go_back.vue'
import { useStore } from "vuex";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InviteModal,
    InjectGoBack
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      pageTitle: "呼朋唤友",
      encodeData: "",
      showModal: false,
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
    });
    const generate = () => {
      data.encodeData =
        window.location.host + "/#/mint?invite=" + btoa(data.account);
      navigator.clipboard.writeText(data.encodeData);
      proxy.$toast("邀请链接已复制", store.state.toast_success);
      data.showModal = true;
    };
    const refData = toRefs(data);
    return {
      ...refData,
      generate,
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
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 15%;
    opacity: 0.8;
  }
  .invite_box {
    position: absolute;
    width: 70rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    .up {
      position: relative;
      cursor: pointer;
      width: 100%;
      margin-bottom: 1rem;
      img {
        width: 100%;
      }
      .title {
        font-size: 2.5rem;
        img {
          width: 5rem;
        }
      }
      .info_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%, -50%);
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
            background: linear-gradient(48.4deg, #ffca7b 4.15%, #a67327 64.55%);
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
    .bottom_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        width: calc(100% / 3 - 1rem);
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
        }
        .inner {
          position: absolute;
          width: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 2.5rem;
          img {
            width: 5rem;
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
}
</style>
