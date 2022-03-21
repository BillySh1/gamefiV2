<template>
  <BfPack @close="() => (showPack = false)" :value="showPack" />

  <Lottie
    v-if="loading"
    :options="{ animationData: require('../../assets/common/loading.json') }"
  />
  <div v-else class="box">
    <img class="map" :src="getMap" alt="" />
    <div class="main">
      <div class="inner">
        <div class="city_main" @click="() => $router.push({ name: 'bf_base' })">
          <div class="inner">
            <div class="up">
              {{ campText }}
            </div>
            <img
              class="p"
              src="../../allstar_assets/main/city_img.png"
              alt=""
            />
            <div class="txt">主城</div>
          </div>
        </div>
        <div class="pack_btn" @click="() => (showPack = true)">
          <div class="text">行军背包</div>
        </div>
        <div class="back_home" @click="() => $router.push({ name: 'home' })">
          返回主页
        </div>
        <div class="right-top">
          <div class="day_step">
            <div>第一日</div>
            <div class="des">风和日丽</div>
            <img src="../../allstar_assets/weather/sunny.png" alt="" />
          </div>
          <div class="power_zone">
            <div>我军总战力</div>
            <img src="../../assets/pack/power_item.png" alt="" />
            <div>暂不可见</div>
          </div>
        </div>

        <div class="pre_time_view">
          <div>
            距离下一个据点 <span style="color: red">{{ nextName }}</span> 还剩
          </div>
          <div class="time_row">
            <img src="../../allstar_assets/main/clock.png" alt="" />
            {{ timing }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import initWeb3 from "../../utils/initWeb3";
import BfPack from "./town/bf_pack.vue";
import { useStore } from "vuex";
export default {
  name: "bf_main",
  components: {
    BfPack,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      curCamp: 0,
      nextName: "合川",
      loading: false,
      showPack: false,
    });
    const campText = computed(() => {
      return ["魏", "蜀", "吴", "群"][data.curCamp];
    });
    const timing = computed(() => {
      return "4时20分30秒";
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
      await getPlayer();
      data.loading = false;
    });
    const getPlayer = async () => {
      const c = store.state.c_battle;
      const player = await c.methods.players(data.account).call();
      data.player = player;
      data.curCamp = player.camp;
    };
    const getMap = computed(() => {
      return [
        require("../../allstar_assets/main/map_0.png"),
        require("../../allstar_assets/main/map_1.png"),
        require("../../allstar_assets/main/map_2.png"),
        require("../../allstar_assets/main/map_3.png"),
      ][data.curCamp];
    });
    const refData = toRefs(data);
    return {
      ...refData,
      campText,
      timing,
      getMap,
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
  background: url("../../allstar_assets/main/main_camp.png") no-repeat;
  background-size: 100% 100%;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .up {
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 3.5rem;
    }
    .p {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
    }
    .txt {
      white-space: nowrap;
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 3rem;
    }
  }
}
.back_home {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 1%;
  bottom: 1%;
  width: 20rem;
  padding: 0.5rem 0;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 2rem;
}
.pack_btn {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  left: 2%;
  bottom: 15%;
  width: 7rem;
  height: 7rem;
  background: url("../../allstar_assets/main/pack_bg.png") no-repeat;
  background-size: 100% 100%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    white-space: nowrap;
  }
}
.right-top {
  position: absolute;
  top: 1%;
  right: 1%;
  .day_step {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    min-width: 25rem;
    padding: 0.5rem 0;
    background: rgba(44, 3, 3, 0.6);
    border-radius: 20px;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    .des {
      margin: 0 2rem;
    }
    img {
      width: 3rem;
    }
  }
  .power_zone {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    min-width: 25rem;
    padding: 0.5rem 0;
    background: rgba(44, 3, 3, 0.6);
    border-radius: 20px;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .des {
      margin: 0 2rem;
    }
    img {
      margin: 0 1rem;
      width: 2rem;
    }
  }
}

.pre_time_view {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  right: 1%;
  bottom: 1%;
  min-width: 20rem;
  padding: 0.5rem 1rem;
  background: rgba(44, 3, 3, 0.6);
  border-radius: 20px;
  font-size: 2rem;
  text-align: center;

  .time_row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 2rem;
    margin-top: 1rem;
    img {
      margin: 0 1rem;
      width: 2.5rem;
    }
  }
}
</style>