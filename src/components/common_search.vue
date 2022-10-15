<template>
  <div class="search_box">
    <img
      style="width: 2rem"
      src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/pack/search.svg"
      alt=""
    />
    <div class="text">{{$t('search')}}</div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
export default {
  name: "common_search",
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.search_box {
  &:hover {
    opacity: 1;
  }
  padding: 0.5rem 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-sizing: border-box;
  border-radius: 200px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  .text {
    margin-left: 1rem;
    font-size: 1.5rem;
  }
}
</style>
