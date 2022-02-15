<template>
  <div class="container">
    <CommonPageHeader />
    <div class="content">
      <Swiper
        :slidesPerView="3"
        :loop="true"
        :spaceBetween="50"
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
            <img src="../../assets/mint/price_icon.svg" alt="" />
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

<script lang="js">
import { reactive,toRefs} from 'vue'
import {Swiper, SwiperSlide} from 'swiper/vue'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
import 'swiper/swiper.less';
export default {
    name: 'mint',
    components:{
      CommonPageHeader,
      CommonPageFooter,
      Swiper,
      SwiperSlide
    },
      setup() {
          const data = reactive({
            activeIndex:0,
            blindBoxes:[
              {
                key: 0,
                img:require('../../assets/mint/type0.svg'),
                price: 5000,
                title:'校尉腰牌',
                bg: require('../../assets/mint/type0_bg.svg'),
                maxWidth: 180,
                maxHeight: 344,
                offsetX:"-45%",
                offsetY:'-40%'
              },
              {
                key:1,
                img:require('../../assets/mint/type1.svg'),
                price: 20000,
                title:'鎏金虎符',
                bg: require('../../assets/mint/type1_bg.svg'),
                maxWidth: 430,
                maxHeight: 157,
                offsetX:"-50%",
                offsetY:'-50%'
              },
              {
                key:2,
                img:require('../../assets/mint/type2.svg'),
                price: 50000,
                title:'传国玉玺',
                bg: require('../../assets/mint/type2_bg.svg'),
                maxWidth: 311,
                maxHeight: 337,
                offsetX:"-60%",
                offsetY:'-50%'
              },
            ]
          })

      const onSlideChange = (e) => {
        data.activeIndex = e.realIndex;
      };
          return {
              ...toRefs(data),
              onSlideChange
          }

      }
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
  font-family: FZYanZhenQingKaiShuJF;
  font-size: 3rem;
  color: #a5a5a5;
  transform: translateY(100px);
  transition: 500ms;
}
.swiper_title_active {
  font-family: FZYanZhenQingKaiShuJF;
  font-size: 3.75rem;
  color: #f2dbb9;
}

.swiper_price_value {
  font-family: zihun129hao-baihexinfengti;
  font-size: 4rem;
  letter-spacing: 0.1em;
}
.img_box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  height: 330px;
  margin: auto;
  transition: 500ms;
  transform: translateY(150px);
  filter: grayscale(100%);
}
.active_img_box {
  position: relative;
  width: 430px;
  height: 430px;
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
