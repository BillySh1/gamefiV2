<template>
  <div class="hero_card_box">
    <div class="border">
      <img class="border_img" :src="borderImg" />

      <div
        class="name"
        :style="`left:${nameTop};${
          $route.name == 'heroDetail' ? 'font-size:1.5rem' : ''
        }`"
      >
        {{ info.name }}
      </div>
      <div class="lv_t" :style="`left:${nameTop};`">lv</div>
      <div class="quality">
        <img :src="qualityImg" alt="" />
      </div>
      <div class="stars">
        <img
          v-for="(item, index) in stars"
          :key="index"
          src="../assets/cardImgs/hero/bg/star.png"
          alt=""
        />
      </div>
      <div
        class="camp"
        :style="`transform: translate( ${transform[0]}, ${transform[1]} )`"
      >
        <img :src="campImg.img" />
      </div>
    </div>
    <img class="hero" :src="heroImg" />
  </div>
</template>

<script lang='js'>
import { reactive,toRefs,onBeforeMount,computed} from 'vue'
import useHeroDetail from '../utils/useHeroDetail.js'
export default {
    name: 'hero_card_img',
    props:['info'],
      setup(prop) {
          console.log('1-开始创建组件-setup')
          const data = reactive({
              info:'',
              transform:''
          })
          const heroImg = computed(()=>{
              return useHeroDetail(data.info.uid).img
          })
          const borderImg = computed(()=>{
              return [require('../assets/cardImgs/hero/bg/r0.png'),
                      require('../assets/cardImgs/hero/bg/r1.png'),
                      require('../assets/cardImgs/hero/bg/r2.png'),
                      require('../assets/cardImgs/hero/bg/r3.png'),
                      require('../assets/cardImgs/hero/bg/r4.png')][data.info.rarity] || require('../assets/cardImgs/hero/bg/r4.png')
          })
          const qualityImg = computed(()=>{
              return [require('../assets/cardImgs/hero/bg/q0.png'),
              require('../assets/cardImgs/hero/bg/q1.png'),
              require('../assets/cardImgs/hero/bg/q2.png'),
              require('../assets/cardImgs/hero/bg/q3.png'),][data.info.quality]
          })
          const campImg = computed(()=>{
              return {
                  img:[require('../assets/cardImgs/hero/bg/c0.png'),
              require('../assets/cardImgs/hero/bg/c1.png'),
              require('../assets/cardImgs/hero/bg/c2.png'),
              require('../assets/cardImgs/hero/bg/c3.png'),
              ][data.info.camp],
              }
          })
          const stars = computed(()=>{
              const total = [1,3,4,5,10][data.info.rarity];
              const res = []
              for(let i =0; i< total; i++){
                res.push({
                    status: 0
                })
              }
              return res;
          })
          const nameTop = computed(()=>{
              return ['10%','8.5%','7%','7.5%','5%','5%'][data.info.rarity]
          })
          onBeforeMount(() => {
              data.info = prop.info;
              data.transform = [['-23%','-17%'],['-30%','-17%'],['-37%','-17%'],['-31%','-17%'],['-49%','-15%']][data.info.rarity]
          })
         
          const refData = toRefs(data);
          return {
              ...refData,
              borderImg,
              nameTop,
              qualityImg,
              stars,
              heroImg,
              campImg
          }

      }
  };
</script>
<style lang='less' scoped>
.hero_card_box {
  position: relative;
  width: 100%;
  height: 100%;
  .border {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    z-index: 20;
    .border_img {
      width: 100%;
      height: auto;
    }
  }
  .hero {
    position: absolute;
    width: 69%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-44%, -52%);
    z-index: 1;
  }
  .name {
    position: absolute;
    top: 30%;
    transform: translate(0, -50%);
    z-index: 30;
    font-size: 1.1rem;
    max-width: 1.1rem;
    color: white;
  }
  .lv_t {
    font-size: 1.5vmin;
    position: absolute;
    top: 51%;
    transform: translateX(50%);
    z-index: 30;
    color: white;
  }
  .quality {
    position: absolute;
    top: 2%;
    right: 15%;
    width: 15%;
    z-index: 30;
    img {
      width: 100%;
      height: auto;
    }
  }
  .stars {
    position: absolute;
    top: 10%;
    right: 5%;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 7%;
    filter: grayscale(100);
    img {
      width: 100%;
    }
  }
  .camp {
    position: absolute;
    right: 0%;
    bottom: 0%;
    z-index: 30;
    width: 20%;
    img {
      width: 100%;
    }
  }
}
</style>