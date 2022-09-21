<template>
  <div class="event_mask">
    <div class="content">
      <img
        @click="() => $emit('close')"
        class="close"
        src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/close.svg"
        alt=""
      />
      <img
        class="c_bg"
        src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/scroll_vertical.png"
        alt=""
      />
      <div class="top">
        <div class="place">
          <img
            src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/place_bg.png"
            alt=""
          />
          <div class="text">{{ placeText }}</div>
        </div>
        <div class="status">
          <img
            src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/alert_icon.png"
            alt=""
          />
          <div>集结中</div>
        </div>
      </div>
      <div class="inner">
        <div class="intro">
          您将在 {{ placeText }} 集结重兵与敌军展开战斗, 也可选择继续前进
        </div>
        <div class="time">
          <div>您已在此集结了</div>
          <div class="clock">
            <img
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/main/clock.png"
              alt=""
            />
            <div>05:43:24</div>
          </div>
        </div>
        <div class="info">
          <div class="item">
            <div class="red">5%</div>
            <div>您将获得战力加成</div>
          </div>
          <img
            src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/divider.png"
            alt=""
          />
          <div class="item">
            <div class="green">未知</div>
            <div>敌对阵营</div>
          </div>
        </div>
        <div class="action">
          <div
            v-if="type == 2"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="() => $emit('march', 1)"
          >
            <img
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/btn_green.png"
              alt=""
            />
            <div class="text">投降</div>
          </div>
          <div
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="() => $emit('march', 0)"
          >
            <img
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/btn_green.png"
              alt=""
            />
            <div class="text">继续前进</div>
          </div>
          <div
            v-if="[2, 3, 4, 6].includes(type)"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="() => $emit('march', 2)"
          >
            <img
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/btn_orange.png"
              alt=""
            />
            <div class="text">战斗</div>
          </div>
          <div
            v-if="type == 'lock'"
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="unlock"
          >
            <img
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/allstar_assets/popups/btn_orange.png"
              alt=""
            />
            <div class="text">打扫战场</div>
          </div>
        </div>
      </div>
    </div>
    <div class="img_intro">
      <img src="../../../allstar_assets/popups/scroll_bg.png" alt="" />
      <div class="inner">
        <div class="top">
          <div class="dot"></div>
          <div class="place">{{ placeText }}</div>
        </div>
        <div class="text_intro">
          自古以来此处都乃兵家必争之地，时至今日，两国在此为了争夺鹿原的门户再次在此集结重兵。
        </div>
      </div>
    </div>
    <div class="badge">
      <div class="num">
        当前您的阵营有 <span class="text">8人</span> 在此集结
      </div>
      <div class="power">我方总战力 <span class="text">14490000</span></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "event_1_view",
  props: ["value", "type", "placeText"],
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
.event_mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: url("../../../allstar_assets/popups/readyBg.png");
  background-size: 100% 100%;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  width: auto;
  height: auto;
  margin-right: 2rem;
  .close {
    cursor: pointer;
    position: absolute;
    left: 0%;
    top: 0%;
    transform: translateX(-200%);
    width: 3rem;
  }
  .c_bg {
    width: 50rem;
    height: 40rem;
  }
  .top {
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -31%);
    display: flex;
    align-items: center;
    .place {
      width: 40%;
      position: relative;
      white-space: nowrap;
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
      margin-right: 2rem;
    }
    .status {
      height: 5rem;
      background: #3f2a12;
      border-radius: 4px;
      padding: 0.5rem 2rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      img {
        height: 60%;
        margin-right: 1rem;
      }
      font-size: 1.5rem;
    }
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 81%;
    height: 76%;
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem 3.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .time {
      padding: 1rem;
      width: 100%;
      font-size: 1.5rem;
      background: rgba(47, 30, 18, 0.95);
      border: 1px solid #94642c;
      box-sizing: border-box;
      border-radius: 4px;
      .clock {
        display: flex;
        align-items: center;
        font-size: 2rem;
        justify-content: center;
        margin-top: 1rem;
        img {
          width: 3rem;
          margin-right: 1rem;
        }
      }
    }
    .intro {
      font-size: 1.5rem;
      line-height: 1.5;
      text-align: center;
    }
    .info {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        height: 5rem;
      }
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .red {
          font-size: 4rem;
          color: #bb4a31;
          margin-bottom: 1.5rem;
        }
        .green {
          font-size: 4rem;
          color: #199b6c;
          height: 5rem;
          margin-bottom: 1.5rem;
        }
      }
    }
    .action {
      width: 100%;
      display: flex;
      justify-content: center;
      .disable {
        pointer-events: none;
        filter: grayscale(100);
      }
      .btn {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        margin: 0 1rem;
        position: relative;
        width: 45%;
        img {
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
  }
}
.img_intro {
  width: 25rem;
  position: relative;
  img {
    width: 100%;
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      .dot {
        width: 1.5rem;
        height: 1.5rem;
        background: #cc1010;
        border-radius: 99px;
        margin-right: 1rem;
      }
      .place {
        font-size: 1.5rem;
        color: #170202;
      }
    }
    .text_intro {
      font-size: 1.5rem;
      color: #500000;
    }
  }
}
.badge {
  position: fixed;
  top: 5%;
  right: 5%;
  background: rgba(47, 30, 18, 0.95);
  border: 1px solid rgba(148, 100, 44, 1);
  text-align: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  font-size: 1.2rem;
  .num {
    margin-bottom: 1rem;
    .text {
      color: #bb8431;
      font-size: 2rem;
    }
  }
  .power {
    font-size: 1.5rem;
    .text {
      color: rgba(25, 155, 108, 1);
      font-size: 2rem;
    }
  }
}
</style>