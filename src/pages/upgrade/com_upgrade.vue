<template>
  <div class="com_box">
    <div class="power_box">
      <img src="../../assets/upgrade/power_bg.png" />
      <div class="inner">
        <div class="text">战力值</div>
        <div class="value">{{ info.power }}</div>
        <div class="pImg">
          <img src="../../assets/pack/power_item.png" alt="" />
        </div>
      </div>
    </div>
    <div class="cost_box" v-if="updateInfo.canLevelup">
      <div class="info">
        需要消耗 <strong class="num">{{ updateInfo.bookUse }}</strong>
        <strong>{{ costName }}</strong> 升级
        <img :src="costImg" alt="" />
      </div>
      <img class="divider" src="../../assets/upgrade/divider.png" />
    </div>
    <div class="property_box" v-if="updateInfo.canLevelup">
      <img src="../../assets/upgrade/properties_bg.png" alt="" />
      <img class="badge" src="../../assets/upgrade/proper_badge.png" />
      <div class="inner">
        <div class="item">
          <div class="title">当前属性</div>
          <div
            class="property"
            v-for="(item, index) in curProperty"
            :key="index"
          >
            <div class="name">{{ item.title }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">升级后属性</div>
          <div class="property" v-for="(item, index) in nextInfo" :key="index">
            <div class="name">{{ item.title }}</div>
            <div class="next">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="property_box">
      <div class="empty">无法继续升级，请前往突破</div>
    </div>
    <div class="action_box" v-if="updateInfo.canLevelup">
      <div
        :class="
          Number(remainNum) < Number(updateInfo.bookUse)
            ? 'item disable'
            : 'item'
        "
        @click="handleClickUpgrade"
      >
        <img src="../../assets/upgrade/action_bg.png" alt="" />
        <div class="inner">升级</div>
      </div>
      <div
        :class="oneKeyInfo.canLevelup ? 'item' : 'item disable'"
        @click="handleClickOneKeyUpgrade"
      >
        <div class="inner">一键升级</div>
        <img src="../../assets/upgrade/action_bg_1.png" alt="" />
      </div>
    </div>
    <div class="injection" v-if="showUpgradeModal || showOneKeyModal">
      <InjectModal
        :value="showUpgradeModal"
        :title="'确认升级'"
        :btnText="modalBtnText"
        @confirm="modalBtnClick"
        @close="() => (showUpgradeModal = false)"
      >
        <div class="modal_inner_box">
          <div class="up">
            您将使用 {{ costName }} x {{ updateInfo.bookUse }} 对
            {{ info.name }} 进行升级吗
          </div>
          <div class="sub">当前拥有 {{ costName }} 数量 {{ remainNum }}</div>
          <div class="main">
            <div class="item">
              <img :src="costImg" alt="" />
            </div>
            <div class="middle">
              <img src="../../assets/upgrade/right.png" alt="" />
            </div>
            <div class="item">
              <HeroCardItem :info="info" />
            </div>
          </div>
        </div>
      </InjectModal>
      <InjectModal
        :value="showOneKeyModal"
        :title="'一键升级'"
        :btnText="modalBtnText"
        @confirm="() => modalBtnClick(true)"
        @close="() => (showOneKeyModal = false)"
      >
        <div class="modal_inner_box">
          <div class="up">
            您将使用 {{ costName }} x {{ oneKeyInfo.bookUse }} 对
            {{ info.name }} 进行一键升级吗
          </div>
          <div class="sub">当前拥有 {{ costName }} 数量 {{ remainNum }}</div>
          <div class="main">
            <div class="item">
              <img :src="costImg" alt="" />
            </div>
            <div class="middle">
              <img src="../../assets/upgrade/right.png" alt="" />
            </div>
            <div class="item">
              <HeroCardItem :info="info" />
            </div>
          </div>
        </div>
      </InjectModal>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  onBeforeMount,
  getCurrentInstance,
} from "vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import { usePropertyName } from "../../utils/useHeroInfo";
import InjectModal from "../../components/inject_modal.vue";
import HeroCardItem from "../../components/hero_card_item.vue";
export default {
  name: "com_upgrade",
  props: ["info", "stockBox"],
  components: {
    InjectModal,
    HeroCardItem,
  },
  setup(props, context) {
    const data = reactive({
      updateInfo: "",
      account: "",
      web3: "",
      nextInfo: "",
      showUpgradeModal: false,
      showOneKeyModal: false,
      modalStatus: 0,
      oneKeyInfo: "",
      stockBox: [],
      info: "",
    });
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const modalBtnText = computed(() => {
      return ["授权", "升级"][data.modalStatus];
    });
    const modalBtnClick = async (isOneKey) => {
      if (data.modalStatus == 0) {
        await approve();
      } else if (data.modalStatus == 1) {
        await update(isOneKey);
      }
    };
    const approveStock = async () => {
      try {
        proxy.$toast(`等待授权 ${costName.value}`, store.state.toast_info);
        const c = store.state.c_richShop;
        const addr = store.state.c_training.options.address;
        const isApproved = await c.methods
          .isApprovedForAll(data.account, addr)
          .call();
        if (isApproved) {
          proxy.$toast(`授权额度足够，无需授权`, store.state.toast_info);
          data.modalStatus = 1;
          return;
        }
        const gasPrice = await data.web3.eth.getGasPrice();
        const gas = await c.methods
          .setApprovalForAll(addr, true)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.setApprovalForAll(addr, true).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          data.modalStatus = 1;
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const approve = async () => {
      try {
        proxy.$toast(`等待授权${props.info.name}`, store.state.toast_info);
        const c = store.state.c_hero;
        const addr = store.state.c_training.options.address;
        const gasPrice = await data.web3.eth.getGasPrice();
        const tokenId = props.info.tokenId;
        const gas = await c.methods
          .approve(addr, tokenId)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.setApprovalForAll(addr, tokenId).send({
          gas: gas,
          gasPrice: gasPrice,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast(`授权${props.info.name}成功`, store.state.toast_success);
          await approveStock();
        }
      } catch (e) {
        proxy.$toast(`授权${props.info.name}失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };
    const update = async (isOneKey) => {
      try {
        proxy.$toast("等待确认", store.state.toast_info);
        const c = store.state.c_training;
        const gasPrice = await data.web3.eth.getGasPrice();
        const tokenId = props.info.tokenId;
        const gas = await c.methods[
          isOneKey ? "onekeyUpgradeLevel" : "upgradeLevel"
        ](tokenId).estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods[
          isOneKey ? "onekeyUpgradeLevel" : "upgradeLevel"
        ](tokenId).send({
          gasPrice: gasPrice,
          gas: Number.parseInt(gas, 10) + 50000,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("升级成功", store.state.toast_success);
          data.showOneKeyModal = false;
        }
      } catch (e) {
        proxy.$toast("升级失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
        context.emit("refresh");
      }
    };
    const costName = computed(() => {
      return props.stockBox[props.info.quality].name || "";
    });
    const costImg = computed(() => {
      return props.stockBox[props.info.quality].img || "";
    });
    const remainNum = computed(() => {
      return props.stockBox[props.info.quality].num || 0;
    });
    const curProperty = computed(() => {
      return props.info.properties.reduce((pre, cur, curIdx) => {
        pre.push({
          title: usePropertyName(curIdx),
          value: cur / 100,
        });
        return pre;
      }, []);
    });

    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getUpdateInfo();
      await getOneKeyInfo();
      data.loading = false;
    });

    const handleClickUpgrade = async () => {
      data.showUpgradeModal = true;
    };
    const handleClickOneKeyUpgrade = async () => {
      await getOneKeyInfo();
      data.showOneKeyModal = true;
    };
    const getUpdateInfo = async () => {
      const c = store.state.c_training;
      data.updateInfo = await c.methods
        .getUpgradeDetail(props.info.tokenId)
        .call();
      data.nextInfo = data.updateInfo._properties.reduce((pre, cur, curIdx) => {
        pre.push({
          title: usePropertyName(curIdx),
          value: cur / 100,
        });
        return pre;
      }, []);
    };
    const getOneKeyInfo = async () => {
      const c = store.state.c_training;
      data.oneKeyInfo = await c.methods
        .getOnekeyUpgradeDetail(props.info.tokenId, data.account)
        .call();
      console.log("oneKey", data.oneKeyInfo);
    };
    const refData = toRefs(data);
    return {
      ...refData,
      costName,
      costImg,
      remainNum,
      curProperty,
      modalBtnText,
      handleClickUpgrade,
      handleClickOneKeyUpgrade,
      modalBtnClick,
    };
  },
};
</script>
<style lang='less' scoped>
.com_box {
  width: 100%;
  height: 100%;
  background: url("../../assets/upgrade/over_bg.png") no-repeat;
  background-size: 100% 100%;

  .power_box {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .text {
        font-size: 1.6rem;
      }
      .value {
        color: white;
        font-size: 2rem;
      }
      .pImg {
        img {
          height: 3rem;
        }
      }
    }
  }
  .cost_box {
    background: linear-gradient(
      180deg,
      rgba(234, 9, 9, 0.3) 0%,
      rgba(40, 2, 2, 0) 100%
    );
    .info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.5rem;
      color: white;
      img {
        height: 6rem;
      }
      .num {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.5rem;
      }
    }
    .divider {
      width: 100%;
    }
  }
  .property_box {
    position: relative;
    width: 100%;
    .empty {
      margin-top: 2rem;
      font-size: 2rem;
    }
    img {
      width: 100%;
    }
    .badge {
      position: absolute;
      width: 6rem;
      top: 0;
      left: 0;
      z-index: 20;
      transform: translate(-30%, -30%);
    }
    .inner {
      position: absolute;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        width: 50%;
        text-align: center;
        .title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        .property {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 1rem;
          .name {
            color: white;
          }
          .next {
            color: red;
          }
        }
      }
    }
  }
  .action_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    .disable {
      filter: grayscale(100);
      pointer-events: none;
    }
    .item {
      position: relative;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      height: 4rem;
      img {
        height: 100%;
      }
      .inner {
        position: absolute;
        font-size: 1.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.modal_inner_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .up {
    font-size: 2rem;
  }
  .sub {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .item {
      width: 15rem;
      img {
        width: 100%;
      }
    }
    .middle {
      width: 6rem;
      img {
        width: 100%;
      }
    }
  }
}
.injection {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
</style>