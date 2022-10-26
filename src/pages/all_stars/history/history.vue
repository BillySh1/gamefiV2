<template>
  <div class="box">
    <div class="topbar">
      <div class="title">
        <img
          src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/allstar_assets/store/title_bg.png"
          alt=""
        />
        <div class="text">理事馆</div>
      </div>
    </div>
    <div class="main">
      <img
        src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/allstar_assets/history/history_ctx_bg.png"
        alt=""
      />
      <div class="content">
        <div class="empty">维护中</div>
      </div>
    </div>
    <div class="footer">
      <div class="back" @click="() => $router.go(-1)">
        <img
          src="https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/allstar_assets/store/back.png"
          alt=""
        />
        <div class="text">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "bf_history",
  setup() {
    const data = reactive({});
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
.box {
  padding: 2rem 4rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: url("https://cryptorich3.mypinata.cloud/ipfs/QmYcwx7pKcH9y9kFCwx2pswmvjGSFPLPDv2Ld8SovipH2h/rich/allstar_assets/history/history_bg.png")
    no-repeat;
  background-size: 100% 100%;
}
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    position: relative;
    width: 20rem;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 48%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
    }
  }
}
.main {
  position: relative;
  width: 80%;
  margin: auto;
  img {
    width: 100%;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .empty {
      font-size: 2rem;
      color: white;
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .back {
    cursor: pointer;
    display: flex;
    font-size: 2rem;
    align-items: center;
    img {
      width: 3rem;
      margin-right: 2rem;
    }
  }
}
</style>