<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <div v-if="showDetailPack" class="content hero_pack">
      <InjectPackHero
        @back="() => (curShowType = undefined)"
        :value="curShowType == 0"
      />
      <CommonPackDetail
        @back="() => (curShowType = undefined)"
        :value="curShowType == 1 || curShowType == 2"
        :type="curShowType"
      />
    </div>
    <div v-else class="content">
      <div class="type_bpx">
        <div
          v-for="item in routerItems"
          :key="item.key"
          class="item"
          @click="() => (curShowType = item.key)"
        >
          <img :src="item.img" alt="" />
          <div class="text">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="bg_badge">
        <img class="badge" src="../../assets/pack/bg_badge.svg" alt="" />
        <img class="badge top" src="../../assets/pack/line.svg" alt="" />
      </div>
    </div>

    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectPackHero from "../../components/inejct_pack_hero";
import CommonPackDetail from "./common_pack_detail";
export default {
  name: "pack",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectPackHero,
    CommonPackDetail,
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      pageTitle: "我的背包",
      routerItems: [
        { key: 0, name: "武将", img: require("../../assets/pack/0.svg") },
        { key: 1, name: "装备", img: require("../../assets/pack/1.svg") },
        { key: 2, name: "珍宝", img: require("../../assets/pack/2.svg") },
      ],
      curShowType: undefined,
    });

    onBeforeMount(() => {
      data.curShowType = route.query.type;
    });
    const showDetailPack = computed(() => {
      if (data.curShowType !== undefined) {
        return true;
      }
      return false;
    });
    const refData = toRefs(data);
    return {
      ...refData,
      showDetailPack,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #280505;
}
.hero_pack {
  background: url("../../assets/pack/pack_hero_bg.svg") no-repeat;
  background-size: cover;
}
.type_bpx {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 100;
  .item {
    &:hover {
      opacity: 1;
    }
    cursor: pointer;
    opacity: 0.8;
    img {
      width: 23rem;
    }
    .text {
      margin-top: 1rem;
      font-size: 2.5rem;
    }
  }
}
.bg_badge {
  position: absolute;
  bottom: 10%;
  width: 100%;
  .badge {
    width: 100%;
  }
  .top {
    transform: translateY(-1.5rem);
  }
}
</style>
