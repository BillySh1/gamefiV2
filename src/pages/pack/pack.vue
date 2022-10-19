<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoback v-if="curShowType == undefined" />
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
        <img
          class="badge"
          src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/pack/bg_badge.svg"
          alt=""
        />
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
import InjectGoback from "../../components/inject_go_back.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "pack",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectPackHero,
    CommonPackDetail,
    InjectGoback,
  },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const data = reactive({
      pageTitle: t('myPack'),
      routerItems: [
        {
          key: 0,
          name: t("hero"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/pack/0.png",
        },
        {
          key: 1,
          name: t("equipment"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/pack/1.png",
        },
        {
          key: 2,
          name: t("treasure"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/pack/2.png",
        },
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
  background: url("https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/pack/pack_hero_bg.svg")
    no-repeat;
  background-size: cover;
}
.type_bpx {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 100;
  .item {
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    opacity: 1;
    img {
      width: 18rem;
    }
    .text {
      margin-top: 1rem;
      font-size: 2.5rem;
    }
  }
}
.bg_badge {
  position: absolute;
  bottom: 15%;
  width: 100%;
  .badge {
    width: 100%;
  }
  .top {
    transform: translateY(-1.5rem);
  }
}
</style>
