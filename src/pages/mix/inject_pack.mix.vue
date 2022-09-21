<template>
  <div v-if="value" class="detail_container">
    <img class="bg" src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/pack_container.svg" alt="" />

    <div class="inner">
      <div class="inner_box">
        <div class="detail_back" @click="$emit('back')">
          <img src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/pack_back.svg" alt="" />
        </div>
        <div class="tab_box">
          <div
            v-for="item in tabs"
            :key="item.key"
            :class="'tab_item' + ` item${item.key} `"
          >
            <img
              class="active"
              src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/active_tab_item.png"
              alt=""
            />
            <div class="text active_text">
              {{ item.name }}
            </div>
          </div>
        </div>

        <div class="content_box">
          <div class="inner">
            <div v-if="!curPackData.length" class="emptyShow">暂无物品</div>
            <div
              v-for="(item, index) in curPackData"
              :key="index"
              class="pack_item"
              @click="
                () => {
                  curItemIndex = index;
                  curItemShow = curPackData[curItemIndex];
                }
              "
              :style="curItemIndex == index ? 'opacity:1' : ''"
            >
              <img src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/common_pack_item_bg.svg" alt="" />
              <div class="inner_item_zone">
                <CommonPackItem :info="item" />
              </div>
            </div>
            <div class="empty"></div>
          </div>
        </div>
        <div class="detail_box">
          <div class="inner">
            <div class="up">
              <div class="left">
                <img src="https://www.rich3kingdoms.xyz/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/pack/detail_stock_box.png" alt="" />
                <img
                  v-if="curItemShow && curItemShow.img"
                  class="content"
                  :src="curItemShow.img"
                  alt=""
                />
              </div>
              <div class="right" v-if="curItemShow">
                {{ curItemShow.name }}
              </div>
            </div>
            <div class="bottom" v-if="curItemShow">
              {{ curItemShow.intro }} <br /><br />
              需要消耗{{ curItemShow.name }}数量: {{ costNum }}
              <div class="flex">
                <CommonButton
                  :disabled="Number(curItemShow.num) < costNum"
                  class="btn"
                  @click="
                    $emit('select', {
                      ...curItemShow,
                      cost: costNum,
                    })
                  "
                >
                  确认添加
                </CommonButton>
                <CommonButton
                  class="btn"
                  @click="
                    $router.push({
                      name: 'storeDetail',
                      query: {
                        info: curItemShow.tokenId,
                      },
                    })
                  "
                >
                  前往商店
                </CommonButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, watch, computed } from "vue";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3.js";
import { useGetShopDetailByTokenId } from "../store/use_shop_items.js";
import CommonPackItem from "../pack/common_pack_item";
import CommonButton from "../../components/common_button.vue";
export default {
  name: "common_pack_detail",
  props: ["value", "type", "rarity", "quality"],
  components: {
    CommonPackItem,
    CommonButton,
  },
  setup(prop) {
    const store = useStore();
    const data = reactive({
      tabs: [{ key: 0, name: "宝石" }],
      curPackData: [],
      curItemIndex: 0,
      loading: false,
      account: "",
      web3: "",
      curItemShow: {},
    });
    watch(
      () => prop.type,
      async (v) => {
        data.curPackData = [];
        await getGoodsPack();
        if (v == 0) {
          data.curPackData = getCurpackByQuality();
          data.curItemIndex = 0;
          data.curItemShow = data.curPackData[0];
        } else if (v == 1) {
          data.curPackData = data.curPackData.slice(3, 4);
          data.curItemIndex = 0;
          data.curItemShow = data.curPackData[0];
        }
      }
    );
    const costNum = computed(() => {
      return [1, 2, 4, 8][prop.rarity];
    });
    const getCurpackByQuality = () => {
      const _q = prop.quality;
      let sliceIdx = [0, 4];
      if (_q.includes(0)) {
        sliceIdx = [0, 3];
      } else if (_q.includes(1)) {
        sliceIdx = [1, 3];
      } else {
        sliceIdx = [2, 3];
      }
      return data.curPackData.slice(sliceIdx[0], sliceIdx[1]);
    };
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
      await getGoodsPack();
      data.loading = false;
    });
    const getGoodsPack = async () => {
      const c = store.state.c_richShop;
      const res = await c.methods.ownList(data.account).call();
      data.curPackData = res.reduce((pre, x, idx) => {
        if ([4, 5, 6, 9].includes(idx)) {
          pre.push({
            ...useGetShopDetailByTokenId(idx),
            num: x,
          });
        }
        return pre;
      }, []);
    };
    const refData = toRefs(data);
    return {
      ...refData,
      costNum,
    };
  },
};
</script>
<style lang="less" scoped>
.detail_container {
  @media screen and(max-height: 414px) {
    transform: scale(0.9);
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 40;
  .bg {
    width: 100%;
    height: 100%;
  }
  .inner {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    text-align: center;

    .inner_box {
      position: relative;
      width: 100%;
      height: 100%;
      .detail_back {
        cursor: pointer;
        width: 6rem;
        height: 6rem;
        position: absolute;
        top: 50%;
        transform: translateY(-350%);
        left: 5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tab_box {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 50%;
        transform: translateY(-60%);
        left: 4rem;
        width: 10rem;
        .tab_item {
          position: relative;
          width: 12rem;
          cursor: pointer;
          img {
            width: 100%;
          }
          .text {
            position: absolute;
            top: 50%;
            right: 20%;
            transform: translateY(-50%);
            font-weight: 600;
            font-size: 1.2rem;
            color: #272727;
          }
          .active {
            transform: scale(1.1);
            font-size: 1.5rem;
          }
          .active_text {
            color: white;
          }
        }
      }
      .content_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-90%, -55%);
        width: 40rem;
        height: 25rem;
        overflow-y: auto;
        overflow-x: hidden;
        .inner {
          position: relative;
          width: 100%;
          height: 100%;
          padding-left: 2rem;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          .emptyShow {
            position: absolute;
            left: 50%;
            top: 50%;

            font-size: 1.2rem;
            transform: translate(-60%, -50%);
          }
          .pack_item {
            position: relative;
            border-radius: 1rem;
            opacity: 0.7;
            &:hover {
              opacity: 1;
            }
            .inner_item_zone {
              width: 70%;
              height: 70%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            cursor: pointer;
            width: 9rem;
            height: 9rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .empty {
            height: 0;
            width: 0;
          }
        }
      }
      .detail_box {
        position: absolute;
        width: 25rem;
        height: 30rem;
        top: 50%;
        left: 50%;
        transform: translate(38%, -55%);
        .inner {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          .up {
            width: 100%;
            height: 50%;
            display: flex;
            align-items: center;
            .left {
              position: relative;
              width: 45%;
              img {
                width: 100%;
              }
              .content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 70%;
              }
            }
            .right {
              width: 50%;
              font-size: 3rem;
            }
          }
          .bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 1.5rem;
            width: 100%;
            height: 50%;

            .flex {
              margin-top: 2rem;

              display: flex;
              align-items: center;
              .btn {
                margin-right: 2rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
