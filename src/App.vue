<template>
  <AudioBox />
  <router-view v-if="correctChainId && connected && !loading"></router-view>
  <ConnectWalletModal
    :value="modalShow"
    :mobile="isMobile"
    @connect="() => connect()"
    @close="() => (modalShow = false)"
  />
  <GlobalLoading v-if="loading" @finish="() => (loading = false)" />
  <div class="mask black" v-if="(!connected || !correctChainId) && !loading">
    <img
      class="badge"
      src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/common/hero_sit.png"
      alt=""
    />
    <div class="logo">
      <img class="logo_img" src="./assets/loading/logo.svg" alt="" />
      <img class="divider" src="./assets/loading/divider.png" alt="" />

      <div class="text">
        <div v-show="!connected">Please connect your wallet first</div>
        <div v-show="!correctChainId && connected">Wrong Network</div>

        <div class="btn" v-show="!connected">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/allstar_assets/all_stars/entry/btn_bg.png"
            alt=""
          />
          <div class="inner" @click="() => (modalShow = true)">
            Connect
          </div>
        </div>
        <div class="btn" v-show="isMobile && !correctChainId && connected">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/allstar_assets/all_stars/entry/btn_bg.png"
            alt=""
          />

          <div class="inner" @click="switchNetWork">Switch</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import initWeb3 from "./utils/initWeb3";
import GlobalLoading from "./components/global_loading.vue";
import ConnectWalletModal from "./components/connect_wallet_modal.vue";
import AudioBox from "./components/audio.vue";
const acceptNetWorks = [56];
export default {
  name: "app",
  components: {
    GlobalLoading,
    ConnectWalletModal,
    AudioBox,
  },
  data() {
    return {
      correctChainId: false,
      connected: false,
      account: "",
      Web3: "",
      loading: true,
      modalShow: false,
    };
  },
  computed: {
    isMobile() {
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    watchChain() {
      window.ethereum.on("chainChanged", async () => await this.judge());
    },
    async disconnect() {
      this.account = "";
      await this.judge();
    },
    async connect() {
      try {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (acc) => {
            if (acc && acc.length) {
              this.account = acc[0];
            }
            await this.judge();
          });
      } catch (error) {
        console.log("User denied account access", error);
      }
    },
    switchNetWork() {
      const tp = require("tp-js-sdk");
      tp.close();
    },
    async judge() {
      let chainId;
      if (window.ethereum) {
        chainId = window.ethereum.chainId || window.ethereum.eth_chainId();
      } else {
        chainId = await this.Web3.eth.getChainId();
      }
      if (!acceptNetWorks.includes(chainId)) {
        this.correctChainId = false;
      } else {
        this.correctChainId = true;
      }
      if (!this.account || this.account.length === 0) {
        this.connected = false;
      } else {
        this.connected = true;
      }
    },
    async initWeb3Status() {
      await initWeb3.Init(
        (addr) => {
          this.account = addr;
        },
        (provider) => {
          this.Web3 = provider;
        }
      );
    },
    async init() {
      await this.initWeb3Status();
      window.ethereum.on("accountsChanged", async (acc) => {
        this.account = acc[0];
        await this.judge();
      });
    },
  },
  beforeUnmount() {
    window.removeEventListener("disconnet_wlt", true);
  },
  async mounted() {
    window.addEventListener("disconnet_wlt", this.disconnect);
    await this.init();
    this.watchChain();
    this.judge();
  },
};
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  .badge {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
  .logo {
    position: absolute;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo_img {
      width: 40rem;
    }
    .divider {
      width: 60rem;
      margin: 2rem 0;
    }
    .text {
      font-size: 2rem;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-bottom: 1rem;
      }
      .btn {
        display: block;
        position: relative;
        width: 12rem;
        height: auto;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
        .inner {
          cursor: pointer;
          position: absolute;
          top: 1rem;
          left: 50%;
          transform: translate(-50%, 0);
          white-space: nowrap;
        }
      }
    }
  }
}
.black {
  background: black;
}
</style>
