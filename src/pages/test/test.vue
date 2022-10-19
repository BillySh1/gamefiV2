<template>
  <div v-if="!loading" class="box">
    <InjectGoBack />
    <img class="badge" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/hero_sit.png" alt="" />
    <img class="logo" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/logo.png" alt="" />
    <div v-if="!canMDAO && !canM3t" class="text">您暂无领取资格或者已领取</div>
    <div v-else class="btnBox">
      <CommonButton class="btn" @click="() => getTestToken(1)" v-if="canMDAO"
        >领取MDAO</CommonButton
      >
      <CommonButton class="btn" @click="() => getTestToken(0)" v-if="canM3t"
        >领取M3T</CommonButton
      >
    </div>
  </div>
  <div v-else class="box">
    <img class="badge" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/hero_sit.png" alt="" />
    <img class="logo" src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/logo.png" alt="" />
    <Lottie
      :options="{ animationData: require('../../assets/common/loading.json') }"
    />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import CommonButton from "../../components/common_button.vue";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "testCoin",
  components: {
    CommonButton,
    InjectGoBack,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      canMDAO: false,
      canM3t: false,
      account: "",
      web3: "",
      loading: false,
    });
    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (provider) => {
          data.web3 = provider;
        }
      );
      await judge();
      data.loading = false;
    });
    const judge = async () => {
      const _mmc = store.state.c_mdao;
      const _m3t = store.state.c_m3t;
      data.canMDAO = !(await _mmc.methods.canGetTestToken(data.account).call());
      data.canM3t = !(await _m3t.methods.canGetTestToken(data.account).call());
    };
    const getTestToken = async (type) => {
      try {
        const _mmc = store.state.c_mdao;
        const _m3t = store.state.c_m3t;
        const c = type == 1 ? _mmc : _m3t;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .getTestToken()
          .estimateGas({ from: data.account });
        const res = await c.methods.getTestToken().send({
          gas: Number(gas) + 500000,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast(`领取成功`, store.state.toast_success);
        }
      } catch (e) {
        console.log(e);
        proxy.$toast(`领取失败`, store.state.toast_error);
      } finally {
        await judge();
      }
    };

    const refData = toRefs(data);
    return {
      ...refData,
      getTestToken,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  background: black;
}
.badge {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}
.logo {
  position: absolute;
  width: 80rem;
  height: auto;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  position: absolute;
  font-size: 1.5rem;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btnBox {
  position: absolute;
  font-size: 1.5rem;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  color: white;
  display: flex;
  align-items: center;
  .btn {
    margin-right: 2rem;
    font-size: 1.5rem;
  }
}
</style>