<template>
  <div v-if="value" class="modal_mask" @click="() => $emit('close')">
    <div
      class="inner"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <div class="content">
        <div class="header">
          <div class="text">连接钱包</div>
          <div class="close" @click="() => $emit('close')">x</div>
        </div>
        <div class="wallets">
          <div
            :class="item.disable ? 'item disable' : 'item'"
            v-for="(item, index) in walletMaps"
            v-show="item.display"
            :key="index"
            @click="
              () => {
                $emit('connect');
                $emit('close');
              }
            "
          >
            <img :src="item.img" />
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
export default {
  name: "connect_wallet_modal",
  props: ["value", "mobile"],
  setup(prop) {
    const data = reactive({
      walletMaps: [
        {
          name: "Metamask",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/wallets/meta_mask.svg",
          display: !prop.mobile,
        },
        {
          name: "TokenPocket",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/wallets/token_pocket.svg",
          display: prop.mobile,
        },
        {
          name: "Trust Wallet",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/wallets/trust_wallet.svg",
          display: !prop.mobile,
        },
        {
          name: "Coin 98",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/wallets/coin_98.svg",
          display: !prop.mobile,
        },
        {
          name: "WalletConnect",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/wallets/wallet_connect.svg",
          display: true,
          disable: true,
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
<style lang='less' scoped>
.modal_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  .inner {
    @media screen and (max-height: 400px) {
      width: 30rem;
    }
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25rem;
    min-height: 20rem;
    background: linear-gradient(
      180deg,
      rgba(41, 22, 22, 0.54) 0%,
      #291616 100%
    );
    border-radius: 20px;
    border: 1px solid #765b34;
  }
}
.content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  .header {
    background: linear-gradient(139.73deg, #765b34 0%, #280505 100%);
    border-bottom: 1px solid rgb(56, 50, 65);
    border-radius: 20px 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    .text {
      margin-left: 1.5rem;
      font-size: 1.5rem;
    }
    .close {
      font-family: sans-serif;
      transform: translateX(-200%);
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      font-size: 2rem;
    }
  }
  .wallets {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem;
    .item {
      font-family: SF Pro Text;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 2rem;
      &:hover {
        opacity: 0.8;
      }
      width: calc(100% / 2 - 2rem);
      font-size: 1rem;
      img {
        width: 35%;
        margin-bottom: 1rem;
      }
    }
    .disable {
      pointer-events: none;
      user-select: none;
      filter: grayscale(100);
    }
  }
}
</style>