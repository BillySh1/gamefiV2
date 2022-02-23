<template>
  <router-view v-show="canShow"></router-view>
  <div class="mask" v-show="!canShow">
    <img src="./assets/pack/bg_badge.svg" alt="" />
    <div class="text">请切换至正确的网络</div>
  </div>
</template>

<script>
import initWeb3 from "./utils/initWeb3";
const acceptNetWorks = [ 97];
export default {
  name: "App",
  data() {
    return {
      canShow: true,
    };
  },
  methods: {
    watchChain() {
      window.ethereum.on("chainChanged", async () => await this.judge());
    },
    async judge() {
      let chainId = await this.Web3.eth.getChainId();
      if (!acceptNetWorks.includes(chainId)) {
        this.canShow = false;
      } else {
        this.canShow = true;
      }
    },
    async init() {
      await initWeb3.Init(
        (addr) => {
          this.account = addr;
        },
        (provider) => {
          this.Web3 = provider;
        }
      );
    },
  },
  async created() {
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
  img {
    position: absolute;
    top: 50%;

    width: 100%;
  }
}
</style>
