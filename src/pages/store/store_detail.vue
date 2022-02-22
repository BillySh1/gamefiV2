<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="left_c">
        <div class="img_box">
          <img
            :style="{
              transform: `translate(${info.offsetX + ',' + info.offsetY})`,
            }"
            class="img_c"
            :src="info.img"
          />
          <img class="img_bg" src="../../assets/store/buy_item_bg.png">
        </div>
      </div>
      <div class="right_c">
        <div class="right_c_title">
          <div class="right_c_title_value">
            {{ info.name }}
            <img
              class="right_c_title_badge"
              src="../../assets/common/active_title.png"
            />
          </div>
          <div class="right_c_price">
            <img
              style="margin-right: 2rem"
              src="../../assets/mint/price_icon.svg"
            />
            <span>{{ info.price }}</span>
          </div>
        </div>
        <div class="right_c_content">
          随机开出不同品质的卡牌, 卡牌共具有五种品质 每种品质的特性不尽相同
        </div>
        <div class="right_c_content">
          随机开出不同品质的卡牌, 卡牌共具有五种品质 每种品质的特性不尽相同
        </div>
        <div class="right_c_action">
          <div class="input_box">
            <img
              style="cursor: pointer"
              class="img_action"
              src="../../assets/mint/minus.svg"
              alt=""
            />
            <div class="ipt_bg">
              <img class="ipt_img" src="../../assets/mint/input.svg" alt="" />
              <input v-model="buyValue" class="input" type="text" />
            </div>
            <img
            class="img_action"
              style="cursor: pointer"
              src="../../assets/mint/add.svg"
              alt=""
            />
          </div>

          <div
            class="right_c_btn"
            @click="
              () => {
                $router.push({
                  name: 'buySuccess',
                  query: {
                    info: info.tokenId,
                  },
                });
              }
            "
          >
            <img class="btn_img" src="../../assets/mint/btn.svg" alt="" />
            <div class="richt_c_btn_value">购买</div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount} from 'vue'
import {useRoute} from 'vue-router'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
import {useGetShopDetailByTokenId} from './use_shop_items.js'
export default {
    name: 'mint_detail',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {
        const route = useRoute();
          const data = reactive({
            info:'',
            buyValue:1,
            pageTitle:'购买详情'
          })

          onBeforeMount(() => {
            data.info = useGetShopDetailByTokenId(route.query.info)
          })

          const refData = toRefs(data);
          return {
              ...refData,
              useGetShopDetailByTokenId

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
  .img_bg{
    width: 100%;
  }
}
.img_c {
  max-width: 70%;
  max-height: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
}
.right_c_title {
  display: flex;
  align-items: center;
}
.right_c_title_value {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
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
  font-family: zihun129hao-baihexinfengti;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
}
.right_c_content {
  font-family: FZYanZhenQingKaiShuJF;
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
  .img_action{
    width: 2rem;
  }
  .ipt_img{
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
  transform: translate(-50%, -50%);
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
  .btn_img{
    max-width: 10rem;
  }
}
.richt_c_btn_value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: FZYanZhenQingKaiShuJF;
  font-size: 2rem;
}
</style>
