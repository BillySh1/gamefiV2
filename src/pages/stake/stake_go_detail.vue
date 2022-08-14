<template>
  <div class="box">
    <div class="hero_card_big">
      <HeroCardItem :info="selectedHero" :big="true" />
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
              <div class="text" style="color: rgba(252, 98, 98, 1)">
                已质押MDAO
              </div>
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
        </div>
      </div>
      <div class="action">
        <div class="btn_wrapper" @click="next">
          <img
            class="btn_bg"
            src="../../assets/stake/stake/detail/addBtn.png"
            alt=""
          />
          <div class="text">继续添加</div>
        </div>
        <img class="dia" src="../../assets/stake/diamond.png" alt="" />
        <div class="stake">
          <img
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/stake/stake_btn_bg.png"
            alt=""
          />
          <div class="text">出征</div>
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
import useHeroDetail from "../../utils/useHeroDetail.js";
import initWeb3 from "../../utils/initWeb3";
import HeroCardItem from "../../components/hero_card_item.vue";
import HeroAvatar from "./components/hero_avatar.vue";
import { useRoute } from "vue-router";
export default {
  name: "stk_go_detail",
  components: {
    HeroCardItem,
    HeroAvatar,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const route = useRoute();
    const data = reactive({
      account: "",
      web3: "",
      rawData: [],
      selected: [],
      heroes: [],
      chosen: "",
      type: 0,
    });
    const selectedHero = computed(() => {
      return data.heroes[data.chosen] || data.heroes[0];
    });
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
      ];

      return arr[localStorage.getItem("stake_diff")] || arr[0];
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
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.selected = JSON.parse(route.query.selected) || [];
      await getTokenInfo();
    });
    const getTokenInfo = async () => {
      const c = store.state.c_hero;
      const loop = async () => {
        for (let i = 0; i < data.selected.length; i++) {
          const x = data.selected[i];
          const res = await c.methods.getHero(x).call();
          const uid =
            res.camp.toString() + res.rarity.toString() + res.heroId.toString();
          const obj = {
            ...res,
            ...useHeroDetail(uid, res.preference),
            uid: uid,
          };
          if (
            data.heroes.findIndex((j) => {
              return j.tokenId == x.tokenId;
            }) == -1
          ) {
            console.log("push");
            data.heroes.push(obj);
          }
        }
      };
      await loop();
    };
    const approve = async () => {
      try {
        data.btnDisable = true;
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
          .deposit([4, 5], 1)
          .estimateGas({ from: data.account });
        const res = await c.methods.deposit([4, 5], 1).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("质押成功", store.state.toast_success);
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
}
.hero_card_big {
  width: 25%;
  height: 100%;
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
    display: flex;
    flex-wrap: wrap;
    .hero_item {
      padding: 1rem;
      border-radius: 1rem;
      height: fit-content;
      cursor: pointer;
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
      height: 5rem;
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
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        img {
          width: 4rem;
          margin-right: 2rem;
        }
      }
    }
    .info_zone {
      height: 5rem;
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
        font-size: 1.5rem;
      }
    }
  }
  .action {
    width: 100%;
    height: 5rem;
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
        font-size: 1.5rem;
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
        font-size: 2rem;
      }
    }
  }
}
</style>