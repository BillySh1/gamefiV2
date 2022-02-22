<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="tabs">
        <div
          :class="item.key == curType ? 'tab_item active' : 'tab_item'"
          v-for="item in storeInfos"
          :key="item.key"
          @click="
            () => {
              goodsIndex = 0;
              curType = item.key;
            }
          "
        >
          <img :src="item.img" />
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
      <img class="role_img" :src="mainImg" alt="" />
      <div class="store_zone">
        <div class="store_inner">
          <img
            v-show="showLeft"
            class="left"
            src="../../assets/store/left.svg"
            @click="changeGoodsIndex(-1)"
          />
          <img class="store_img" src="../../assets/store/store.svg" />
          <img
            v-show="showRight"
            class="right"
            src="../../assets/store/right.svg"
            @click="changeGoodsIndex(1)"
          />
          <div class="goods" @click="goodsClick">
            <div class="goods_inner">
              <div class="goods_text">
                <img src="../../assets/store/item/text_bg.svg" alt="" />
                <div class="value">{{ curCurgoods.name }}</div>
              </div>
              <img class="goods_img" :src="curCurgoods.img" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs, computed} from 'vue'
import {useRouter} from 'vue-router'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
import {useShopItems} from './use_shop_items.js'
export default {
    name: 'store',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {
        const router = useRouter();
          const data = reactive({
            info:'',
            curType:0,
            storeInfos:[
                {
                    key:0,
                    name:'战备',
                    img:require('../../assets/store/type0.png')
                },
                {
                    key:1,
                    name:'神谕',
                    img:require('../../assets/store/type1.png')
                },
                {
                    key:2,
                    name:'奇珍',
                    img:require('../../assets/store/type2.png')
                }
            ],
            goodsIndex:0,
            buyItems:useShopItems()
          })
        const pageTitle = computed(()=> {
              return ['战备商店','阴间商店','宝石商店'][data.curType]
          })
        const mainImg = computed(()=>{
            return require(`../../assets/store/type${data.curType}.png`)
        })
        const curCurgoods = computed(()=>{
          return data.buyItems[data.curType][data.goodsIndex]
        })
        const showLeft = computed(()=>{
          const arr = data.buyItems[data.curType]
          if(arr.length > 1 && data.goodsIndex > 0){
            return true
          }
          return false
        })
        const showRight = computed(()=>{
          const arr = data.buyItems[data.curType]
          if(arr.length > 1 && data.goodsIndex < arr.length-1){
            return true
          }
          return false
        })
        const changeGoodsIndex = (index)=>{
          data.goodsIndex += index
        }
        const goodsClick = ()=>{
          router.push({
            name:'storeDetail',
            query:{
              info: curCurgoods.value.tokenId
            }
          })
        }
          const refData = toRefs(data);
          return {
              ...refData,
              pageTitle,
              mainImg,
              curCurgoods,
              showLeft,
              showRight,
              changeGoodsIndex,
              goodsClick
          }

      }
  };
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url('../../assets/store/store_bg.png') no-repeat;
  background-size: cover;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabs {
  position: absolute;
  left: 3%;
  .tab_item {
    width: 7.5rem;
    cursor: pointer;
    position: relative;
    filter: grayscale(100%);
    img {
      width: 100%;
      margin: 1rem 0;
    }
    .text {
      position: absolute;
      font-size: 2rem;
      bottom: 10%;
      right: 0;
    }
  }
  .active {
    filter: none;
  }
}
.role_img {
  position: absolute;
  width: 35rem;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
}

.store_zone {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5rem;
}
.store_inner {
  position: relative;
  width: 100%;
  height: 100%;
  .store_img {
    width: 50rem;
    min-height: 50vmin;
  }
  .left {
    position: absolute;
    cursor: pointer;
    width: 2rem;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
  .right {
    position: absolute;
    cursor: pointer;
    width: 2rem;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
  }
  .goods {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    .goods_inner {
      position: relative;
      transform: translateY(2rem);
      .goods_text {
        width: 16rem;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        img {
          width: 100%;
          height: 100%;
        }
        .value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .goods_img {
        max-width: 20rem;
        max-height: 30rem;
      }
    }
  }
}
</style>
