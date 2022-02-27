<template>
  <div v-if="value" class="detail_container">
    <img class="bg" src="../../assets/pack/pack_container.svg" alt="" />

    <div class="inner">
      <div class="inner_box">
        <div class="detail_back" @click="$emit('back')">
          <img src="../../assets/pack/pack_back.svg" alt="" />
        </div>
        <div class="tab_box">
          <div
            v-for="item in tabs"
            :key="item.key"
            :class="'tab_item' + ` item${item.key} `"
            @click="() => (curTab = item.key)"
          >
            <img
              class="active"
              v-show="item.key == curTab"
              src="../../assets/pack/active_tab_item.svg"
              alt=""
            />
            <img
              class="in_active"
              v-show="item.key != curTab"
              src="../../assets/pack/common_tab_item.svg"
              alt=""
            />
            <div>
              <div :class="item.key == curTab ? 'text active_text' : 'text'">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="content_box">
          <div class="inner">
            <div v-if="!curPackData.length" class="emptyShow">暂无物品</div>
            <div
              v-for="(item, index) in curPackData"
              v-show="item.num > 0"
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
              <img src="../../assets/pack/common_pack_item_bg.svg" alt="" />
              <div class="inner_item_zone">
                <CommonPackItem :info="item" />
              </div>
            </div>
            <div class="empty"></div>
          </div>
        </div>
        <div class="detail_box">
          <div class="inner">
            {{ curItemShow }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, watch } from "vue";
import { useStore } from "vuex";
import initWeb3 from "../../utils/initWeb3.js";
import { useGetShopDetailByTokenId } from "../store/use_shop_items.js";
import CommonPackItem from "./common_pack_item";
export default {
  name: "common_pack_detail",
  props: ["value", "type"],
  components: {
    CommonPackItem,
  },
  setup(prop) {
    const store = useStore();
    const data = reactive({
      tabs: [
        { key: 1, name: "装备" },
        { key: 2, name: "珍宝" },
      ],
      curTab: 1,
      goodsItems: [],
      equpmentItems: [],
      curPackData: [],
      curItemIndex: 0,
      loading: false,
      account: "",
      web3: "",
      curItemShow: "",
    });
    watch(
      () => data.curTab,
      (v) => {
        if (v == 1) {
          data.curPackData = data.equpmentItems;
        } else if (v == 2) {
          data.curPackData = data.goodsItems;
        }
        data.curItemShow = data.curPackData[data.curItemIndex];
      },
      {
        immediate: true,
      }
    );

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
      data.curTab = prop.type;
      data.loading = false;
    });
    const getGoodsPack = async () => {
      const c = store.state.c_richShop;
      const res = await c.methods.ownList(data.account).call();
      data.goodsItems = res.map((x, idx) => {
        return {
          ...useGetShopDetailByTokenId(idx),
          num: x,
        };
      });
    };
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.detail_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;

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
            height: 100%;
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
          .up {
          }
        }
      }
    }
  }
}
</style>
