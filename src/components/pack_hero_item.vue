<template>
  <div class="power_box">
    <div class="card_content">
      <HeroCardItem :info="info" />
    </div>
    <div class="power_zone">
      <div class="zone_inner">
        <div class="value_box">
          <img class="part" src="../assets/pack/power_text_left.svg" alt="" />
          <div class="text">战力</div>
          <img class="part" src="../assets/pack/power_text_right.svg" alt="" />
        </div>
        <img class="power_img" src="../assets/pack/power_img.svg" />
        <div class="power_value">{{ info.power }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs} from 'vue'
import HeroCardItem from './hero_card_item'
export default {
    name: 'pack_hero_item',
    components:{
      HeroCardItem
    },
    props:['info'],
      setup() {
          const data = reactive({
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
  width: 100%;
  height: 100%;
  border: 1px solid #946e36;
  border-radius: 1rem;
  .card_content {
    position: absolute;
    width: 95%;
    height: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
