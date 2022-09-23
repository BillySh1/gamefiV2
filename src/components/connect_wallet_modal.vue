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
          <div class="text">Connect Wallet</div>
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
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/wallets/meta_mask.svg",
          display: !prop.mobile,
        },
        {
          name: "TokenPocket",
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/wallets/token_pocket.svg",
          display: prop.mobile,
        },
        {
          name: "Trust Wallet",
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/wallets/trust_wallet.svg",
          display: !prop.mobile,
        },
        {
          name: "Kucoin Wallet",
          img: "data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%226%22%20fill%3D%22%2321C397%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.7973%2020.0025L23.2117%2027.1965L27.8917%2022.6563C28.7285%2021.9253%2030.0088%2021.9578%2030.8051%2022.7303C31.6014%2023.5028%2031.6349%2024.7448%2030.8814%2025.5567L24.7054%2031.5493C23.8758%2032.3408%2022.5453%2032.3408%2021.7157%2031.5493L12.8053%2022.9029V28.0421C12.8053%2029.1763%2011.8575%2030.0957%2010.6884%2030.0957C9.51921%2030.0957%208.57143%2029.1763%208.57143%2028.0421V11.9562C8.57143%2010.822%209.51921%209.90254%2010.6884%209.90254C11.8575%209.90254%2012.8053%2010.822%2012.8053%2011.9562V17.0954L21.7145%208.45124C22.5439%207.65916%2023.8749%207.65916%2024.7042%208.45124L30.8848%2014.4427C31.6383%2015.2546%2031.6048%2016.4966%2030.8085%2017.2691C30.0123%2018.0416%2028.732%2018.0741%2027.8951%2017.3431L23.2151%2012.8029L15.7973%2020.0025ZM23.2151%2017.9466C22.3579%2017.9461%2021.5848%2018.4467%2021.2564%2019.215C20.928%2019.9832%2021.109%2020.8676%2021.715%2021.4558C22.3211%2022.0441%2023.2327%2022.2202%2024.0247%2021.902C24.8167%2021.5839%2025.3332%2020.8341%2025.3332%2020.0025C25.3335%2019.4572%2025.1105%2018.9342%2024.7133%2018.5484C24.3161%2018.1626%2023.7772%2017.9458%2023.2151%2017.9455V17.9466Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E",
          display: !prop.mobile,
          disable: false,
        },
        {
          name: "WalletConnect",
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/assets/wallets/wallet_connect.svg",
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