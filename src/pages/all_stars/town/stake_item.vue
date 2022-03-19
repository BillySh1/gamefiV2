<template>
  <div class="stake_item">
    <div class="empty">
      <img src="../../../allstar_assets/stake/add.png" alt="" />
    </div>
  </div>
  <div class="power_box">
    <div>战力值</div>
    <div>9999</div>
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
export default {
    name: 'stake_item',
      setup() {
          const data = reactive({
              info:''
          })
          onBeforeMount(() => {
          })
          onMounted(() => {
          })
          const refData = toRefs(data);
          return {
              ...refData,
          }

      }
  };
</script>
<style lang='less' scoped>
.stake_item {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: relative;
  width: 100%;
  height: 90%;
  background: url("../../../allstar_assets/stake/stake_item_bg.png") no-repeat;
  background-size: 100% 100%;
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    img {
      width: 100%;
    }
  }
}
.power_box {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}
</style>