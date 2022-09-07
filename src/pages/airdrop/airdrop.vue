<template>
  <div class="container">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack />
    <div class="content">
      <img
        class="bg_badge"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/bg_badge.svg"
        alt=""
      />
      <div v-if="quality" class="main">
        <Lottie :options="lottie_options" />
      </div>
      <div v-else class="empty">{{ t("airdrop_no_valid") }}</div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { reactive, toRefs, computed, onBeforeMount } from "vue";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectGoBack from "../../components/inject_go_back.vue";
import initWeb3 from "../../utils/initWeb3";
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
      pageTitle: t("airdrop_space"),
      quality: false,
      account: "",
      web3: "",
    });
    onBeforeMount(async () => {
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      data.loading = false;
    });
    const lottie_options = computed(() => {
      return {
        animationData: require(`../../assets/aridrop/after2.json`),
      };
    });

    const refData = toRefs(data);
    return {
      t,
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
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg_badge {
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 15%;
    opacity: 0.8;
  }
}
.empty {
  font-size: 2rem;
}
</style>
