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
    <div class="tip_badge" @click="()=>$router.push({name:'order'})" >
      <div class="inner">
        <img src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/tip_badge.svg" />
        <div class="text">我的订单</div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
export default {
  name: "store",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectGoBack,
  },
  setup() {
    const data = reactive({
      pageTitle: "交易市场",
      campBox: [
        {
          name: "魏",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/camp/0.png",
        },
        {
          name: "蜀",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/camp/1.png",
        },
        {
          name: "吴",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/camp/2.png",
        },
        {
          name: "群",
          img: "http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/camp/3.png",
        },
      ],
    });

    onBeforeMount(() => {});

    const refData = toRefs(data);
    return {
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
  background: url("http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/market/bg.png") no-repeat;
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
