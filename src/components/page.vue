<template>
  <div class="page_box">
    <div
      v-for="(item, index) in page_num"
      :key="index"
      :class="cur_page == item ? 'page_item active' : 'page_item'"
      @click="()=>change(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'page',
      setup() {
          console.log('1-开始创建组件-setup')
          const data = reactive({
              page_num:[1,2,3,4,5,6],
              cur_page:1,
          })
          onBeforeMount(() => {
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const change = (item)=>{
              data.cur_page = item;
              
          }
          const refData = toRefs(data);
          return {
              ...refData,
              change
          }

      }
  };
</script>
<style lang="less" scoped>
.page_box {
  display: flex;
  align-items: center;
  .page_item {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    font-size: 1.3rem;
    color: white;
    border-radius: 99rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
  .active {
    background: rgba(0, 0, 0, 0.17);
    border: 1px solid rgba(255, 255, 255, 0.13);
  }
}
</style>
