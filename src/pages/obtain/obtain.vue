<template>
  <CommonPageHeader :title="pageTitle" />
  <InjectGoBack />
  <div class="center">
    <div class="item">
      当前累计收益
      <div>11,332,223 MDAO</div>
      <img
        style="width: 8rem"
        src="../../assets/exchange/baoxiang.png"
        alt=""
      />
    </div>
    <div class="item squze">
      <div class="squze" style="margin-right: 1.5rem">
        解锁时间
        <div>15天6时51分</div>
      </div>
      <div class="squze">
        可领取的MDAO
        <div>126341 MDAO</div>
      </div>
    </div>
    <div class="item item_center">
      <CommonButton class="btn" :circle="true">领 取</CommonButton>
    </div>
  </div>
  <div class="bg_badge">
    <img
      class="badge"
      src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/pack/bg_badge.svg"
      alt=""
    />
  </div>
  <CommonPageFooter />
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import CommonPageHeader from "../../components/common_page_header.vue";
import CommonPageFooter from "../../components/common_page_footer.vue";
import CommonButton from "../../components/common_button.vue";
import InjectGoBack from "../../components/inject_go_back.vue";
export default {
  name: "obtain",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack,
  },
  setup() {
    const data = reactive({
      pageTitle: "领取",
    });
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.center {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .item {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: space-between;
    font-size: 2rem;
    margin-bottom: 2rem;
    .btn {
      font-size: 2rem;
      width: 25%;
    }
  }
  .squze {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    justify-content: unset;
    margin-right: 1.5rem;
  }
  .item_center {
    justify-content: center;
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