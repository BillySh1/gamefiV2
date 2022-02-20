<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="type_bpx">
        <div v-for="item in routerItems" :key="item.key" class="item">
          <img :src="item.img" alt="" />
          <div class="text">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="bg_badge">
        <img class="badge" src="../../assets/pack/bg_badge.svg" alt="" />
        <img class="badge top" src="../../assets/pack/line.svg" alt="" />
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount} from 'vue'
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
            pageTitle:'我的背包',
            routerItems:[
              {key:0,name:'武将',img:require('../../assets/pack/0.svg')},
              {key:1,name:'装备',img:require('../../assets/pack/1.svg')},
              {key:2,name:'珍宝',img:require('../../assets/pack/2.svg')}
            ]
          })

          onBeforeMount(() => {
          })

          const refData = toRefs(data);
          return {
              ...refData,
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
  background: #280505;
}
.type_bpx {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  .item {
    &:hover{
      opacity: 1;
    }
    cursor: pointer;
    opacity: 0.8;
    img {
      width: 23rem;
    }
    .text {
      margin-top: 1rem;
      font-size: 2.5rem;
    }
  }
}
.bg_badge {
  position: absolute;
  bottom: 10%;
  width: 100%;
  .badge {
    width: 100%;
  }
  .top{
    transform: translateY(-1.5rem);
  }
}
</style>
