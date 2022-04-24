<template>
  <CommonPageHeader :title="pageTitle" />
  <InjectGoBack />
  <div class="center">
    <div class="item">
      当前累计收益
      <div>11,332,223 MMC</div>
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
        可领取的MMC
        <div>126341 MMC</div>
      </div>
    </div>
    <div class="item item_center" >
        <CommonButton class="btn" :circle="true">领 取</CommonButton>
    </div>
  </div>
  <CommonPageFooter />
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import CommonPageHeader from "../../components/common_page_header.vue";
import CommonPageFooter from "../../components/common_page_footer.vue";
import CommonButton from '../../components/common_button.vue'
import InjectGoBack from '../../components/inject_go_back.vue'
export default {
  name: "obtain",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    CommonButton,
    InjectGoBack
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
    .btn{
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
  .item_center{
      justify-content: center;
  }
}
</style>