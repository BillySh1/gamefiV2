<template>
  <div class="com_box">
    <div class="power_box">
      <img src="../../assets/upgrade/power_bg.png" />
      <div class="inner">
        <div class="text">战力值</div>
        <div class="value">{{ info.power }}</div>
        <div class="pImg">
          <img src="../../assets/pack/power_img.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="cost_box">
      <div class="info">
        需要消耗 <strong class="num">{{ updateInfo.bookUse }}</strong>
        <strong>{{ costName }}</strong> 升级
        <img :src="costImg" alt="" />
      </div>
      <img class="divider" src="../../assets/upgrade/divider.png" />
    </div>
    <div class="property_box">
      <img src="../../assets/upgrade/properties_bg.png" alt="" />
      <img class="badge" src="../../assets/upgrade/proper_badge.png" />
      <div class="inner">
        <div class="item">
          <div class="title">当前属性</div>
          <div
            class="property"
            v-for="(item, index) in curProperty"
            :key="index"
          >
            <div class="name">{{ item.title }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">升级后属性</div>
          <div class="property" v-for="(item, index) in nextInfo" :key="index">
            <div class="name">{{ item.title }}</div>
            <div class="next">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="action_box">
      <div class="item">
        <img src="../../assets/upgrade/action_bg.png" alt="" />
        <div class="inner">升级</div>
      </div>
      <div class="item">
        <div class="inner">一键升级</div>
        <img src="../../assets/upgrade/action_bg_1.png" alt="" />
      </div>
    </div>
   
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from "vue";
import initWeb3 from "../../utils/initWeb3";
import { useStore } from "vuex";
import { usePropertyName } from "../../utils/useHeroInfo";
export default {
  name: "com_upgrade",
  props: ["info", "stockBox"],
  setup(props) {
    const data = reactive({
      updateInfo: "",
      account: "",
      web3: "",
      nextInfo: "",
    });
    const store = useStore();
    const costName = computed(() => {
      return props.stockBox[props.info.quality].name;
    });
    const costImg = computed(() => {
      return props.stockBox[props.info.rarity].img;
    });
    const remainNum = computed(() => {
      return props.stockBox[props.info.rarity].num || 0;
    });
    const curProperty = computed(() => {
      return props.info.properties.reduce((pre, cur, curIdx) => {
        pre.push({
          title: usePropertyName(curIdx),
          value: cur / 100,
        });
        return pre;
      }, []);
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
      await getUpdateInfo();
    });
    const getUpdateInfo = async () => {
      const c = store.state.c_training;
      data.updateInfo = await c.methods
        .getUpgradeDetail(props.info.tokenId)
        .call();
      data.nextInfo = data.updateInfo.properties.reduce((pre, cur, curIdx) => {
        pre.push({
          title: usePropertyName(curIdx),
          value: cur / 100,
        });
        return pre;
      }, []);
      console.log(data.nextInfo, "ggg");
    };
    const refData = toRefs(data);
    return {
      ...refData,
      costName,
      costImg,
      remainNum,
      curProperty,
    };
  },
};
</script>
<style lang='less' scoped>
.com_box {
  width: 100%;
  height: 100%;
  background: url("../../assets/upgrade/over_bg.png") no-repeat;
  background-size: 100% 100%;
 
  .power_box {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .inner {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .text {
        font-size: 1.6rem;
      }
      .value {
        color: white;
        font-size: 2rem;
      }
      .pImg {
        img {
          height: 3rem;
        }
      }
    }
  }
  .cost_box {
    background: linear-gradient(
      180deg,
      rgba(234, 9, 9, 0.3) 0%,
      rgba(40, 2, 2, 0) 100%
    );
    .info {
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.5rem;
      color: white;
      img {
        height: 6rem;
      }
      .num {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 2.5rem;
      }
    }
    .divider {
      width: 100%;
    }
  }
  .property_box {
    position: relative;
    width: 100%;
    img {
      width: 100%;
    }
    .badge {
      position: absolute;
      width: 6rem;
      top: 0;
      left: 0;
      z-index: 20;
      transform: translate(-30%, -30%);
    }
    .inner {
      position: absolute;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        width: 50%;
        text-align: center;
        .title {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        .property {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 1rem;
          .name {
            color: white;
          }
          .next {
            color: red;
          }
        }
      }
    }
  }
  .action_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 1rem;
    .item {
      position: relative;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      height: 4rem;
      img {
        height: 100%;
      }
      .inner {
        position: absolute;
        font-size: 1.5rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>