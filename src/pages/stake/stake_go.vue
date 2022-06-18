<template>
  <div class="box">
    <div class="left">1</div>
    <div class="scroll">
      <div class="hero_item" v-for="(item, index) in rawData" :key="index">
        <stake_pack_item :info="item"  />
      </div>
    </div>
    <div class="right">3</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import useHeroDetail from "../../utils/useHeroDetail.js";
import initWeb3 from "../../utils/initWeb3";
import stake_pack_item from "./components/stake_pack_item.vue";
export default {
  name: "stk_go",
  coomponents: {
    stake_pack_item,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      rawData: [],
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

    const getPack = async () => {
      try {
        const c = store.state.c_hero;
        const res = await c.methods.cardList(data.account).call();
        data.rawData = [];
        res.map((x) => {
          const uid =
            x.camp.toString() + x.rarity.toString() + x.heroId.toString();
          data.rawData.push({
            tokenId: x.tokenId,
            heroId: x.heroId,
            rarity: x.rarity,
            quality: x.quality,
            properties: x.properties.map((x) => Number(x) / 100),
            power: Number(x.power) / 100,
            star: x.star,
            rebirthTimes: x.rebirthTimes,
            preference: x.preference,
            native: x.native,
            level: x.level,
            camp: x.camp,
            addition: x.addition,
            uid: uid,
            ...useHeroDetail(uid, x.preference),
          });
        });
      } catch (e) {
        proxy.$toast("获取武将背包失败", store.state.toast_error);
      }
    };
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;

  background: url("../../assets/stake/stake/stake_bg.png") no-repeat;
  background-size: 100% 100%;
}
.left {
  width: 10%;
}
.scroll {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  .hero_item {
    width: 10rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
}

.right {
  width: 30%;
}
</style>