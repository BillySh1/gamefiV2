<template>
  <div class="hero_detail_box">
    <CommonPageHeader :title="pageTitle" />
    <Lottie v-if="loading" :options="lottie_options" />
    <div v-else class="inner">
      <div class="hero_card_big">
        <HeroCardItem :info="info" />
      </div>
      <dir class="info_box">
        <img class="bg" src="../../assets/pack/detial_bg.png" alt="" />
        <div class="inner">
          <div class="up_box">
            <div
              v-for="item in tabs"
              :key="item.key"
              :class="
                curTabKey == item.key ? 'tab_item active_tab' : 'tab_item'
              "
              @click="curTabKey = item.key"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="bottom_box">
            <div v-if="curTabKey == 0" class="quick_info">
              <div class="infos">
                <span>职业: {{ preferenceText }}</span>
                <span>阵营: {{ campText }}</span>
                <span>品质: {{ qualityText }}</span>
              </div>
              <div class="intros">
                这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍
              </div>
              <div class="chain_info">
                <span>Token ID: {{ info.tokenId }}</span>
                <a class="view_on_chain" href="javascript:void(0)">
                  View on bscscan
                </a>
              </div>
            </div>
            <div v-if="curTabKey == 1" class="quick_info">
              <div class="intros">
                这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍这里是英雄介绍
              </div>
              <div class="chain_info">
                <div
                  class="ability_item"
                  v-for="(item, index) in abilities"
                  :key="index"
                >
                  <img src="../../assets/pack/ab_box.png" />
                  <div class="text">技能</div>
                </div>
              </div>
            </div>
            <div v-if="curTabKey == 2" class="attributes">
              <div class="attributes_detail">
                <div
                  class="detail_item"
                  v-for="(item, index) in heroAttrDetailMap"
                  :key="index"
                >
                  <div class="title">{{ item.title }}</div>
                  <div class="value" style="color: #ffffff">
                    {{ item.value }}
                  </div>
                </div>
              </div>
              <div class="attr_map">
                <img src="../../assets/pack/radar.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </dir>
      <div class="action_box">
        <div class="action_item">
          <img src="../../assets/pack/yellow.png" alt="" />
          <div class="text">装备</div>
        </div>
        <div
          class="action_item"
          @click="
            () =>
              $router.push({
                name: 'upgrade',
                query: {
                  tokenId: info.tokenId,
                },
              })
          "
        >
          <img src="../../assets/pack/blue.png" alt="" />
          <div class="text">升级</div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
    <img class="bg_badge" src="../../assets/pack/bg_badge.svg" />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import { useRoute } from "vue-router";
import initWeb3 from "../../utils/initWeb3.js";
import useHeroDetail from "../../utils/useHeroDetail.js";
import HeroCardItem from "../../components/hero_card_item";
import {
  useQualityText,
  usePreferenceText,
  useCampText,
  usePropertyName,
} from "../../utils/useHeroInfo";
export default {
  name: "hero_detail",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    HeroCardItem,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const qualityText = computed(() => {
      return useQualityText(data.info.quality);
    });
    const campText = computed(() => {
      return useCampText(data.info.camp);
    });
    const preferenceText = computed(() => {
      return usePreferenceText(data.info.preference);
    });

    const heroAttrDetailMap = computed(() => {
      return data.info.properties.reduce((pre, cur, curIdx) => {
        pre.push({
          title: usePropertyName(curIdx),
          value: cur / 100,
        });
        return pre;
      }, []);
    });
    const data = reactive({
      tokenId: 0,
      info: "",
      pageTitle: "卡牌详情",
      loading: false,
      lottie_options: {
        animationData: require("../../assets/common/loading.json"),
      },
      tabs: [
        {
          key: 0,
          name: "简介",
        },
        {
          key: 1,
          name: "攻略",
        },
        {
          key: 2,
          name: "属性",
        },
      ],
      curTabKey: 0,
      abilities: [1, 2, 3, 4],
    });
    onBeforeMount(async () => {
      data.tokenId = route.query.tokenId || 0;
      data.loading = true;
      await initWeb3.Init(
        (addr) => {
          data.account = addr;
        },
        (p) => {
          data.web3 = p;
        }
      );
      await getTokenInfo();
      data.loading = false;
    });
    const getTokenInfo = async () => {
      const c = store.state.c_hero;
      const res = await c.methods.getHero(data.tokenId).call();
      const uid =
        res.camp.toString() + res.rarity.toString() + res.heroId.toString();
      data.info = { ...res, ...useHeroDetail(uid, res.preference), uid: uid };
    };
    const refData = toRefs(data);
    return {
      ...refData,
      qualityText,
      campText,
      preferenceText,
      heroAttrDetailMap,
    };
  },
};
</script>
<style lang='less' scoped>
.hero_detail_box {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/hero_detail/hero_detail_bg.png");
  background-size: cover;
  .bg_badge {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 2;
    opacity: 0.8;
  }
  .inner {
    position: absolute;
    width: 85rem;
    height: 35rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .hero_card_big {
      width: 25%;
      height: 100%;
    }
    .info_box {
      position: relative;
      height: 85%;
      width: auto;
      .bg {
        width: auto;
        height: 100%;
      }
      .inner {
        width: 82%;
        height: 85%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-47%, -46%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .up_box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 15%;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          .tab_item {
            cursor: pointer;
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
            border-radius: 10px;
            padding: 0.5rem 0;
            margin: 0.2rem 0;
          }
          .active_tab {
            background: url("../../assets/pack/active_tab.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .bottom_box {
          height: 80%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .quick_info {
            width: 85%;
            height: 100%;
            font-size: 1.5rem;
            line-height: 1.5;
            color: #ffffff;
            opacity: 0.8;
            text-shadow: 0px 3.3637px 3.3637px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;

            .infos {
              width: 100%;
              display: flex;
              justify-content: space-between;
            }
            .intros {
              width: 100%;
              max-height: 10rem;
              overflow-y: auto;
              text-align: left;
            }
            .chain_info {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 1.2rem;
              color: rgba(255, 255, 255, 0.5);
              .view_on_chain {
                font-size: 1.2rem;
                color: #f2dbb9;
              }
              .ability_item {
                cursor: pointer;
                position: relative;
                height: 6rem;
                img {
                  height: 100%;
                }
                .text {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 1.5rem;
                  color: white;
                }
              }
            }
          }
          .attributes {
            width: 85%;
            height: 100%;
            font-size: 1.2rem;
            line-height: 1.5;
            opacity: 0.8;
            text-shadow: 0px 3.3637px 3.3637px rgba(0, 0, 0, 0.25);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .attributes_detail {
              width: 20%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              .detail_item {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            }
            .attr_map {
              width: 60%;
              height: 80%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
    .action_box {
      width: auto;
      height: 85%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .action_item {
        position: relative;
        cursor: pointer;
        width: 80%;
        img {
          width: 100%;
        }
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }
      }
    }
  }
}
</style>