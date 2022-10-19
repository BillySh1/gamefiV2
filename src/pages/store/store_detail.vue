<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack v-if="!loading" />
    <img
      class="badge"
      src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/mint_detail_bg_badge.png"
      alt=""
    />
    <Lottie v-if="loading" :options="lottie_options" />
    <div v-else class="content">
      <div class="left_c">
        <div class="img_box">
          <img
            :style="{
              transform: `translate(${info.offsetX + ',' + info.offsetY})`,
            }"
            class="img_c"
            :src="info.img"
          />
          <img class="img_bg" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/store/buy_item_bg.png" />
        </div>
      </div>
      <div class="right_c">
        <img class="blood" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/blood.png" alt="" />
        <div class="right_c_title">
          <div class="right_c_title_value">
            {{ info.name }}
            <img
              class="right_c_title_badge"
              src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/active_title.png"
            />
          </div>
          <div class="right_c_price">
            <img
              style="margin-right: 2rem"
              :src="
                payment == 1
                  ? 'https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/exchange/coin.png'
                  : 'https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/mmc.png'
              "
            />
            <span>{{ totalPrice }}</span>
          </div>
        </div>
        <div class="right_c_content">
          {{ info.intro }}
        </div>

        <div class="right_c_action">
          <div class="input_box">
            <img
              style="cursor: pointer"
              class="img_action"
              src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/minus.svg"
              @click="
                () => {
                  const temp = buyValue - 1;
                  if (temp < 0) {
                    buyValue = 0;
                    return;
                  }
                  buyValue = temp;
                }
              "
            />
            <div class="ipt_bg">
              <img class="ipt_img" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/input.png" alt="" />
              <input
                v-model="buyValue"
                class="input"
                @input="
                  buyValue = Number($event.target.value.replace(/\D+/, ''))
                "
              />
            </div>
            <img
              class="img_action"
              style="cursor: pointer"
              src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/add.svg"
              @click="
                () => {
                  buyValue += 1;
                }
              "
            />
          </div>

          <div class="right_c_btn" @click="btnClick">
            <img class="btn_img" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/mint/btn.png" alt="" />
            <div class="richt_c_btn_value">{{ btnText }}</div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import { useGetShopDetailByTokenId } from "./use_shop_items.js";
import initWeb3 from "../../utils/initWeb3.js";
export default {
  name: "mint_detail",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      info: "",
      buyValue: 1,
      pageTitle: "购买详情",
      web3: "",
      account: "",
      singlePrice: null,
      payment: 0,
      loading: false,
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
      btnStatus: 0,
    });

    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.info = useGetShopDetailByTokenId(route.query.info);
      await getPrice();
      data.loading = false;
    });
    const totalPrice = computed(() => {
      return data.buyValue * Number(data.singlePrice);
    });
    const btnText = computed(() => {
      return ["授权", "购买"][data.btnStatus];
    });
    const getPrice = async () => {
      const c = store.state.c_richShop;
      const { price, priceToken } = await c.methods
        ._items(data.info.tokenId)
        .call();
      data.singlePrice = data.web3.utils.fromWei(price, "ether");
      data.payment = priceToken;
    };
    const btnClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus === 1) {
        await buy();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast("t('common_wait_approve')", store.state.toast_info);
        const c = data.payment == 1 ? store.state.c_m3t : store.state.c_mdao;
        const value = data.web3.utils.toWei(
          totalPrice.value.toString(),
          "ether"
        );
        const addr = store.state.c_richShop.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, value)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.approve(addr, value).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const buy = async () => {
      try {
        proxy.$toast("等待购买确认", store.state.toast_info);
        const c = store.state.c_richShop;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .buy(data.account, data.info.tokenId, data.buyValue)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods
          .buy(data.account, data.info.tokenId, data.buyValue)
          .send({
            gasPrice: gasPrice,
            gas: Number.parseInt(gas, 10),
            from: data.account,
          });

        if (res.status) {
          proxy.$toast("购买成功", store.state.toast_success);
          router.push({
            name: "buySuccess",
            query: {
              info: JSON.stringify(data.info),
              num: data.buyValue,
            },
          });
        }
      } catch (e) {
        proxy.$toast("购买失败", store.state.toast_error);
        console.log(e);
      }
      data.loading = false;
    };
    const refData = toRefs(data);
    return {
      ...refData,
      useGetShopDetailByTokenId,
      totalPrice,
      btnClick,
      btnText,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
  .badge {
    position: absolute;
    width: 50%;
    height: auto;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left_c {
  width: 40%;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  margin: auto;
  .img_bg {
    width: 100%;
  }
}
.img_c {
  max-width: 70%;
  max-height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate {
  animation: spin 60s infinite linear;
}
.right_c {
  position: relative;
  .blood {
    position: absolute;
    top: 0;
    right: 0;
    width: 15rem;
    transform: translate(50%, -50%);
  }
  width: 40%;
}
.right_c_title {
  display: flex;
  align-items: center;
}
.right_c_title_value {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 2rem;
}
.right_c_title_badge {
  max-width: 200%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.right_c_price {
  width: 2rem;
  display: flex;
  align-items: center;
  margin-left: 3rem;
  font-family: zihun129;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  img {
    width: 100%;
  }
}
.right_c_content {
  font-size: 1.5rem;
  text-align: left;
  color: #ffffff;
  margin: 1rem 0;
}
.right_c_action {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.input_box {
  display: flex;
  align-items: center;
  margin-right: 3rem;
  .img_action {
    width: 2rem;
  }
  .ipt_img {
    margin: 0 1rem;
    width: 12.5rem;
  }
}
.ipt_bg {
  position: relative;
  margin: 0 1rem;
}
.input {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  outline: none;
  background: transparent;
  border: none;
  text-align: center;
  font-size: 2.5rem;
  color: #f2dbb9;
}
.right_c_btn {
  position: relative;
  transform: scale(0.8);
  cursor: pointer;
  .btn_img {
    max-width: 10rem;
  }
}
.richt_c_btn_value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}
</style>
