<template>
  <div class="stake_item">
    <div v-if="!info || !info.tokenId" class="empty">
      <img
        src="https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/allstar_assets/stake/add.png"
        alt=""
      />
    </div>
    <div class="stake_item_card" v-if="info && info.tokenId">
      <HeroCardItem :big="true" :info="info" />
    </div>
  </div>
  <div class="power_box">
    <div>战力值</div>
    <div>{{ info.power || 0 }}</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import HeroCardItem from "../../../components/hero_card_item.vue";
export default {
  name: "stake_item",
  components: {
    HeroCardItem,
  },
  props: ["info"],
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.stake_item {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: relative;
  width: 100%;
  height: 90%;
  background: url("https://cryptorich3.mypinata.cloud/ipfs/QmcFsLUaLoDqCKoQsHompg1stZheKthySUPkbndKTBPs1y/rich/allstar_assets/stake/stake_item_bg.png")
    no-repeat;
  background-size: 100% 100%;
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    img {
      width: 100%;
    }
  }
  .stake_item_card {
    position: absolute;
    width: 95%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.power_box {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}
</style>