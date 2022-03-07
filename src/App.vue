<template>
  <router-view
    v-if="correctChainId && connected && !loading && (isMobile ? tp : true)"
  ></router-view>
  <GlobalLoading v-if="loading" @finish="() => (loading = false)" />
  <div
    class="mask black"
    v-if="(!connected || !correctChainId || (isMobile && !tp)) && !loading"
  >
    <img class="logo" src="./assets/common/logo.png" alt="" />
    <div class="text">
      <div v-show="!connected">未监测到钱包地址 请先连接钱包</div>
      <div v-show="!correctChainId">请切换至正确的网络</div>
      <div v-show="!tp && isMobile">
        请先下载TokenPocket进入
      </div>
      <div class="btn" v-show="!connected || !correctChainId">
        <img src="./assets/all_stars/entry/btn_bg.png" alt="" />
        <div v-if="!connected" class="inner" @click="connect">连接钱包</div>
        <div
          v-if="isMobile && !correctChainId"
          class="inner"
          @click="switchNetWork"
        >
          切换网络
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import initWeb3 from "./utils/initWeb3";
import GlobalLoading from "./components/global_loading.vue";
const acceptNetWorks = [97];
export default {
  name: "app",
  components: {
    GlobalLoading,
  },
  data() {
    return {
      correctChainId: false,
      connected: false,
      account: "",
      Web3: "",
      loading: true,
      tp: "",
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
      let chainId = await this.Web3.eth.getChainId();
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
  async mounted() {
    const tp = require('tp-js-sdk');
    this.tp = tp.isConnected()
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
  .logo {
    position: absolute;
    width: 80rem;
    height: auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    position: absolute;
    top: 40%;
    width: 100%;
  }
  .text {
    position: absolute;
    font-size: 1.5rem;
    top: 60%;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
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
.black {
  background: black;
}
</style>
