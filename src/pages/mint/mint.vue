<template>
  <div class="container">
    <CommonPageHeader :title="$t('draw')" />
    <InjectGoBack />
    <div class="content">
      <Swiper
        :slidesPerView="3"
        :loop="true"
        :centeredSlides="true"
        @slideChange="onSlideChange"
      >
        <SwiperSlide
          style="cursor: pointer"
          v-for="item in blindBoxes"
          :key="item.key"
          @click="
            () => {
              $router.push({
                name: 'mint_detail',
                query: {
                  info: JSON.stringify(blindBoxes[activeIndex]),
                },
              });
            }
          "
        >
          <div
            :class="
              activeIndex == item.key ? 'swiper_title_active' : 'swiper_title'
            "
          >
            {{ item.title }}
          </div>
          <div :class="activeIndex == item.key ? 'active_img_box' : 'img_box'">
            <img
              :style="{
                transform: `translate(${item.offsetX + ',' + item.offsetY})`,
              }"
              class="img_bg"
              :src="item.img"
            />
            <img
              :class="activeIndex == item.key ? 'rotate' : ''"
              style="width: 100%; heihgt: 100%"
              :src="item.bg"
            />
          </div>

          <div class="price_box" v-show="activeIndex == item.key">
            <!-- <img
              class="price_icon"
              src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/exchange/usdt.png"
              alt=""
            /> -->
            <span> Minted </span>
            <span class="swiper_price_value" style="margin-left: 3rem">{{
              minted
            }}</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
// import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3.js";
import "swiper/swiper.less";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { SEVER_HOST } from "../../utils/constants";
import postData from "../../utils/useFetch";
import { useStore } from "vuex";
export default {
  name: "mint",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    Swiper,
    SwiperSlide,
    InjectGoBack,
  },
  setup() {
    // const store = useStore();
    const route = useRoute();
    const store = useStore();
    const { t } = useI18n();
    const data = reactive({
      activeIndex: 0,
      minted: 0,
      blindBoxes: [
        {
          key: 0,
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type_0.png",
          price: 30,
          title: t("drawQuality1"),
          bg: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type0_bg.png",
          maxWidth: 180,
          maxHeight: 344,
          offsetX: "-45%",
          offsetY: "-40%",
        },
        {
          key: 1,
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type_1.png",
          price: 100,
          title: t("drawQuality2"),
          bg: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type1_bg.png",
          maxWidth: 430,
          maxHeight: 157,
          offsetX: "-50%",
          offsetY: "-50%",
        },
        {
          key: 2,
          img: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type_2.png",
          price: 300,
          title: t("drawQuality3"),
          bg: "https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/mint/type2_bg.png",
          maxWidth: 311,
          maxHeight: 337,
          offsetX: "-60%",
          offsetY: "-50%",
        },
      ],
      account: "",
      web3: "",
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
      if (route.query && route.query.i) {
        const temp = await getInvite();
        localStorage.setItem("invite", temp);
      }
      // await getPrice();
      await getMinted();
    });
    const getInvite = async () => {
      const encode = route.query.i;
      const url = SEVER_HOST + "invite/getAddress";
      const res = await postData(url, {
        invite_code: encode,
      });
      return res.data || "";
    };
    const getMinted = async () => {
      const c = store.state.c_recruit;
      const res = await c.methods.getBlindBoxNumber(0).call();
      data.minted = 50000 - res
    };
    // const getPrice = async () => {
    //   const c = store.state.c_recruit;
    //   const res = await c.methods.getBlindBoxPrice().call();
    //   if (res.length) {
    //     const priceMap = res.map((x) => data.web3.utils.fromWei(x, "ether"));
    //     priceMap.forEach((i, idx) => {
    //       data.blindBoxes[idx].price = i;
    //     });
    //   }
    // };
    const onSlideChange = (e) => {
      data.activeIndex = e.realIndex;
    };
    return {
      ...toRefs(data),
      onSlideChange,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
}
.content {
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-around;
}

.swiper_title {
  font-size: 1.5rem;
  color: #a5a5a5;
  transform: translateY(2.5rem);
  transition: 500ms;
}
.swiper_title_active {
  font-size: 1.75rem;
  color: #f2dbb9;
}

.swiper_price_value {
  font-size: 2rem;
  letter-spacing: 0.1em;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17rem;
  height: 17rem;
  margin: auto;
  transition: 500ms;
  transform: translateY(5rem);
  filter: grayscale(100%);
}
.active_img_box {
  position: relative;
  width: 20rem;
  height: 20rem;
  filter: none;
  margin: auto;
}
.img_bg {
  max-width: 80%;
  max-height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 99;
}
.price_box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.price_icon {
  width: 2rem;
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
</style>
