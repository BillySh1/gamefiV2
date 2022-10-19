<template>
  <div ref="mask" class="mask">
    <img :src="getMap" alt="" />
    <img
      v-if="!isShow"
      class="show"
      src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/stake/road/show.png"
      alt=""
      @click="() => (isShow = true)"
    />
    <div v-if="isShow" class="inner">
      <div class="scroll">
        <div class="s_inner">
          <img
            src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/stake/road/scroll_bg.png"
            alt=""
          />
          <div class="content">
            <!-- <div class="title">故事情节</div> -->
            <div class="c">
              本战役纯属虚构<br />
              东汉末年，天下三分<br />各族势力，暗流涌动<br />逐鹿中原，胜者为王<br />
              选择合适的路线，让行军的路线更加畅通，减少兵力损耗并尽可能削弱敌军战力，才能使我军利于不败之地
            </div>
          </div>

          <div class="hide" @click="() => (isShow = false)">
            <img
              src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/stake/road/hide.png"
              alt=""
            />
            <div class="text">点击收起 UI 观察地图</div>
          </div>
        </div>
      </div>
      <div class="action_box">
        <div class="item" @click="choose(0)">
          <img
            src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/stake/road/btn_bg.png"
            alt=""
          />
          <div class="text">{{ roadText[0] }}</div>
        </div>
        <div class="item" @click="choose(1)">
          <img
            src="https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/stake/road/btn_bg.png"
            alt=""
          />
          <div class="text">{{ roadText[1] }}</div>
        </div>
      </div>
    </div>
    <div class="back" @click="() => $emit('back')">返回</div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, computed, ref } from "vue";
import { initRoads } from "../../../utils/useRoutes";
export default {
  name: "choose_road",
  props: ["camp"],
  components: {},
  setup(props, ctx) {
    const mask = ref(null);
    const data = reactive({
      isShow: true,
    });
    const getMap = computed(() => {
      return [
        "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/main/map_0.png",
        "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/main/map_1.png",
        "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/main/map_2.png",
        "https://bafybeickixvp7jbv6tbrhv7xklr5vy2t6j6qgvf6maugc5xrvmj6tocd3u.ipfs.4everland.io/rich/allstar_assets/main/map_3.png",
      ][props.camp];
    });
    const roadText = computed(() => {
      return initRoads[props.camp];
    });
    const choose = (item) => {
      ctx.emit("choose", item);
      ctx.emit("back");
    };
    onBeforeMount(() => {});
    onMounted(() => {});
    const refData = toRefs(data);
    return {
      ...refData,
      getMap,
      mask,
      roadText,
      choose,
    };
  },
};
</script>
<style lang='less' scoped>
.mask {
  position: relative;
  width: 100%;
  height: 100%;
  .show {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 10%;
    height: 4rem;
    width: 10rem;
  }
  .back {
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
  img {
    width: 100%;
    height: 100%;
  }
  .main {
    position: absolute;
  }
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    .scroll {
      position: absolute;
      left: 5%;
      top: 5%;
      width: 45rem;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .s_inner {
        position: relative;
        width: 100%;
        height: auto;
        .hide {
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 10%;
          transform: translateX(120%);
          display: flex;
          align-items: center;
          img {
            height: 3rem;
            width: 3rem;
            margin-right: 2rem;
          }
          font-size: 1.5rem;
        }
        img {
          width: 100%;
        }
        .content {
          width: 80%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          .c {
            width: 100%;
            font-size: 1.5rem;
            line-height: 1.5;
          }
        }
      }
    }
    .action_box {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      .item {
        cursor: pointer;
        position: relative;
        width: 35rem;
        margin-right: 5rem;
        img {
          width: 100%;
        }
        .text {
          width: 80%;
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: #261813;
        }
      }
    }
  }
}
</style>