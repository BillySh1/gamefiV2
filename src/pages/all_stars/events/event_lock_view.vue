<template>
  <div class="event_mask">
    <div class="content">
      <img
        @click="() => $emit('close')"
        class="close"
        src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/allstar_assets/popups/close.svg"
        alt=""
      />
      <img
        class="c_bg"
        src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/allstar_assets/popups/scroll_vertical.png"
        alt=""
      />
      <div class="top">
        <div class="place">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/allstar_assets/popups/place_bg.png"
            alt=""
          />
          <div class="text">{{ placeText }}</div>
        </div>
        <div class="status">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/allstar_assets/popups/alert_icon.png"
            alt=""
          />
          <div>据点锁定</div>
        </div>
      </div>
      <div class="inner">
        <div class="intro">
          当前据点 {{ placeText }} 战事暂歇，战场锁定中, 请先打扫战场, 或等待其他玩家打扫
        </div>
    
        <div class="action">
          <div
            :class="btnDisable ? 'btn disable' : 'btn'"
            @click="()=>$emit('unlock')"
          >
            <img
              src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/allstar_assets/popups/btn_orange.png"
              alt=""
            />
            <div class="text">打扫战场</div>
          </div>
        </div>
      </div>
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
  background: rgba(0, 0, 0, .5);
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
      white-space: nowrap;
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
    justify-content: space-around;
    
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


</style>