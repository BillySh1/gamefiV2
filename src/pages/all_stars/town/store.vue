<template>
  <div class="box">
    <div class="inner">
      <div class="left">
        <div class="title">
          <img src="../../../allstar_assets/store/title_bg.png" alt="" />
          <div class="text">{{ curTabItem.title }}</div>
        </div>
        <div class="subText">
          {{ subText }}
        </div>
        <div class="boxDetail">
          <div class="item" v-for="item in boxMap" :key="item.key">
            <img class="item_img" :src="item.img" alt="" />
            <div class="intro">
              <img src="../../../allstar_assets/store/0_bg.png" alt="" />
              <div class="text" :style="`color:${item.color}`">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="back" @click="() => $router.go(-1)">
          <img src="../../../allstar_assets/store/back.png" alt="" />
          <div class="text">返回</div>
        </div>
        <div class="stockDetail">
          <div v-for="item in stockDetal" :key="item[0]">
            {{ item[0] }}: + {{ item[1] }}速率
          </div>
        </div>
      </div>
      <div class="right">
        <img src="../../../allstar_assets/store/right_bg.png" alt="" />
        <div class="tab_box">
          <div
            class="item"
            v-for="item in tabs"
            :key="item.key"
            @click="() => (curTab = item.key)"
            :class="item.disable ? 'disable' : ''"
          >
            <img
              :src="
                item.key == curTab
                  ? require('../../../allstar_assets/store/active_tab.png')
                  : require('../../../allstar_assets/store/inactive_tab.png')
              "
              alt=""
            />
            <div class="text">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="inner">
          <div class="title_img">
            <img src="../../../allstar_assets/store/box.png" alt="" />
          </div>
          <div class="name_price">
            <div class="name">
              {{ stockName }}
            </div>
            <div class="price">
              <img src="../../../assets/common/mmc.png" alt="" />
              {{ stockPrice }}
            </div>
          </div>
          <div class="action">
            <img src="../../../allstar_assets/store/right_d_bg.png" alt="" />
            <div class="ac_inner">
              <div class="input_box">
                <img
                  style="cursor: pointer"
                  class="img_action"
                  src="../../../assets/mint/minus.svg"
                  @click="
                    () => {
                      const temp = buyNum - 1;
                      if (temp < 0) {
                        buyNum = 0;
                        return;
                      }
                      buyNum = temp;
                    }
                  "
                />
                <div class="ipt_bg">
                  <img
                    class="ipt_img"
                    src="../../../assets/mint/input.png"
                    alt=""
                  />
                  <input
                    v-model="buyNum"
                    class="input"
                    @input="
                      buyNum = Number($event.target.value.replace(/\D+/, ''))
                    "
                  />
                </div>
                <img
                  class="img_action"
                  style="cursor: pointer"
                  src="../../../assets/mint/add.svg"
                  @click="
                    () => {
                      buyNum += 1;
                    }
                  "
                />
              </div>
              <div class="intro">可开出五种不同品质的道具</div>
              <div class="intro">用于提升您在地图中的移动速度，是您获</div>
              <div class="intro">得致胜先机的必备法宝</div>
            </div>
          </div>
          <CommonButton
            @click="handleClick"
            class="btn"
            :disabled="btnDisable"
            >{{ btnText }}</CommonButton
          >
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
  onMounted,
  computed,
  getCurrentInstance,
} from "vue";
import CommonButton from "../../../components/common_button.vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "bf_store",
  components: {
    CommonButton,
  },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const data = reactive({
      tabs: [
        { key: 0, name: "物资", title: "补给驿站" },
        { key: 1, name: "回收", title: "回收商人", disable: true },
      ],
      curTab: 0,
      boxMap: [
        {
          key: 0,
          img: require("../../../allstar_assets/store/0_0.png"),
          name: "青铜骏马",
          color: "#B5B5B5",
        },
        {
          key: 1,
          img: require("../../../allstar_assets/store/0_1.png"),
          name: "白金汗血",
          color: "#3F63C7",
        },
        {
          key: 2,
          img: require("../../../allstar_assets/store/0_2.png"),
          name: "银狐牺尊",
          color: "#5D17AC",
        },
        {
          key: 3,
          img: require("../../../allstar_assets/store/0_3.png"),
          name: "白神象彝",
          color: "#BA5F0F",
        },
        {
          key: 4,
          img: require("../../../allstar_assets/store/0_4.png"),
          name: "龙刻陨星",
          color: "#FFDF3C",
        },
      ],
      stockDetal: [
        ["青铜骏马", 1],
        ["白金汗血", 2],
        ["银狐牺尊", 3],
        ["白神象彝", 4],
        ["龙刻陨星", 5],
      ],
      buyNum: 1,
      btnStatus: 0,
      btnDisable: false,
      web3: "",
      account: "",
    });
    const btnText = computed(() => {
      return ["授权", "购买"][data.btnStatus];
    });
    const curTabItem = computed(() => {
      return data.tabs[data.curTab];
    });
    const subText = computed(() => {
      return "礼包中可能开出的物品";
    });
    const stockName = computed(() => {
      return "号令军旗";
    });
    const stockPrice = computed(() => {
      return 500 * data.buyNum;
    });
    const handleClick = async () => {
      if (data.btnStatus == 0) {
        await approve();
      } else if (data.btnStatus == 1) {
        await buy();
      }
    };

    const approve = async () => {
      try {
        proxy.$toast("等待授权", store.state.toast_info);
        data.btnDisable = true;
        const c = store.state.c_mmc;
        const value = data.web3.utils.toWei(
          (500 * Number(data.buyNum)).toString(),
          "ether"
        );
        const addr = store.state.c_battle_shop.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .approve(addr, value)
          .estimateGas({ from: data.account });
        const res = await c.methods.approve(addr, value).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.btnStatus = 1;
          proxy.$toast("授权成功", store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.btnDisable = false;
      }
    };
    const buy = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等待购买", store.state.toast_info);
        const c = store.state.c_battle_shop;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .buy(data.buyNum)
          .estimateGas({ from: data.account });
        const res = await c.methods.buy(data.buyNum).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });

        if (res.status) {
          proxy.$toast("购买成功", store.state.toast_success);
          data.btnStatus = 0;
        }
      } catch (e) {
        proxy.$toast("购买失败", store.state.toast_error);
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
    });
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      curTabItem,
      subText,
      stockName,
      stockPrice,
      btnText,
      handleClick,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  padding: 2rem 4rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("../../../allstar_assets/store/bf_store_bg.png") no-repeat;
  background-size: 100% 100%;
  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      position: relative;
      width: 50%;
      height: 100%;
      .title {
        position: relative;
        width: 20rem;
        img {
          width: 100%;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 48%;
          transform: translate(-50%, -50%);
          font-size: 2.5rem;
        }
      }
      .subText {
        font-size: 1.5rem;
        color: white;
        text-align: left;
        margin: 2rem 0;
      }
      .boxDetail {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: calc(90% / 3 - 2rem);
          margin-bottom: 1rem;
          .item_img {
            width: 7rem;
          }
          .intro {
            width: 80%;
            position: relative;
            margin-top: 1rem;
            img {
              width: 100%;
            }
            .text {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              white-space: nowrap;
              font-size: 1.5rem;
            }
          }
        }
      }
      .back {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        font-size: 2rem;
        align-items: center;
        img {
          width: 3rem;
          margin-right: 2rem;
        }
      }
      .stockDetail {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    .right {
      position: relative;
      width: 40%;
      height: auto;
      .tab_box {
        position: absolute;
        top: 0%;
        left: 0;
        transform: translateX(-100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .disable {
          user-select: none;
          pointer-events: none;
          filter: grayscale(100);
        }
        .item {
          position: relative;
          z-index: 10;
          height: auto;
          cursor: pointer;
          img {
            width: 4rem;
            height: 8rem;
          }
          .text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.8rem;
            color: white;
            max-width: 2rem;
          }
        }
      }
      img {
        width: 100%;
      }
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .title_img {
          width: 15rem;
          img {
            width: 100%;
          }
        }
        .name_price {
          display: flex;
          align-items: center;
          font-size: 2rem;

          .price {
            display: flex;
            align-items: center;
            color: #dac15d;
            img {
              width: 2rem;
              margin-left: 3rem;
              margin-right: 4rem;
            }
            font-style: italic;
          }
        }
        .action {
          position: relative;
          width: 80%;
          height: auto;
          img {
            width: 100%;
          }
          .ac_inner {
            position: absolute;
            top: 50%;
            left: 50%;
            height: 100%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            .input_box {
              display: flex;
              align-items: center;
              .img_action {
                width: 2rem;
              }
              .ipt_img {
                margin: 0 1rem;
                width: 12.5rem;
              }
            }
            .ipt_bg {
              position: relative;
              margin: 0 1rem;
            }
            .input {
              width: 60%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -55%);
              outline: none;
              background: transparent;
              border: none;
              text-align: center;
              font-size: 2.5rem;
              color: #f2dbb9;
            }
            .intro {
              font-size: 1.5rem;
              white-space: nowrap;
            }
          }
        }
        .btn {
          width: 60%;
          height: 4rem;
          font-size: 2rem;
          line-height: 4rem;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>