<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <Lottie v-if="loading" :options="lottie_options" />
      <div v-else>
        {{ newMintedItems }}
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,computed} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import CommonPageFooter from '../../components/common_page_footer'
import CommonPageHeader from '../../components/common_page_header'
import initWeb3 from '../../utils/initWeb3.js'
export default {
    name: 'minging',
    components:{
        CommonPageFooter,
        CommonPageHeader
    },
      setup() {
          const route = useRoute()
          const store = useStore()
          const data = reactive({
              info:{key:0},
              jsonData:'',
              pageTitle:'招贤纳士',
              cardList: [],
              newMintedItems:[],
              loading: false,
              account:'',
              web3:'',
          });
        const lottie_options = computed(()=>{
            return  {
                  animationData: require(`../../assets/mint/type${data.info.key}.json`),
              }
        })
          onBeforeMount(async() => {
              data.loading = true
              await initWeb3.Init(
              (addr)=>{
                data.account = addr
              },
              (p)=>{
                data.web3 = p
              }
            )
              data.info = JSON.parse(route.query.info);
              await getCardList()
              data.loading = false
          })
          const getCardList = async()=>{
            try{
              data.curIndex = 0
              const c = store.state.c_hero;
              const res = await c.methods.cardList(data.account).call();
              res.map(x=>{
              data.cardList.push({
                tokenId: x.tokenId,
                heroId: x.heroId,
                rarity: x.rarity,
                quality: x.quality,
                properties: x.properties.map(x=>Number(x)/100),
                power: Number(x.power)/100,
                star: x.star,
                rebirthTimes: x.rebirthTimes,
                preference: x.preference,
                native: x.native,
                level: x.level,
                camp:x.camp,
                addition:x.addition
              })
            });
            const before = JSON.parse(sessionStorage.getItem('before_pack')).map(x=>x.tokenId);
            const newList = data.cardList.map(x=>x.tokenId);
            const newCards = newList.filter((item) => {
           if (!before.includes(item)) return item;
          });
          newCards.map((item) => {
             const temp = data.cardList.find((i) => {
                return item === i.tokenId;
              });
              data.newMintedItems.push(temp);
            }   );
            }catch(e){
              console.log(e)
            }
          }

          const refData = toRefs(data);
          return {
              ...refData,
              lottie_options
          }

      }
  };
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
