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
            <div
              v-for="(item, index) in packItems"
              :key="index"
              class="pack_item"
              @click="() => (curItemIndex = index)"
              :style="curItemIndex == index ? 'opacity:1' : ''"
            >
              <img src="../../assets/pack/common_pack_item_bg.svg" alt="" />
            </div>
            <div class="empty"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,computed} from 'vue'
export default {
    name: 'common_pack_detail',
    props:['value','type'],
      setup(prop) {
          const data = reactive({
            tabs:[{key:1,name:'装备'},{key:2,name:'珍宝'}],
            curTab: 1,
            packItems:[0,1,2,3,4,5,6,7,8,9],
            curItemIndex:0,
          })
          const curItemShow = computed(()=>{
            return data.packItems[data.curItemIndex]
          })
          onBeforeMount(() => {
            data.curTab = prop.type
          })

          const refData = toRefs(data);
          return {
              ...refData,
              curItemShow
          }

      }
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
          align-items: center;
          .pack_item {
            border-radius: 1rem;
            opacity: 0.6;
            &:hover {
              opacity: 1;
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
    }
  }
}
</style>
