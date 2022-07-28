<template>
  <div class="wallet_box">
    <div class="chain_icon_box">
      <img
        class="chain_icon"
        src="../assets/index/chainIcon/bsc.svg"
        alt=""
      />
    </div>
    <div class="wallet_address">
      {{ walletValue }}
      <div class="drop_down">
        <div class="item" @click="$emit('exit')">断开连接</div>
        <div class="item" @click="controlAudio">{{ audioText }}</div>
        <div class="item" @click="jump2Swap">MemorySwap ></div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import initWeb3 from "../utils/initWeb3.js";
export default {
  name: "inject_wallet",
  setup() {
    const data = reactive({
      wallet: "连接钱包",
      web3: "",
      type: '',
    });
    const walletValue = computed(() => {
      const wallet = data.wallet;
      let res = wallet;
      if (wallet && wallet.length > 10) {
        res =
          wallet.slice(0, 5) +
          "..." +
          wallet.slice(wallet.length - 5, wallet.length);
        return res;
      }
      return "连接钱包";
    });
    const controlAudio = () => {
      const item = document.querySelector("audio");
      if (data.type) {
        item.pause();
        item.currentTime = 0;
        data.type = false
      } else {
        item.play();
        data.type = data.type = true
      }
    };
    const audioText = computed(() => {
      return data.type ? "关闭音乐" : "打开音乐";
    });
    const watchAcc = () => {
      if (!window.ethereum) return;
      window.ethereum.on("accountsChanged", function (a) {
        data.wallet = a;
      });
    };
    const connect = async () => {
      if (data.wallet.length > 10) return;
      await initWeb3.Init(
        (addr) => {
          data.wallet = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
    };
    onBeforeMount(async () => {
      data.type = sessionStorage.getItem('audio')
      watchAcc();
      await connect();
    });

    const refData = toRefs(data);
    return {
      ...refData,
      walletValue,
      audioText,
      watchAcc,
      controlAudio,
    };
  },
};
</script>
<style lang="less" scoped>
.wallet_box {
  display: flex;
  align-items: center;
}
.chain_icon_box {
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  margin-right: 0.5rem;
  background: rgba(0, 0, 0, .5);
  img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.wallet_address {
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding: 0.5rem 2rem;
  background: rgba(0, 0, 0, 0.5);
  font-family: Roboto;
  font-size: 1rem;
  border-radius: 10rem;
  .drop_down {
    display: none;
    position: absolute;
    transform: translate(-1rem, 0.5rem);
    background-color: rgba(0, 0, 0, 0.8);
    min-width: 10rem;
    border-radius: 1rem;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    .item {
      text-align: left;
      cursor: pointer;
      padding: 0.5rem 1rem;
      &:hover {
        opacity: 0.8;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
    }
  }
}
.wallet_address:hover .drop_down {
  display: block;
}
</style>
