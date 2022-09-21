<template>
  <div class="container">
    <InjectGoBack />
    <CommonPageHeader :title="pageTitle" />
    <div class="content">
      <img class="bg" src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/store/success_bg.png" alt="" />
      <img class="item" :src="info.img" alt="" />
      <div class="text">
        数量: {{ num }} <br />
        <br />购买成功
      </div>
      <div class="back">{{ remainS }} s后进入背包</div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import CommonPageFooter from "../../components/common_page_footer";
import CommonPageHeader from "../../components/common_page_header";
import { useGetShopDetailByTokenId } from "./use_shop_items.js";
import InjectGoBack from "../../components/inject_go_back.vue";
export default {
  name: "minging",
  components: {
    CommonPageFooter,
    CommonPageHeader,
    InjectGoBack,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const data = reactive({
      info: "",
      jsonData: "",
      pageTitle: "购买成功",
      num: 0,
      remainS: 5,
      lazy: "",
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/mint/type${data.info.key}.json`),
      };
    });
    onBeforeMount(() => {
      data.info = useGetShopDetailByTokenId(
        JSON.parse(route.query.info).tokenId
      );
      data.num = route.query.num;
      lazyJump();
    });
    const lazyJump = () => {
      data.lazy = setInterval(() => {
        data.remainS--;
        if (data.remainS == 0) {
          router.push({
            name: "pack",
          });
        }
      }, 1000);
    };
    onBeforeRouteLeave(() => {
      if (data.lazy) {
        clearTimeout(data.lazy);
      }
    });

    const refData = toRefs(data);
    return {
      ...refData,
      lottie_options,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #563003 0%, #280505 100%);
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .bg {
    width: 35rem;
    animation: spin 3s ease-in-out infinite;
  }
  .item {
    width: 15rem;
    max-height: 15rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .text {
    transform: translateY(-5rem);
    font-size: 2rem;
  }
  .back {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    color: white;
    opacity: 0.5;
  }
}
</style>
