<template>
  <div class="box">
    <div class="swap">
      <img src="../assets/common/mmc_logo.svg" alt="" />
      <div class="text">Swap</div>
    </div>
    <div class="menu">
      <div v-for="item in menuList" :key="item.key" class="menu_item">
        <img :src="item.img" alt="" />
        <div class="text">
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="call">
      <img src="../assets/common/call.png" alt="" />
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: '',
      setup() {
          console.log('1-开始创建组件-setup')
          const data = reactive({
              menuList:[
                  {
                      key:'pack',
                      img:require('../assets/common/pack.svg'),
                      href:'',
                      text:'背包'
                  },
                  {
                      key:'market',
                      img:require('../assets/common/market.svg'),
                      href:'',
                      text:'市场'
                  },
                  {
                      key:'exchange',
                      img:require('../assets/common/exchange.svg'),
                      href:'',
                      text:'兑换'
                  },
                  {
                      key:'store',
                      img:require('../assets/common/store.svg'),
                      href:'',
                      text:'战备'
                  },
                  {
                      key:'reborn',
                      img:require('../assets/common/reborn.svg'),
                      href:'',
                      text:'重生'
                  },
                  {
                      key:'mix',
                      img:require('../assets/common/mix.svg'),
                      href:'',
                      text:'进阶'
                  },
              ]
          })
          onBeforeMount(() => {
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
}
.swap {
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: 400;
  margin-left: 1rem;
  .text {
    margin-left: 0.5rem;
  }
}
.menu {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .menu_item {
    position: relative;
    margin: 0 1rem;
    .text {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 2rem;
      font-weight: 400;
    }
  }
}
.call {
  margin-right: 1rem;
}
</style>
