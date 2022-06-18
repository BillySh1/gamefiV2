<template>
  <div class="box">
    <div class="bottom">
      <StkBtn
        @click="
          () => {
            $router.push({
              name: 'stk_entry',
            });
          }
        "
        :text="'考虑一下'"
      />

      <div class="btn_wrapper" @click="clickMission">
        <img class="btn_bg" src="../../assets/stake/choose/btn_bg.png" alt="" />
        <div class="text">下一步</div>
      </div>
    </div>

    <div class="main_body">
      <div
        class="item"
        v-for="(item, index) in map"
        :key="index"
        @click="() => (activeIndex = index)"
        :style="activeIndex !== index ? 'filter:grayscale(1)' : ''"
      >
        <div class="img_box">
          <img
            class="img_bg"
            src="../../assets/stake/choose/select_bg.png"
            :style="activeIndex === index ? 'opacity:1' : ''"
          />
          <img class="icon" :src="item.img" alt="" />
          <img
            :style="activeIndex === index ? 'opacity:1' : ''"
            class="img_badge"
            src="../../assets/stake/choose/selected.png"
            alt=""
          />
        </div>
        <div class="intro_box">
          <div class="md">执行{{ item.name }}任务</div>
          <img class="badge" src="../../assets/stake/divider.png" alt="" />
          <div class="sm">为期{{ item.time }}天</div>
          <div class="sm">战力增幅:</div>
          <div class="xs">可质押战力值10%的MDAO</div>
          <div class="xs">以此提示总战力的1%</div>

          <div class="sm">您已经进行过 3次</div>
          <div class="sm">当前是否存在复利 否</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import StkBtn from "./components/stk_btn.vue";
import { useRouter } from "vue-router";
export default {
  name: "choose_mission",
  components: {
    StkBtn,
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      map: [
        {
          name: "斥候",
          time: 7,
          apy: 1000,
          img: require("../../assets/stake/choose/mission_1.png"),
        },
        {
          name: "扫荡",
          time: 15,
          apy: 900,
          img: require("../../assets/stake/choose/mission_2.png"),
        },
        {
          name: "驻扎",
          time: 30,
          apy: 800,
          img: require("../../assets/stake/choose/mission_3.png"),
        },
      ],
      activeIndex: 0,
    });
    const clickMission = (idx) => {
      localStorage.setItem("stake_diff", idx);
      router.push({
        name: "stk_go",
      });
    };

    const refData = toRefs(data);
    return {
      ...refData,
      clickMission,
    };
  },
};
</script>
<style lang='less' scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/stake/detail/story_bg.png") no-repeat;
  background-size: 100% 100%;
}
.bottom {
  width: 70%;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn_wrapper {
    position: relative;
    width: 15rem;
    cursor: pointer;
    .btn_bg {
      width: 100%;
    }
    .text {
      font-size: 1.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.place_zone {
  position: absolute;
  bottom: 3%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text {
    background: url("../../assets/stake/place_text_bg.png") no-repeat;
    background-size: 100% 100%;
    width: 15rem;
    padding: 0.5rem 0;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .img {
    width: 10rem;
  }
}
.top_right {
  position: absolute;
  top: 3%;
  right: 3%;
  display: flex;
  align-items: center;
  img {
    width: 4rem;
    margin-right: 1.5rem;
  }
  .text {
    font-size: 1.3rem;
    margin-right: 1rem;
  }
}
.main_body {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  display: flex;
  align-items: center;
  .item {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 3rem;
    .img_box {
      width: 16rem;
      position: relative;
      &:hover {
        .img_bg {
          opacity: 1;
        }
        .img_badge {
          opacity: 1;
        }
      }
      .img_bg {
        opacity: 0;
        width: 100%;
      }
      .img_badge {
        position: absolute;
        opacity: 0;
        width: 4rem;
        right: 10%;
        bottom: 5%;
      }
      .icon {
        border-radius: 16px;
        width: 12rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .intro_box {
      display: flex;
      flex-direction: column;
      text-align: left;
      .badge {
        width: 10rem;
        margin: 1rem 0;
      }
      .md {
        font-size: 1.8rem;
      }
      .sm {
        font-size: 1.3rem;
      }
      .xs {
        font-size: 1rem;
      }
    }
  }
}
</style>