<template>
  <div class="container">
    <CommonPageHeader title="招贤纳士" />
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
            <img
              class="price_icon"
              src="../../assets/mint/price_icon.svg"
              alt=""
            />
            <span class="swiper_price_value" style="margin-left: 3rem">{{
              item.price
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
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import initWeb3 from "../../utils/initWeb3.js";
import "swiper/swiper.less";
export default {
  name: "mint",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      activeIndex: 0,
      blindBoxes: [
        {
          key: 0,
          img: require("../../assets/mint/type_0.png"),
          price: 5000,
          title: "校尉腰牌",
          bg: require("../../assets/mint/type0_bg.png"),
          maxWidth: 180,
          maxHeight: 344,
          offsetX: "-45%",
          offsetY: "-40%",
        },
        {
          key: 1,
          img: require("../../assets/mint/type_1.png"),
          price: 10000,
          title: "鎏金虎符",
          bg: require("../../assets/mint/type1_bg.png"),
          maxWidth: 430,
          maxHeight: 157,
          offsetX: "-50%",
          offsetY: "-50%",
        },
        {
          key: 2,
          img: require("../../assets/mint/type_2.png"),
          price: 30000,
          title: "传国玉玺",
          bg: require("../../assets/mint/type2_bg.png"),
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
      await getPrice();
    });
    const getPrice = async () => {
      const c = store.state.c_recruit;
      const res = await c.methods.getBlindBoxPrice().call();
      if (res.length) {
        const priceMap = res.map((x) => data.web3.utils.fromWei(x, "ether"));
        priceMap.forEach((i, idx) => {
          data.blindBoxes[idx].price = i;
        });
      }
    };
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
  font-family: zihun129;
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
