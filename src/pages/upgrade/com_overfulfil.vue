<template>
  <div class="com_box">
    <div class="power_box">
      <img src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/upgrade/power_bg.png" />
      <div class="inner">
        <div class="text">战力值</div>
        <div class="value">{{ info.power }}</div>
        <div class="pImg">
          <img src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/pack/power_item.png" alt="" />
        </div>
      </div>
    </div>
    <div class="cost_box">
      <div class="info">
        需要消耗
        <div class="num">{{ updateInfo.breakGemUse }}</div>
        <strong style="color: yellow">玉灵瓶</strong> 突破
        <img src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/store/item/yuruyi.png" alt="" />
      </div>
      <div class="sub_info">
        当前拥有 <img src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/store/item/yuruyi.png" alt="" /><span
          style="color: yellow"
          >玉灵瓶</span
        >, 数量: {{ remainNum }}
        <span
          v-if="Number(remainNum) < Number(updateInfo.breakGemUse)"
          style="margin-left: 1rem"
          >数量不足</span
        >
      </div>
      <img class="divider" src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/upgrade/divider.png" />
    </div>
    <div v-if="canDo" class="over_box">
      <img class="badge" src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/upgrade/proper_badge.png" />
      <div class="info">
        您将为 <span style="color: yellow">{{ info.name }}</span> 突破并升星
      </div>
      <div>突破后战力值</div>
      <div class="power_value">
        {{ updateInfo.power / 100 }}
      </div>
      <div
        :class="
          Number(updateInfo.breakGemUse) > Number(remainNum) || loading
            ? 'action_btn disable'
            : 'action_btn'
        "
        @click="handleBtnClick"
      >
        <img src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/upgrade/action_bg_round.png" alt="" />
        <div class="inner">{{ btnText }}</div>
      </div>
    </div>
    <div v-else class="over_box">
      <div class="empty">{{ emptyText }}</div>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onBeforeMount,
  computed,
  getCurrentInstance,
} from "vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "com_upgrade",
  props: ["info", "stockBox"],
  setup(props, context) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      updateInfo: "",
      account: "",
      web3: "",
      remainNum: 0,
      canDo: false,
      btnStatus: 0,
      loading: false,
    });
    const store = useStore();

    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getUpdateInfo();
      await getRemainNum();
    });
    const handleBtnClick = async () => {
      data.loading = true;
      if (data.btnStatus == 0) {
        await approveStock();
      } else if (data.btnStatus == 1) {
        await overfulfill();
      }
      data.loading = false;
    };
    const approveStock = async () => {
      try {
        proxy.$toast(`等待授权 玉灵瓶`, store.state.toast_info);
        const c = store.state.c_richShop;
        const addr = store.state.c_training.options.address;
        const isApproved = await c.methods
          .isApprovedForAll(data.account, addr)
          .call();
        if (isApproved) {
          proxy.$toast(`授权额度足够，无需授权`, store.state.toast_info);
          data.btnStatus = 1;
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
          data.btnStatus = 1;
          proxy.$toast(`授权成功`, store.state.toast_success);
        }
      } catch (e) {
        proxy.$toast(`授权失败`, store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
      }
    };

    const overfulfill = async () => {
      try {
        proxy.$toast('wait', store.state.toast_info);
        const c = store.state.c_training;
        const gasPrice = await data.web3.eth.getGasPrice();
        const tokenId = props.info.tokenId;
        const gas = await c.methods
          .upgradeStar(tokenId)
          .estimateGas({ from: data.account });
        data.loading = true;
        const res = await c.methods.upgradeStar(tokenId).send({
          gasPrice: gasPrice,
          gas: gas,
          from: data.account,
        });
        if (res.status) {
          proxy.$toast("突破成功", store.state.toast_success);
          data.showOneKeyModal = false;
        }
      } catch (e) {
        proxy.$toast("突破失败", store.state.toast_error);
        console.log(e);
      } finally {
        data.loading = false;
        context.emit("refresh");
      }
    };
    const getRemainNum = async () => {
      const c = store.state.c_richShop;
      data.remainNum = await c.methods.balanceOf(data.account, "7").call();
    };
    const getUpdateInfo = async () => {
      const c = store.state.c_training;
      data.updateInfo = await c.methods
        .getUpgradeStarDetails(props.info.tokenId)
        .call();
      data.canDo = data.updateInfo.canUpgradeStar;
    };
    const emptyText = computed(() => {
      const stars = [1, 3, 4, 5, 10][props.info.rarity];
      if (props.info.star < stars) {
        return "您未满级,无法突破";
      } else {
        return "您已满星，请前往进阶";
      }
    });
    const btnText = computed(() => {
      return ["授权", "突破"][data.btnStatus];
    });
    const refData = toRefs(data);
    return {
      ...refData,
      btnText,
      emptyText,
      handleBtnClick,
    };
  },
};
</script>
<style lang='less' scoped>
.com_box {
  width: 100%;
  height: 100%;
  background: url("https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/upgrade/over_bg.png") no-repeat;
  background-size: 100% 100%;
  .empty {
    margin-top: 4rem;
    color: white;
  }
  .power_box {
    position: relative;
    width: 100%;
    height: 6rem;
    img {
      width: 100%;
      height: 100%;
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
          width: 2rem;
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
    .sub_info {
      max-width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: rgba(255, 255, 255, 0.6);
      img {
        height: 2rem;
      }
    }
    .divider {
      width: 100%;
    }
  }
  .over_box {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;
    gap: 2rem;
    .badge {
      position: absolute;
      width: 6rem;
      top: 0;
      left: 0;
      z-index: 20;
      transform: translate(-30%, -30%);
    }
    .info {
      margin-top: 2rem;
    }
    .power_value {
      color: red;
    }
    .disable {
      pointer-events: none;
      filter: grayscale(100);
    }
    .action_btn {
      cursor: pointer;
      position: relative;
      width: 8rem;
      img {
        width: 100%;
      }
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>