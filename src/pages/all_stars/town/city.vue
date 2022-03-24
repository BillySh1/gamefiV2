<template>
  <div ref="bg" class="box">
    <div
      @click="
        () =>
          $router.push({
            name: 'bf_main',
          })
      "
      class="back"
    >
      <div class="inner">
        <img src="../../../allstar_assets/city/back.png" alt="" />
        <div class="text">返回</div>
      </div>
    </div>
    <div class="menu">
      <div
        class="item"
        v-for="item in menu"
        :key="item.key"
        @click="() => $router.push({ name: item.to })"
        :style="item.disable ? 'filter:grayscale(100);pointer-events:none' : ''"
      >
        <img :src="item.img" alt="" />
        <div class="text">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="camp">
      <div class="inner">
        <img :src="campImg" alt="" />
        <div class="text">{{ campText }}</div>
      </div>
    </div>
    <div class="board">
      <div class="inner" @click="() => $router.push({ name: 'bf_history' })">
        <img src="../../../allstar_assets/city/board.png" alt="" />
        <div class="text">理事馆</div>
      </div>
      <div class="inner" @click="() => $router.push({ name: 'bf_casio' })">
        <img src="../../../allstar_assets/city/casio_bg.png" alt="" />
        <div class="text">赌场</div>
      </div>
    </div>
    <div v-if="player.baseSpeed == 0" class="empty" @click="() => $router.push({ name: 'bf_stake' })">
      <img src="../../../allstar_assets/city/empty.png" alt="" />
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, computed, ref } from "vue";
import initWeb3 from "../../../utils/initWeb3";
import { useStore } from "vuex";
export default {
  name: "bf_base",
  setup() {
    const bg = ref(null);
    const store = useStore();
    const data = reactive({
      menu: [
        {
          key: 0,
          name: "天策府",
          img: require("../../../allstar_assets/city/item_0.png"),
          to: "bf_stake",
        },
        {
          key: 1,
          name: "驿站",
          img: require("../../../allstar_assets/city/item_1.png"),
          to: "bf_store",
        },
        {
          key: 2,
          name: "名人堂",
          img: require("../../../allstar_assets/city/item_2.png"),
          disable: true,
        },
      ],
      camp: 0,
      account: "",
      web3: "",
      player: "",
    });
    const campImg = computed(() => {
      return [
        require("../../../allstar_assets/all_stars/entry/camp/c_0.png"),
        require("../../../allstar_assets/all_stars/entry/camp/c_1.png"),
        require("../../../allstar_assets/all_stars/entry/camp/c_2.png"),
        require("../../../allstar_assets/all_stars/entry/camp/c_3.png"),
      ][data.camp];
    });
    const campText = computed(() => {
      return ["魏", "蜀", "吴", "雄"][data.camp];
    });
    const getBgImg = () => {
      const campBg = [
        require("../../../allstar_assets/city/bg_0.png"),
        require("../../../allstar_assets/city/bg_1.png"),
        require("../../../allstar_assets/city/bg_2.png"),
        require("../../../allstar_assets/city/bg_3.png"),
      ][data.camp];
      bg.value.style.background = `url(${campBg}) no-repeat`;
      bg.value.style.backgroundSize = "100% 100%";
    };
    onBeforeMount(async () => {
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getPlayer();
    });
    const getPlayer = async () => {
      const c = store.state.c_battle;
      const player = await c.methods.players(data.account).call();
      data.camp = player.camp;
      getBgImg();
      data.player = player;
    };

    const refData = toRefs(data);
    return {
      ...refData,
      campImg,
      campText,
      bg,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
}
.back {
  cursor: pointer;
  position: absolute;
  top: 5%;
  left: 0;
  width: 20rem;
  &:hover {
    opacity: 0.8;
  }
  .inner {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    font-size: 3rem;
    color: #f2dbb9;
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-100%, -55%);
    }
  }
}
.menu {
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translate(-0, -40%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .item {
    &:hover {
      opacity: 0.8;
    }
    cursor: pointer;
    position: relative;
    width: 30rem;
    img {
      width: 100%;
    }
    .text {
      color: white;
      position: absolute;
      font-size: 3rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.camp {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translate(0, -50%);
  width: 15rem;
  .inner {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5rem;
    }
  }
}
.board {
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 30rem;
  .inner {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
    }
  }
}
.empty {
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  position: absolute;
  top: 2%;
  right: 5%;
  width: 20rem;
  img {
    width: 100%;
  }
}
</style>