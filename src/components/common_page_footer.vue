<template>
  <div class="box">
    <div
      class="back_to_home"
      v-show="$route.name != 'home'"
      @click="() => $router.push({ name: 'home' })"
    >
      <div class="text">主页</div>
    </div>
    <div class="swap">
      <img class="img" src="../assets/common/mmc_logo.svg" alt="" />
      <div class="text">Swap</div>
    </div>
    <div class="menu">
      <div
        v-for="item in menuList"
        :key="item.key"
        class="menu_item"
        @click="() => $router.push({ name: item.href })"
      >
        <img class="img" :src="item.img" alt="" />
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="call" @click="() => $router.push({ name: 'mint' })">
      <img class="img" src="../assets/common/call.png" alt="" />
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import {useRoute} from 'vue-router'
export default {
    name: 'common_page_footer',
      setup() {
        const route = useRoute()
          console.log('1-开始创建组件-setup')
          const data = reactive({
              menuList:[
                  {
                      key:'pack',
                      img:require('../assets/common/pack.svg'),
                      href:'pack',
                      text:'背包'
                  },
                  {
                      key:'market',
                      img:require('../assets/common/market.svg'),
                      href:'market',
                      text:'市场'
                  },
                  {
                      key:'exchange',
                      img:require('../assets/common/exchange.svg'),
                      href:'exchange',
                      text:'兑换'
                  },
                  {
                      key:'store',
                      img:require('../assets/common/store.svg'),
                      href:'store',
                      text:'战备'
                  },
                  {
                      key:'reborn',
                      img:require('../assets/common/reborn.svg'),
                      href:'reborn',
                      text:'重生'
                  },
                  {
                      key:'mix',
                      img:require('../assets/common/mix.svg'),
                      href:'mix',
                      text:'进阶'
                  },
              ]
          })
          onBeforeMount(() => {
            console.log(route.name,'sss')
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(45, 40, 40, 0) -27.5%,
    #2e1a09 172.5%
  );
  border-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0) 1.88%,
      rgba(255, 249, 227, 0.44) 26.35%,
      #fff9e3 41.35%,
      #fff9e3 90.21%,
      rgba(255, 255, 255, 0) 100%
    )
    1;
  border-top: 1px solid;
}
.back_to_home {
  cursor: pointer;
  height: 10rem;
  border-right: 1px solid;
  border-image-source: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 9.16%,
    #fff9e3 18.24%,
    #ffffff 55.22%,
    #fff9e3 85.85%,
    rgba(255, 255, 255, 0) 94.35%
  );
  border-image-slice: 1;
  transform: skewX(-15deg);
  display: flex;
  align-items: center;
  .text {
    background: linear-gradient(127.89deg, #bf9c68 28.12%, #946e36 66.75%);
    background-clip: text;
    font-size: 4rem;
    color: transparent;
    transform: skewX(15deg);
    margin-left: 4rem;
    margin-right: 8rem;
  }
}
.swap {
  display: flex;
  align-items: center;
  font-size: 4rem;
  font-weight: 400;
  margin-left: 2rem;
  .text {
    margin-left: 2rem;
  }
  .img {
    width: 6rem;
  }
}
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-image-source: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 9.16%,
    #fff9e3 18.24%,
    #ffffff 55.22%,
    #fff9e3 85.85%,
    rgba(255, 255, 255, 0) 94.35%
  );
  border-image-slice: 1;
  transform: skewX(-15deg);

  .menu_item {
    position: relative;
    transform: skewX(15deg);
    cursor: pointer;
    margin: 0 2.5rem;
    .img {
      height: 10rem;
    }
    .text {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 3rem;
      font-weight: 400;
    }
  }
}
.call {
  margin-right: 8rem;
  cursor: pointer;
  .img {
    height: 8rem;
  }
}
</style>
