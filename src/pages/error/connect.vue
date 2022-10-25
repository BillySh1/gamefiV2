<template>
  <div class="container">
    <div class="content">
      <img
        class="bg_badge"
        src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/assets/pack/bg_badge.svg"
        alt=""
      />

      <div class="empty">{{ t("wallet_error_connect") }}</div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
import { useI18n } from "vue-i18n";
export default {
  name: "connect",
  components: {},
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: "local",
    });
    const data = reactive({
      account: "",
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
