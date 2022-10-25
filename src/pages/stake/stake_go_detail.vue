<template>
  <div class="box">
    <div class="hero_card_big">
      <img class="mask" src="../../assets/stake/stake/detail/mask.png" alt="" />
      <div class="hero">
        <HeroCardItem :info="selectedHero" :big="true" />
      </div>
      <div class="detail">
        <div class="flex">
          <div style="margin-right: 2rem; display: flex; align-items: center">
            {{ selectedHero.name }}
            <img class="quality" :src="qualityImg" alt="" />
          </div>
          <div>
            战力值
            <span style="margin-bottom: 1rem; color: rgba(252, 98, 98, 1)">{{
              selectedHero.power
            }}</span>
          </div>
        </div>
        <StkBtn class="cancel" :text="'取消上阵'" @click="onCancelHero" />
      </div>
    </div>
    <div class="main">
      <div class="window">
        <div
          :class="chosen == index ? 'hero_item active' : 'hero_item'"
          v-for="(item, index) in heroes"
          :key="item.tokenId"
          @click="
            () => {
              chosen = index;
            }
          "
        >
          <HeroAvatar :item="item" />
        </div>
      </div>
      <div class="info">
        <div class="mission_zone">
          <div class="ing">
            <img
              :src="require(`../../assets/stake/detail/m_${type}.png`)"
              alt=""
            />
            <div>
              <div class="text">
                正在执行
                <span style="color: rgba(252, 98, 98, 1)">{{
                  getDiffName.name
                }}</span>
                任务
              </div>
              <div class="text">为期 {{ getDiffName.time }} 天</div>
              <!-- <div class="text" style="color: rgba(252, 98, 98, 1)">
                已质押MDAO
              </div> -->
            </div>
          </div>
        </div>
        <div class="info_zone">
          <div class="power">
            <div style="margin-bottom: 1rem; color: rgba(252, 98, 98, 1)">
              {{ curTotalPower }}
            </div>
            <div>当前出战总战力</div>
          </div>
          <div class="detail">
            <div style="margin-bottom: 1rem">
              当前出战人数
              <span style="color: rgba(252, 98, 98, 1); margin-left: 1.5rem">{{
                heroes.length
              }}</span>
            </div>
            <div>
              <span style="color: rgba(252, 98, 98, 1); margin-left: 1.5rem">
                {{
                  heroes.includes((x) => x.rarity == 5)
                    ? "触发金卡加成"
                    : "未触发金卡加成"
                }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="action">
        <div
          class="btn_wrapper"
          @click="
            () =>
              $router.push({
                name: 'stk_go',
                query: {
                  selected: JSON.stringify(selected),
                },
              })
          "
        >
          <img
            class="btn_bg"
            src="../../assets/stake/stake/detail/addBtn.png"
          />
          <div class="text">继续添加</div>
        </div>
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div
          :class="btnDisable ? 'stake disable' : 'stake'"
          @click="
            () => {
              if (btnDisable) return;
              if (btnStatus == 1) {
                deposit();
              } else {
                approve();
              }
            }
          "
        >
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/allstar_assets/stake/stake_btn_bg.png"
            alt=""
          />
          <div class="text">{{ btnStatus == 1 ? "出征" : "授权" }}</div>
        </div>
      </div>
    </div>
    <!-- <button @click="approve">approve</button>
    <button @click="deposit">deposit</button> -->
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  getCurrentInstance,
  computed,
} from "vue";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3";
import HeroCardItem from "../../components/hero_card_item.vue";
import HeroAvatar from "./components/hero_avatar.vue";
import { useRoute, useRouter } from "vue-router";
import StkBtn from "./components/stk_btn.vue";
export default {
  name: "stk_go_detail",
  components: {
    HeroCardItem,
    HeroAvatar,
    StkBtn,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      account: "",
      web3: "",
      rawData: [],
      selected: [],
      heroes: [],
      chosen: "",
      type: 0,
      btnStatus: 0,
      diff: undefined,
      btnDisable: false
    });
    const selectedHero = computed(() => {
      return data.heroes[data.chosen] || data.heroes[0];
    });
    const qualityImg = computed(() => {
      return [
        require("../../assets/stake/stake/quality/n.png"),
        require("../../assets/stake/stake/quality/R.png"),
        require("../../assets/stake/stake/quality/sr.png"),
        require("../../assets/stake/stake/quality/ssr.png"),
      ][selectedHero.value.quality];
    });
    const onCancelHero = () => {
      const index = data.heroes.findIndex((x) => {
        return x.tokenId == selectedHero.value.tokenId;
      });
      const idx = data.selected.findIndex((x) => {
        return x.tokenId == selectedHero.value.tokenId;
      });
      if (data.heroes.length == 1) {
        router.push({
          name: "stk_go",
        });
      }
      data.selected.splice(idx, 1);
      data.heroes.splice(index, 1);
    };
    const getDiffName = computed(() => {
      const arr = [
        {
          name: "斥候",
          time: 7,
        },
        {
          name: "扫荡",
          time: 14,
        },
        {
          name: "驻扎",
          time: 30,
        },
        {
          name: "error",
          time: "???",
        },
      ];

      return arr[data.diff] || arr[3];
    });
    const curTotalPower = computed(() => {
      return data.heroes.reduce((pre, cur) => {
        if (cur && cur.power) {
          pre += Number(cur.power);
        }
        return pre;
      }, 0);
    });
    onBeforeMount(async () => {
      data.selected = JSON.parse(route.query.selected) || [];
      data.diff = localStorage.getItem("stake_diff");
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      if (localStorage.getItem("stk_selected")) {
        data.heroes = JSON.parse(localStorage.getItem("stk_selected"));
      }
    });

    const approve = async () => {
      data.btnDisable = true;
      try {
        proxy.$toast("等到授权英雄", store.state.toast_info);
        const c = store.state.c_hero;
        const addr = store.state.c_staking.options.address;
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
          proxy.$toast("授权成功", store.state.toast_success);
          data.btnStatus = 1;
        }
      } catch (e) {
        proxy.$toast("授权失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const deposit = async () => {
      try {
        data.btnDisable = true;
        proxy.$toast("等到质押英雄", store.state.toast_info);
        const c = store.state.c_staking;
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .deposit(data.selected, 1)
          .estimateGas({ from: data.account });
        const res = await c.methods.deposit(data.selected, 1).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("质押成功", store.state.toast_success);
          router.push({
            name: "stk_main",
          });
        }
      } catch (e) {
        console.error(e);
        proxy.$toast("质押失败", store.state.toast_error);
      } finally {
        data.btnDisable = false;
      }
    };
    const onSelect = async (tokenId) => {
      const idx = data.selected.findIndex((x) => x.tokenId == tokenId);
      if (idx == -1) {
        data.selected.push(tokenId);
      } else {
        data.selected.splice(idx, 1);
      }
    };

    const refData = toRefs(data);
    return {
      ...refData,
      selectedHero,
      getDiffName,
      curTotalPower,
      qualityImg,
      onCancelHero,
      onSelect,
      deposit,
      approve,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: url("../../assets/stake/stake/detail/detail_bg.png") no-repeat;
  background-size: 100% 100%;
  align-items: center;
}
.hero_card_big {
  position: relative;
  width: 25%;
  .hero {
    position: absolute;
    top: 39%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
  }
  .mask {
    width: 100%;
    opacity: 0.3;
    transform: scale(1.2);
  }
  .detail {
    margin-top: 2rem;
    width: 100%;

    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    background: linear-gradient(
      180deg,
      rgba(45, 43, 43, 0.7) 0%,
      rgba(28, 57, 67, 0.7) 67.71%,
      rgba(52, 58, 61, 0.7) 100%
    );
    padding: 1rem;
    .quality {
      height: 1.5rem;
      margin: 0 2rem;
    }
    .flex {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
  }
}
.main {
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  .window {
    width: 100%;
    height: 50%;
    max-height: 50%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .hero_item {
      padding: 1rem;
      border-radius: 1rem;
      height: fit-content;
      cursor: pointer;
      margin-right: 1rem;
      margin-bottom: 1rem;
    }
    .active {
      background: linear-gradient(180deg, #5e4040 0%, #3f3333 100%),
        linear-gradient(0deg, #8b4e4e, #8b4e4e);
    }
  }
  .info {
    width: 100%;
    display: flex;
    margin: 2rem 0;
    .mission_zone {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        180deg,
        rgba(45, 43, 43, 0.7) 0%,
        rgba(28, 57, 67, 0.7) 67.71%,
        rgba(52, 58, 61, 0.7) 100%
      );
      padding: 0.5rem 2rem;
      border-radius: 1rem;
      margin-right: 2rem;
      .ing {
        height: 100%;
        border-radius: 0.8rem;
        font-size: 1.3vmin;
        display: flex;
        align-items: center;
        img {
          width: 4rem;
          margin-right: 2rem;
        }
      }
    }
    .info_zone {
      flex: 1;
      display: flex;
      align-items: center;
      border-radius: 1rem;
      background: linear-gradient(
        180deg,
        rgba(45, 43, 43, 0.7) 0%,
        rgba(28, 57, 67, 0.7) 67.71%,
        rgba(52, 58, 61, 0.7) 100%
      );
      padding: 0.5rem 2rem;
      .power {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1vmin;
        margin-right: 2rem;
      }
      .detail {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 1vmin;
      }
    }
  }
  .action {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    .btn_wrapper {
      position: relative;
      width: 15rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      .btn_bg {
        width: 100%;
      }
      .text {
        font-size: 1.5vmin;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .dia {
      width: 3rem;
      margin: 0 3rem;
    }
    .stake {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      position: relative;
      width: 10rem;
      img {
        width: 100%;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2vmin;
      }
    }
    .disable{
      filter: grayscale(1);
    }
  }
}
</style>