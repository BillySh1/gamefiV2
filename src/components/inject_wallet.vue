<template>
  <div class="wallet_box">
    <div class="chain_icon_box">
      <img class="chain_icon" src="../assets/index/chainIcon/bsc.svg" alt="" />
    </div>
    <div class="wallet_address">
      {{ walletValue }}
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted,computed} from 'vue'
import initWeb3 from '../utils/initWeb3.js'
export default {
    name: 'inject_wallet',
      setup() {
          console.log('1-开始创建组件-setup')
          const data = reactive({
            wallet:'连接钱包',
            web3:''
          })
          const walletValue = computed(()=>{
            const wallet = data.wallet;
            let res = wallet;
            if(wallet.length > 10){
              res = wallet.slice(0,5) + '...' + wallet.slice(wallet.length-4,wallet.length)
            }
            return res
          })
          onBeforeMount(async () => {
            await initWeb3.Init(
              (addr)=>{
                data.wallet = addr
              },
              (p)=>{
                data.web3 = p
              }
            )
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const refData = toRefs(data);
          return {
              ...refData,
              walletValue
          }

      }
  };
</script>
<style lang="less" scoped>
.wallet_box {
  display: flex;
  align-items: center;
}
.chain_icon_box {
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background: black;
  margin-right: 0.5rem;
  img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.wallet_address {
  padding: 0.5rem 3rem;
  background: rgba(0, 0, 0, 0.7);
  font-family: Roboto;
  font-size: 1rem;
  border-radius: 10rem;
}
</style>
