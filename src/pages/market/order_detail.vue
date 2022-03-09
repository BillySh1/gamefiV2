<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div v-if="minting || loading" class="content">
      <Lottie v-if="minting" :options="lottie_minting_options" />
      <Lottie
        v-if="loading"
        :options="{
          animationData: require('../../assets/common/loading.json'),
        }"
      />
    </div>

    <div v-else class="content">
      <div class="left_c">
        <div class="img_box">
          <HeroCardItem :info="info" />
        </div>
      </div>
      <div class="right_c">
        <div class="right_c_title">
          <div class="right_c_title_value">
            <div class="name_zone">
              <img src="../../assets/market/order/name_divider.png" alt="" />
              <div class="inner">
                {{ info.name }}
              </div>
            </div>
            <div class="price_zone">
              <img src="../../assets/common/mmc.png" alt="" />
              {{ getPrice }}
            </div>
          </div>
        </div>
        <div class="right_c_content">
          {{ info.intro }}
        </div>
        <div class="right_c_action">
          <div class="right_c_btn" @click="btnClick">
            <img class="btn_img" src="../../assets/mint/btn.png" alt="" />
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
import initWeb3 from "../../utils/initWeb3.js";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import HeroCardItem from "../../components/hero_card_item.vue";
import useHeroDetail from "../../utils/useHeroDetail";

export default {
  name: "order_detail",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    HeroCardItem,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      info: "",
      price: 1000,
      pageTitle: "订单详情",
      web3: "",
      account: "",
      btnStatus: 0,
      rawData: [],
      minting: false,
      loading: false,
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
    });
    const lottie_minting_options = computed(() => {
      return {
        animationData: require(`../../assets/mint/type${data.info.key}.json`),
      };
    });
    const getPrice = computed(() => {
      return data.web3.utils.fromWei(data.info.price.toString(), "ether");
    });
    const btnClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus === 1) {
        await push();
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(`等待授权`, store.state.toast_info);
        const c = store.state.c_mmc;
        const addr = store.state.c_exchange.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const value = data.info.price;
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
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const push = async () => {
      try {
        proxy.$toast("等待购买", store.state.toast_info);
        const c = store.state.c_exchange;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .exchange(data.info.tokenId)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.exchange(data.info.tokenId).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("购买成功", store.state.toast_success);
          router.push({
            name: "pack",
          });
        }
      } catch (e) {
        proxy.$toast("购买失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };

    const btnText = computed(() => {
      return ["授权", "购买"][data.btnStatus];
    });
    const getCurInfo = async () => {
      try {
        const c = store.state.c_exchange;
        const res = await c.methods
          .getExchangeList("0x0000000000000000000000000000000000000000")
          .call();
        if (!res.length) {
          return;
        }
        res.map(({ detail, order }) => {
          const uid =
            detail.camp.toString() +
            detail.rarity.toString() +
            detail.heroId.toString();
          data.rawData.push({
            tokenId: detail.tokenId,
            heroId: detail.heroId,
            rarity: detail.rarity,
            quality: detail.quality,
            properties: detail.properties.map((x) => Number(x) / 100),
            power: detail.power,
            star: detail.star,
            rebirthTimes: detail.rebirthTimes,
            preference: detail.preference,
            native: detail.native,
            level: detail.level,
            camp: detail.camp,
            addition: detail.addition,
            uid: uid,
            ...useHeroDetail(uid, detail.preference),
            creator: order.creator,
            price: order.price,
          });
        });
        data.info = data.rawData.find((x) => {
          return x.tokenId == route.query.tokenId;
        });
      } catch (e) {
        console.log(e);
        proxy.$toast("获取订单详情失败", store.state.toast_error);
      }
    };
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
      await getCurInfo();
      data.loading = false;
    });

    const refData = toRefs(data);
    return {
      ...refData,
      btnText,
      btnClick,
      lottie_minting_options,
      getPrice,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/market/bg.png") no-repeat;
  background-size: 100% 100%;
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left_c {
  width: 30%;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  margin: auto;
}
.img_c {
  max-width: 70%;
  max-height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
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
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.right_c_title {
  display: flex;
  align-items: center;
}
.right_c_title_value {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  .name_zone {
    position: relative;
    width: 60%;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      font-size: 2rem;
    }
  }
  .price_zone {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 2rem;
    img {
      width: 2rem;
    }
  }
}
.right_c_title_badge {
  max-width: 200%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.right_c_price {
  display: flex;
  align-items: center;
  margin-left: 3rem;
  font-family: zihun129;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
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
    width: 15rem;
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
  font-size: 1.8rem;
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
