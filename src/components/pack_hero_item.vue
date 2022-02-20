<template>
  <div class="power_box">
    <div class="card_content">
      <img src="../assets/mix/temp_card.svg" alt="" />
    </div>
    <div class="power_zone">
      <div class="zone_inner">
        <div class="value_box">
          <img class="part" src="../assets/pack/power_text_left.svg" alt="" />
          <div class="text">战力</div>
          <img class="part" src="../assets/pack/power_text_right.svg" alt="" />
        </div>
        <img class="power_img" src="../assets/pack/power_img.svg" />
        <div class="power_value">9,99999</div>
      </div>
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
.power_box {
  position: relative;
  height: 100%;
  border: 1px solid #946e36;
  border-radius: 1rem;
  .card_content {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .power_zone {
    position: absolute;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(41, 22, 22, 0) -20.99%,
      rgba(37, 2, 2, 0.8) 100%
    );
    height: 50%;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    display: flex;
    .zone_inner {
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      place-self: flex-end;
      justify-content: space-around;
      .value_box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .part {
          display: block;
          width: 30%;
        }
        .text {
          font-size: 1.5rem;
          margin: 0 1rem;
          white-space: nowrap;
        }
      }
    }

    .power_value {
      font-family: SF Pro Text;
      font-size: 2rem;
      font-style: italic;
      font-weight: 700;
    }
  }
}
</style>
