<template>
  <div class="container">
    <InviteModal
      :value="showModal"
      :data="encodeData"
      @close="() => (showModal = false)"
    />
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <img
        class="bg_badge"
        src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/pack/bg_badge.svg"
        alt=""
      />
      <div class="invite_box">
        <div class="up">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/up_bg.png"
            alt=""
          />
          <div
            class="info_box"
            @click="
              () =>
                $router.push({
                  name: 'my_invite',
                })
            "
          >
            <div class="item title">
              <img
                src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/icons/1.svg"
                alt=""
              />
              {{ t("my_income") }}
            </div>
            <div class="item">
              <div class="num">
                {{ inviteDay }} <span class="xs">MDAO</span>
              </div>
              <div class="des">{{ t("day_income") }}</div>
            </div>
            <div class="item">
              <div class="num">
                {{ inviteTotal }} <span class="xs">MDAO</span>
              </div>
              <div class="des">{{ t("all_income") }}</div>
            </div>
          </div>
        </div>
        <div class="bottom_box">
          <div
            class="item"
            @click="() => $router.push({ name: 'inviteBoard' })"
          >
            <img
              src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/item_1.png"
              alt=""
            />
            <div class="inner">
              <img
                src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/icons/2.svg"
                alt=""
              />
              {{ t("invite_board") }}
            </div>
          </div>
          <div class="item" @click="() => (showRules = true)">
            <img
              src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/item_2.png"
              alt=""
            />
            <div class="inner">
              <img
                src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/icons/3.svg"
                alt=""
              />
              {{ t("invite_rule") }}
            </div>
          </div>
          <div class="item" @click="generate">
            <img
              src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/item_3.png"
              alt=""
            />
            <div class="inner">
              <img
                src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/invite/icons/4.svg"
                alt=""
              />
              {{ t("generate_invite") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
    <InjectModal
      class="rule_modal"
      :title="t('invite_rule')"
      :value="showRules"
      @close="() => (showRules = false)"
      @confirm="() => (showRules = false)"
    >
      <div class="content">
        {{ t("invite_content") }}
      </div>
    </InjectModal>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InviteModal from "./invite_modal.vue";
import InjectModal from "../../components/inject_modal.vue";
import initWeb3 from "../../utils/initWeb3";
import InjectGoBack from "../../components/inject_go_back.vue";
import postData from "../../utils/useFetch";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { SEVER_HOST } from "../../utils/constants";
export default {
  name: "invite",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InviteModal,
    InjectGoBack,
    InjectModal,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      pageTitle: t("call_friends"),
      encodeData: "",
      showModal: false,
      showRules: false,
      inviteDay: 0,
      inviteTotal: 0,
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
      const url = SEVER_HOST + "invite/getAmount";
      const res = await postData(url, {
        from: data.account,
      }).then((res) => res.data);
      data.inviteDay = data.web3.utils.fromWei(res.invite_day, "ether");
      data.inviteTotal = data.web3.utils.fromWei(res.invite_total, "ether");
    };
    const generate = async() => {
      proxy.$toast("waiting", store.state.toast_info);
      const url = SEVER_HOST + 'invite/getInviteCode';
      const res = await postData(url,{
        Address: data.account
      })
      data.encodeData =
        window.location.host + "/#/mint?i=" + res.data;
      proxy.$toast("邀请链接已生成", store.state.toast_success);
      data.showModal = true;
    };
    const refData = toRefs(data);
    return {
      t,
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
  .rule_modal {
    font-size: 2rem;
    .content {
      max-width: 60%;
      margin: auto;
    }
  }
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
