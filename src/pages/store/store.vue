<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="tabs">
        <div
          :class="item.key == curType ? 'tab_item active' : 'tab_item'"
          v-for="item in storeInfos"
          :key="item.key"
          @click="() => {
            goodsIndex = 0;
            curType = item.key
          }"
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
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
export default {
    name: 'store',
    components:{
        CommonPageHeader,
        CommonPageFooter
    },
      setup() {

          const data = reactive({
            info:'',
            curType:0,
            storeInfos:[
                {
                    key:0,
                    name:'军士',
                    img:require('../../assets/store/type0.svg')
                },
                {
                    key:1,
                    name:'孟婆',
                    img:require('../../assets/store/type1.svg')
                },
                {
                    key:2,
                    name:'宝石哥',
                    img:require('../../assets/store/type2.svg')
                }
            ],
            goodsIndex:0,
            buyItems:[
              [
                {key:0,img:require('../../assets/store/item/type_0_0.svg'),name:'粮草'},
                {key:1,img:require('../../assets/store/item/type_0_1.svg'),name:'战鼓'}
                ],
                [
                  {key:0,img:require('../../assets/store/item/type_1_0.svg'),name:'孟婆汤'},
                ],
                [
                  {key:0,img:require('../../assets/store/item/type_2_0.svg'),name:'幸运宝石'},
                  {key:1,img:require('../../assets/store/item/type_2_1.svg'),name:'天佑宝石'},
                  {key:2,img:require('../../assets/store/item/type_2_2.svg'),name:'神眷宝石'},
                ]
            ]
          })
        const pageTitle = computed(()=> {
              return ['战备商店','阴间商店','宝石商店'][data.curType]
          })
        const mainImg = computed(()=>{
            return require(`../../assets/store/${data.curType}_img.svg`)
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
          console.log('click', data.buyItems[data.curType][data.goodsIndex])
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
  bottom: 0;
  left: 10%;
  height: 80%;
}

.store_zone {
  position: absolute;

  transform: translateY(3rem);
  bottom: 0;
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
        max-width: 30rem;
        max-height: 40rem;
      }
    }
  }
}
</style>
