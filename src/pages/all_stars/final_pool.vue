<template>
  <div class="box">
    <div
      class="fina_pool"
      @click="
        () => {
          $router.push({
            name: 'bf_main',
          });
        }
      "
    >
      <div class="inner">
        <img src="../../allstar_assets/main/to_final.png" alt="" />
        <div class="text">回到地图</div>
      </div>
    </div>
    <div class="main">
      <div class="top">已有 {{ arriveNum }} 人， 到达鹿原战场</div>
      <div class="c">
        <div class="title">当前累计奖池</div>
        <div>{{ totalAmount }} MMC</div>
        <img
          style="height: 8rem"
          src="../../allstar_assets/final/gold.png"
          alt=""
        />
      </div>
      <div class="b">
        <div class="item">
          <div class="title">分红规则</div>
          <div class="" v-for="(item, index) in winAmount" :key="index">
            <div style="margin-bottom: 1rem">{{ item.name }}</div>
            <div style="font-size: 1.8rem">{{ item.point + "%" }}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">最快抵达奖励</div>
          <div class="text">
            最快抵达的前20名玩家，将在战役结束后获得荣誉称号，并在最终的决战计算中，获得战力加成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onBeforeUnmount } from "vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "bf_pool",
  setup() {
    const store = useStore();
    const data = reactive({
      arriveNum: 0,
      winAmount: [
        {
          name: "第一名",
          point: 70,
        },
        {
          name: "第二名",
          point: 20,
        },
        {
          name: "第三名",
          point: 8,
        },
        {
          name: "第四名",
          point: 2,
        },
      ],
      account: "",
      web3: "",
      totalAmount: 0,
      timer: undefined,
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getTotal();
    });
    const getTotal = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.totalBattleReward().call();
      data.totalAmount = data.web3.utils.fromWei(res, "ether");
      data.timer = setInterval(async () => {
        const res = await c.methods.totalBattleReward().call();
        data.totalAmount = data.web3.utils.fromWei(res, "ether");
      }, 3000);
    };
    onBeforeUnmount(() => {
      clearInterval(data.timer);
    });
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../allstar_assets/final/bg.png") no-repeat;
  background-size: 100% 100%;
}
.fina_pool {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  bottom: 20%;
  right: 1%;
  width: 6rem;
  .inner {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.main {
  width: 60rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .top {
    width: 45%;
    background: rgba(64, 2, 2, 0.7);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0.5rem 0;
    font-size: 1.5rem;
  }
  .c {
    font-size: 2rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 2rem 0;
    box-sizing: border-box;
    justify-content: space-around;
    margin: 2rem 0;
  }
  .b {
    font-size: 2rem;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 2rem 0;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 2rem;
      .title {
        white-space: nowrap;
      }
      .text {
        width: 65%;
        font-size: 1.3rem;
      }
    }
  }
}
</style>