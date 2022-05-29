<template>
  <div class="box">
    <div class="left">1</div>
    <div class="scroll">
      <div class="hero_item" v-for="item in rawData" :key="item.key">
        <StakeItem />
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
import StakeItem from "./components/stake_item.vue";
export default {
  name: "stk_go",
  coomponents: {
    StakeItem,
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
      console.log(data.rawData,'gggg')
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
        data.filteredData = JSON.parse(JSON.stringify(data.rawData));
        data.total = Math.ceil(data.filteredData.length / 4);
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
}
.left {
  width: 10%;
}
.scroll {
  width: 60%;
  .hero_item{
    width: 10rem
  }
}

.right {
  width: 30%;
}
</style>