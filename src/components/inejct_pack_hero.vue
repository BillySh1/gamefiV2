<template>
  <div v-if="value" class="pack_container">
    <div class="pack_main">
      <div class="top_box">
        <img style="width: 2rem" src="../assets/common/back.svg" />
        222
      </div>
      <div class="content">
        <div class="badge">
          <img src="../assets/pack/hero_badge.svg" alt="" />
          <div class="text">蜀</div>
        </div>
        <div class="card_content">
          <div
            v-for="(item, index) in curShowItems"
            :key="index"
            class="card_item"
          >
            <PackHeroItem />
          </div>
        </div>
      </div>
      <div class="page_nation_box">
        <Page />
      </div>
      <img style="width: 100%" src="../assets/pack/bottom_border.svg" />
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount} from 'vue'
import PackHeroItem from './pack_hero_item'
import Page from './page'
export default {
    name: 'inject_pack_hero',
    props:['value'],
    components:{
        PackHeroItem,
        Page
    },
      setup() {

          const data = reactive({
            pageTitle:'我的背包',
            allItems:[],
            curShowItems:[1,2,3,4],
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
.pack_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.pack_main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .top_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    margin: 1rem 0;
    background: #471111;
    height: 25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    .badge {
      position: relative;
      height: 100%;
      img {
        height: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);
        width: 3rem;
        font-size: 3rem;
      }
    }
    .card_content {
      height: 100%;
      width: 80%;
      display: flex;
      align-items: center;
      gap: 2rem;
      .card_item {
        height: 100%;
        width: calc(100% / 4);
      }
    }
  }
  .page_nation_box {
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row-reverse;
  }
}
</style>
