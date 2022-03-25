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
      <div class="status">
        <img src="../../../allstar_assets/main/pack/active.png" alt="" />
      </div>
      <img src="../../../allstar_assets/main/pack/pack_bg.png" alt="" />
      <div class="inner">
        <div class="title">行军背包</div>
        <div class="left">
          <div class="inner">
            <div
              class="inner_item"
              v-for="(item, index) in pack"
              :key="index"
              @click="() => (curItem = index)"
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
              {{ getItemDetail(curItem).name }} 数量 x
              {{ pack[curItem] }}
            </div>
            <div class="intro">速率加成 {{ totalSpeedAdd }}</div>
            <div class="input_box">
              <img
                style="cursor: pointer"
                class="img_action"
                src="../../../assets/mint/minus.svg"
                @click="
                  () => {
                    const temp = num - 1;
                    if (temp < 0) {
                      num = 0;
                      return;
                    }
                    num = temp;
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
                  v-model="num"
                  class="input"
                  @input="num = Number($event.target.value.replace(/\D+/, ''))"
                />
              </div>
              <img
                class="img_action"
                style="cursor: pointer"
                src="../../../assets/mint/add.svg"
                @click="
                  () => {
                    const temp = (num += 1);
                    if (temp > pack[curItem]) {
                      num = pack[curItem];
                    } else {
                      num = temp;
                    }
                  }
                "
              />
            </div>
            <CommonButton class="btn" :disabled="true" :circle="true"
              >使用</CommonButton
            >
          </div>
        </div>
      </div>
    </div>
    <div class="back_home" @click="() => $emit('close')">返回</div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import initWeb3 from "../../../utils/initWeb3";
import CommonButton from "../../../components/common_button.vue";
import { useStore } from "vuex";
export default {
  name: "bf_pack",
  props: ["value"],
  components: {
    CommonButton,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      num: 0,
      account: "",
      web3: "",
      pack: [0, 0, 0, 0, 0],
      curItem: 0,
    });
    const totalSpeedAdd = computed(() => {
      return [5, 10, 15, 20, 25][data.curItem] * data.num;
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
      await getPack();
    });
    const getItemDetail = (idx) => {
      return [
        {
          img: [
            require("../../../allstar_assets/main/pack/bg_0.png"),
            require("../../../allstar_assets/main/pack/in_0.png"),
          ],
          name: "青铜骏马",
        },
        {
          img: [
            require("../../../allstar_assets/main/pack/bg_1.png"),
            require("../../../allstar_assets/main/pack/in_1.png"),
          ],
          name: "白金汗血",
        },
        {
          img: [
            require("../../../allstar_assets/main/pack/bg_2.png"),
            require("../../../allstar_assets/main/pack/in_2.png"),
          ],
          name: "银狐栖尊",
        },
        {
          img: [
            require("../../../allstar_assets/main/pack/bg_3.png"),
            require("../../../allstar_assets/main/pack/in_3.png"),
          ],
          name: "白神象彝",
        },
        {
          img: [
            require("../../../allstar_assets/main/pack/bg_4.png"),
            require("../../../allstar_assets/main/pack/in_4.png"),
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
  width: 100%;
  height: 100%;
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
          font-size: 2rem;
        }
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
        .btn {
          font-size: 1.5rem;
          padding: 1rem 4rem;
        }
      }
    }
  }
}
</style>