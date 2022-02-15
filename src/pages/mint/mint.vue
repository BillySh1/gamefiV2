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
          @click="()=>{
            $router.push({
              name:'mint_detail',
              query:{
                type: activeIndex
              }
            })
          }"
        >
          <div
            :class="
              activeIndex == item.key ? 'swiper_title_active' : 'swiper_title'
            "
          >
            {{ item.title }}
          </div>
          <img
            :class="activeIndex == item.key ? 'active_img' : 'img'"
            :src="item.img"
            alt=""
          />
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
                title:'校尉腰牌'
              },
              {
                key:1,
                img:require('../../assets/mint/type1.svg'),
                price: 20000,
                title:'鎏金虎符'
              },
              {
                key:2,
                img:require('../../assets/mint/type2.svg'),
                price: 50000,
                title:'传国玉玺'
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
.img {
  width: 330px;
  transition: 500ms;
  transform: translateY(150px);
  filter: grayscale(100%);
}
.active_img {
  width: 430px;
  filter: none;
}
</style>
