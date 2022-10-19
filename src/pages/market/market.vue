<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <div
        v-for="(item, index) in campBox"
        :key="index"
        class="item"
        @click="
          () => $router.push({ name: 'marketDetail', query: { type: index } })
        "
      >
        <img :src="item.img" alt="" />
      </div>
    </div>
    <div class="tip_badge" @click="() => $router.push({ name: 'order' })">
      <div class="inner">
        <img
          src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/common/tip_badge.svg"
        />
        <div class="text">{{ t("my_order") }}</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import { useI18n } from "vue-i18n";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
  },
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const data = reactive({
      pageTitle: t("market_page_title"),
      campBox: [
        {
          name: t("camp_0"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/market/camp/0.png",
        },
        {
          name: t("camp_1"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/market/camp/1.png",
        },
        {
          name: t("camp_2"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/market/camp/2.png",
        },
        {
          name: t("camp_3"),
          img: "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/market/camp/3.png",
        },
      ],
    });

    const refData = toRefs(data);
    return {
      t,
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/assets/market/bg.png")
    no-repeat;
  background-size: cover;
  .tip_badge {
    cursor: pointer;
    position: absolute;
    bottom: 8rem;
    left: 0;
    white-space: nowrap;
    .inner {
      position: relative;
      img {
        width: 10rem;
        opacity: 1;
      }
      .text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .item {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    height: 20rem;
    img {
      height: 100%;
    }
  }
}
</style>
