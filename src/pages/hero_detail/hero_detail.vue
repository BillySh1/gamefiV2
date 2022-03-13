<template>
  <div class="hero_detail_box">
    <CommonPageHeader :title="pageTitle" />
    <InjectGoBack
      :custom="true"
      @back="
        () => {
          $router.go(-1);
        }
      "
    />
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
              <div class="powers">战力: {{ Number(info.power) / 100 }}</div>
              <div class="infos">
                <span
                  >稀有度:
                  <span :style="`color:${getRarityStyle}; display:inline`">
                    {{ rarityText }}</span
                  >
                </span>
                <span
                  >品质:
                  <span :style="`color:${getQualityStyle}; display:inline`">{{
                    qualityText
                  }}</span>
                </span>
                <span>阵营: {{ campText }}</span>
                <span>职业: {{ preferenceText }}</span>
                <span>等级: {{ info.level }} 级</span>
                <span>星级: {{ info.star }} 星</span>
              </div>
              <div class="intros">
                {{ info.intro }}
              </div>
              <div class="chain_info">
                <span>Token ID: {{ info.tokenId }}</span>
                <div class="view_on_chain" @click="viewOnChain">
                  View on bscscan
                </div>
              </div>
            </div>
            <div v-if="curTabKey == 1" class="quick_info">
              <div class="up">
                潜力
                <div class="stars">
                  <div v-for="(item, index) in all_stars" :key="index">
                    <img
                      :class="item.active ? '' : 'disable'"
                      style="width: 2rem"
                      src="../../assets/cardImgs/hero/bg/star.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="intros">
                {{ info.intro }}
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
                  <img
                    :src="require(`../../assets/pack/p_${index}.png`)"
                    alt=""
                  />
                  <div class="title">{{ item.title }}</div>
                  <div class="value" style="color: #ffffff">
                    {{ item.value }}
                  </div>
                </div>
              </div>
              <img class="divider" src="../../assets/pack/divider.png" alt="" />
              <div class="attr_map">
                <DetailRadar :data="info.properties" :pre="info.preference" />
              </div>
            </div>
          </div>
        </div>
      </dir>
      <div class="action_box">
        <div
          class="action_item"
          @click="
            $router.push({
              name: 'sell',
              query: {
                tokenId: info.tokenId,
              },
            })
          "
        >
          <img src="../../assets/pack/yellow.png" alt="" />
          <div class="text">出售</div>
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
import InjectGoBack from "../../components/inject_go_back.vue";
import DetailRadar from "./detail_radar.vue";
import {
  useQualityText,
  usePreferenceText,
  useCampText,
  usePropertyName,
  useRarityName,
} from "../../utils/useHeroInfo";
export default {
  name: "hero_detail",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    HeroCardItem,
    InjectGoBack,
    DetailRadar,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const rarityText = computed(() => {
      return useRarityName(data.info.rarity);
    });
    const qualityText = computed(() => {
      return useQualityText(data.info.quality);
    });
    const campText = computed(() => {
      return useCampText(data.info.camp);
    });
    const preferenceText = computed(() => {
      return usePreferenceText(data.info.preference);
    });
    const getRarityStyle = computed(() => {
      return ["white", "#4F7DFF", "#7622D4", "#BA5F0F", "#FFDF3C"][
        data.info.rarity
      ];
    });
    const getQualityStyle = computed(() => {
      return ["white", "#4F7DFF", "#7622D4", "#BA5F0F"][data.info.quality];
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
    const all_stars = computed(() => {
      const temp = [1, 3, 4, 5, 10][data.info.rarity];
      const res = [];
      for (let i = 0; i < temp; i++) {
        res.push({
          active: i < data.info.star ? true : false,
        });
      }
      return res;
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
    const viewOnChain = () => {
      const c = store.state.c_hero.options.address;
      const url = `https://testnet.bscscan.com/token/${c}?a=${data.info.tokenId}`;
      window.open(url, "_blank");
    };
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
      rarityText,
      viewOnChain,
      getRarityStyle,
      getQualityStyle,
      all_stars,
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
          width: 90%;
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
            .up {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
              place-self: flex-start;
              .stars {
                max-height: 8rem;
                display: flex;
                align-items: center;
                .disable {
                  filter: grayscale(100);
                }
                img {
                  width: 2rem;
                  margin-right: 1rem;
                }
              }
            }
            .powers {
              place-self: baseline;
              text-align: left;
              font-size: 2rem;
            }
            .infos {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              span {
                text-align: left;
                display: block;
                width: 33%;
              }
            }
            .intros {
              width: 100%;
              max-height: 6rem;
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
                &:hover {
                  opacity: 0.8;
                }
                cursor: pointer;
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
              min-width: 35%;
              height: 90%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              .detail_item {
                padding: 0.5rem 1rem;
                border-radius: 0 1rem 0 0;
                background: #4e2e1c;
                img {
                  width: 1.5rem;
                  margin-right: 1rem;
                }
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            }
            .divider {
              height: 90%;
              margin-left: 3rem;
              margin-right: 1rem;
            }
            .attr_map {
              width: 20rem;
              height: 20rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
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
        max-width: 15rem;
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