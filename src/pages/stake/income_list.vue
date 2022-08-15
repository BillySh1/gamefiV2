<template>
  <div class="box">
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount } from "vue";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "Income_list",
  setup() {
    const data = reactive({
      account: "",
      web3: "",
    });
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getIncomeList();
    });
    const getIncomeList = async () => {};
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 2rem;
  box-sizing: border-box;
}
</style>