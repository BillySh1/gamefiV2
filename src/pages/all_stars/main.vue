<template>
  <div class="box">
    <img class="map" src="../../allstar_assets/main/test_map.png" alt="" />

    <div class="main">
      <div class="inner">
        <div class="city_main">
          <img src="../../allstar_assets/main/main_camp.png" alt="" />
          <div class="inner">
            <div class="up">
              {{ campText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "bf_main",
  setup() {
    const data = reactive({
      account: "",
      web3: "",
      curCamp: 0,
    });
    const campText = computed(() => {
      return ["魏", "蜀", "吴", "群"][data.curCamp];
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
    });
    const refData = toRefs(data);
    return {
      ...refData,
      campText,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  .map {
    width: 100%;
    height: 100%;
  }
  .main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    .inner {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
.city_main {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 1%;
  top: 1%;
  width: 9rem;
  height: 18rem;
  img {
    width: 100%;
    height: 100%;
  }
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // .up {
    //   position: absolute;
    //   top: 10%;
    //   left: 50%;
    //   font-size: 3rem;
    // }
  }
}
</style>