<template>
  <div v-if="value" class="container" @click="() => $emit('close')">
    <img class="badge" src="../../../assets/common/hero_sit.png" alt="" />
    <img class="light" src="../../../assets/store/success_bg.png" alt="" />
    <div
      class="content"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <div class="main">
        <div class="title">恭喜您获得了</div>
        <div class="up_box">
          <div style="margin-right: 2rem">
            {{ curInfo.name }}
          </div>
          <div>
            数量:
            {{ curInfo.num }}
          </div>
        </div>

        <div class="card">
          <CommonButton
            v-if="newMintedItems.length > 1 && curIndex > 0"
            @click="
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                curIndex--;
              }
            "
            class="left"
            >上一项</CommonButton
          >
          <img :src="curInfo.img" alt="" />

          <CommonButton
            v-if="
              newMintedItems.length > 1 && curIndex < newMintedItems.length - 1
            "
            @click="
              (e) => {
                e.preventDefault();
                e.stopPropagation();
                curIndex++;
              }
            "
            class="right"
            >下一项</CommonButton
          >
        </div>
        <div class="bottom">
          <CommonButton
            class="btn"
            @click="
              () =>
                $router.push({
                  name: 'bf_main',
                })
            "
            >放入背包</CommonButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import CommonButton from "../../../components/common_button.vue";
export default {
  name: "minging",
  props: ["value", "newMintedItems"],
  components: {
    CommonButton,
  },
  setup(prop) {
    const data = reactive({
      curIndex: 0,
    });

    const curInfo = computed(() => {
      return prop.newMintedItems[data.curIndex] || {};
    });

    const refData = toRefs(data);
    return {
      ...refData,
      curInfo,
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .badge {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .light {
    width: 35rem;
    animation: spin 3s ease-in-out infinite;
  }
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 2rem;
    }
    .up_box {
      display: flex;
      font-size: 2rem;
      margin: 1.5rem 0;
    }
    .bottom {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      margin-top: 2rem;
      .btn {
        cursor: pointer;
        margin-right: 1rem;
      }
    }
    .card {
      position: relative;
      cursor: pointer;
      width: 10rem;
      img {
        width: 100%;
      }
      .left {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(-200%, -50%);
      }
      .right {
        position: absolute;
        top: 50%;
        right: 0%;
        transform: translate(200%, -50%);
      }
    }
  }
}
</style>
