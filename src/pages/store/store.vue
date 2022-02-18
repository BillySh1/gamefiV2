<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <div class="tabs">
        <div
          :class="item.key == curType ? 'tab_item active' : 'tab_item'"
          v-for="item in storeInfos"
          :key="item.key"
          @click="() => (curType = item.key)"
        >
          <img :src="item.img" />
          <div class="text">{{ item.name }}</div>
        </div>
      </div>
      <img class="role_img" :src="mainImg" alt="" />
      <div class="store_zone">
        <div class="store_inner">
          <img src="../../assets/store/store.svg" alt="" />
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount, computed} from 'vue'
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
            ]
          })
        const pageTitle = computed(()=> {
              return ['战备商店','阴间商店','宝石商店'][data.curType]
          })
        const mainImg = computed(()=>{
            return require(`../../assets/store/${data.curType}_img.svg`)
        })
          onBeforeMount(() => {
          })

          const refData = toRefs(data);
          return {
              ...refData,
              pageTitle,
              mainImg

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
    width: 15rem;
    cursor: pointer;
    position: relative;
    filter: grayscale(100%);
    img {
      width: 100%;
      margin: 2rem 0;
    }
    .text {
      position: absolute;
      font-size: 4rem;
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
}
.store_zone{
  position: absolute;
  
}
</style>
