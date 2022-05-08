<template>
  <div class="detail_container" v-if="value" @click="() => $emit('close')">
    <div
      class="main"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <div class="status" @click="() => $emit('close')">
        <img
          src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/active.png"
          alt=""
        />
      </div>
      <img
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/pack_bg.png"
        alt=""
      />
      <div class="inner">
        <div class="title">行军背包</div>
        <div class="left">
          <div class="inner">
            <div
              class="inner_item"
              v-for="(item, index) in pack"
              :key="index"
              @click="
                () => {
                  curItem = index;
                  if (pack[curItem] == 0) {
                    btnDisable = true;
                  } else {
                    btnDisable = false;
                  }
                }
              "
              :style="curItem == index ? 'background: #93250d' : ''"
            >
              <img class="bg" :src="getItemDetail(index).img[0]" alt="" />
              <div class="in">
                <img :src="getItemDetail(index).img[1]" alt="" />
              </div>
              <div class="num">
                {{ getItemDetail(index).name }} x {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="inner">
            <div class="detail_img">
              <img :src="getItemDetail(curItem).img[0]" alt="" />
              <div class="in">
                <img :src="getItemDetail(curItem).img[1]" alt="" />
              </div>
            </div>
            <div class="intro">
              {{ getItemDetail(curItem).name }}
            </div>
            <div class="intro">速率加成 {{ totalSpeedAdd }}</div>
            <div v-if="timing" class="intro">生效时间{{ timing }}</div>

            <CommonButton
              v-if="canUse && !disable"
              class="btn"
              :disabled="btnDisable || pack[curItem] == 0"
              :circle="true"
              @click="handleClick"
              >{{ btnText }}</CommonButton
            >
            <CommonButton
              v-if="!canUse && !disable"
              class="btn"
              :disabled="true"
            >
              使用中
            </CommonButton>
            <CommonButton v-if="disable" class="btn" :disabled="true">
              禁止使用
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import {
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  getCurrentInstance,
  watch,
} from "vue";
import initWeb3 from "../../../utils/initWeb3";
import CommonButton from "../../../components/common_button.vue";
import { useStore } from "vuex";
export default {
  name: "bf_pack",
  props: ["value", "disable", "timing"],
  components: {
    CommonButton,
  },

  setup(props, ctx) {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      account: "",
      web3: "",
      pack: [0, 0, 0, 0, 0],
      curItem: 0,
      btnStatus: 0,
      btnDisable: false,
      canUse: true,
    });
    const totalSpeedAdd = computed(() => {
      return [5, 10, 15, 20, 25][data.curItem];
    });
    const btnText = computed(() => {
      return ["授权", "使用"][data.btnStatus];
    });
    const handleClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await use();
      }
    };
    const approve = async () => {
      try {
        data.btnDisable = true;
        const c = store.state.c_battle_shop;
        console.log(c, "sss");
        const addr = store.state.c_battle.options.address;
        const isApproved = await c.methods
          .isApprovedForAll(data.account, addr)
          .call();
        if (isApproved) {
          proxy.$toast(`授权额度足够，无需授权`, store.state.toast_info);
          data.btnStatus = 1;
          data.btnDisable = false;
          return;
        }
        proxy.$toast(`等待授权道具`, store.state.toast_info);
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .setApprovalForAll(addr, true)
          .estimateGas({ from: data.account });
        const res = await c.methods.setApprovalForAll(addr, true).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    const use = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast('wait', store.state.toast_info);
        const c = store.state.c_battle;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .useBuff(data.curItem)
          .estimateGas({ from: data.account });

        const res = await c.methods.useBuff(data.curItem).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("使用成功", store.state.toast_success);
          ctx.emit("refresh");
        }
      } catch (e) {
        proxy.$toast("使用失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getPack();
      await getTimes();
    });
    watch(
      () => props.value,
      async () => {
        await getPack();
        await getTimes();
      }
    );
    const getTimes = async () => {
      const c = store.state.c_battle;
      const res = await c.methods.getTimes(data.account).call();
      const now = new Date().getTime();
      if (Number(res[2]) * 1000 > Number(now)) {
        data.canUse = false;
      }
    };
    const getItemDetail = (idx) => {
      return [
        {
          img: [
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/bg_0.png",
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/in_0.png",
          ],
          name: "青铜骏马",
        },
        {
          img: [
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/bg_1.png",
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/in_1.png",
          ],
          name: "白金汗血",
        },
        {
          img: [
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/bg_2.png",
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/in_2.png",
          ],
          name: "银狐栖尊",
        },
        {
          img: [
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/bg_3.png",
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/in_3.png",
          ],
          name: "白神象彝",
        },
        {
          img: [
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/bg_4.png",
            "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/pack/in_4.png",
          ],
          name: "龙刻陨星",
        },
      ][idx];
    };

    const getPack = async () => {
      const c = store.state.c_battle_shop;
      const res = await c.methods.ownList(data.account).call();
      data.pack = res;
    };
    const refData = toRefs(data);
    return {
      ...refData,
      totalSpeedAdd,
      btnText,
      handleClick,
      getItemDetail,
    };
  },
};
</script>
<style lang='less' scoped>
.detail_container {
  @media screen and(max-height: 414px) {
    transform: scale(0.9);
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back_home {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 1%;
  bottom: 1%;
  width: 20rem;
  padding: 0.5rem 0;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 2rem;
}
.main {
  position: relative;
  width: 85%;
  height: 40rem;
  .status {
    cursor: pointer;
    position: absolute;
    top: 0%;
    right: 0%;
    width: 6rem;
    transform: translate(50%, -50%);
    img {
      width: 100%;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      text-align: left;
      margin-top: 3rem;
      margin-left: 10rem;
      font-size: 2rem;
    }
    .left {
      position: absolute;
      top: 7rem;
      left: 7rem;
      width: 53%;
      height: 67%;
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.3rem;
        }
        .inner_item {
          cursor: pointer;
          &:hover {
            background: #93250d;
          }
          position: relative;
          width: 10rem;
          height: 10rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(147, 37, 13, 0.2);
          border-radius: 8px;
          .bg {
            width: 6rem;
            height: 6rem;
          }
          .in {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 3rem;
            img {
              width: 100%;
            }
          }
          .num {
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            color: #ffdf3c;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-33%, 10%);
          }
        }
      }
    }
    .right {
      position: absolute;
      height: 83%;
      top: 1.8rem;
      right: 8%;
      width: 28%;
      .inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .detail_img {
          position: relative;
          width: 8rem;
          img {
            width: 100%;
          }
          .in {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            img {
              width: 100%;
            }
          }
        }
        .intro {
          font-size: 1.5rem;
        }

        .btn {
          font-size: 1.5rem;
          padding: 1rem 4rem;
        }
      }
    }
  }
}
</style>