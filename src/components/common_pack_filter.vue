<template>
  <div class="filter_box">
    <div class="text">筛选</div>
  </div>
  <div v-if="value" class="box" >
     <div  v-for="(item, index) in filters" :key="index" class="filter_item">
    <div class="left">
      {{item.name}}
    </div>
    <div class="right">
      <div class="item" v-for="i in item.items" :key="i.key" >
        <img :src="i.img" alt="">
      </div>
    </div>
  </div>
  </div>
 
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "common_pack_filter",
  props: ["value"],
  setup() {
    const data = reactive({
      filters: [
        {
          name: "稀有度",
          key: "rarity",
          items: [
            {
              key: 0,
              img: require("../assets/pack/filter/rarity/0.png"),
            },
            {
              key: 1,
              img: require("../assets/pack/filter/rarity/1.png"),
            },
            {
              key: 2,
              img: require("../assets/pack/filter/rarity/2.png"),
            },
            {
              key: 3,
              img: require("../assets/pack/filter/rarity/3.png"),
            },
            {
              key: 4,
              img: require("../assets/pack/filter/rarity/4.png"),
            },
          ],
        },
      ],
    });
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.filter_box {
  &:hover {
    opacity: 1;
  }
  opacity: 0.6;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  background: linear-gradient(
    89.54deg,
    rgba(102, 99, 29, 0.5) -138.99%,
    rgba(0, 0, 0, 0.5) -54.05%,
    rgba(162, 95, 33, 0.5) 19.67%,
    rgba(131, 43, 20, 0.5) 98.2%,
    rgba(255, 101, 101, 0.5) 168.72%
  );
  border-radius: 99px;
  border: 1px solid #3e3002;
  .text {
    font-size: 1.5rem;
  }
}
.box{
  background: rgba(0, 0, 0, 0.25);
}
.filter_item {
  height: 4rem;
  display: flex;
  margin: 2rem 0;
  .left {
    height: 100%;
    background: rgba(101, 31, 31, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 200px;
  }
  .right{
    display: flex;
    align-items: center;
    .item{
      height: 100%;
      img{
        height: 100%;
      }
    }
  }
}
</style>
