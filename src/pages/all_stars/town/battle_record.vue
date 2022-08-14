<template>
  <div v-if="value" class="mask" @click="$emit('close')">
    <div
      class="inner"
      @click="
        (e) => {
          e.stopPropagation();
        }
      "
    >
      <img
        class="close"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/close.svg"
        alt=""
        @click="
          (e) => {
            e.stopPropagation();
            $emit('close');
          }
        "
      />

      <img
        class="bg"
        src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/common/modal_bg.png"
        alt=""
      />
      <div class="title">战斗日志</div>
      <div class="content">
        <div class="table">
          <TableItem
            v-for="item in battleData"
            :key="item.key"
            :tableItem="item"
          />
        </div>
        <div class="pageNation">
          <img
            :class="page <= 1 ? 'disable' : ''"
            @click="
              () => {
                page--;
                getRemoteData();
              }
            "
            src="../../../allstar_assets/popups/left.svg"
            alt=""
          />
          {{ page + "/" + total }}
          <img
            :class="page >= total ? 'disable' : ''"
            @click="
              () => {
                page++;
                getRemoteData();
              }
            "
            src="../../../allstar_assets/popups/right.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const host = "http://54.151.194.138:8999";
import { reactive, toRefs, watch } from "vue";
import postData from "../../../utils/useFetch";
import TableItem from "../../../components/table_item.vue";
export default {
  name: "inject_modal",
  props: ["value", "title", "btnText", "btnDisable", "player"],
  components: {
    TableItem,
  },
  setup(prop) {
    const data = reactive({
      battleData: [],
      total: 0,
      page: 1,
      limit: 5,
    });
    watch(
      () => prop.value,
      async (v) => {
        if (v) {
          getRemoteData();
        }
      }
    );
    const getRemoteData = async () => {
      const url = host + "/conflict/list";
      const res = await postData(url, {
        page: data.page,
        limit_num: 4,
        player: prop.player,
      }).then((res) => res.data);
      data.total = res.paginate.total;
      data.battleData = []
      data.battleData.push([
        "敌方阵营",
        "战斗结束时间",
        "敌军战力削减",
        "状态",
        '粮草掉落'
      ]);
      res.list.map((item, index) => {
        data.battleData.push([
          index + 1,
          item.inviter,
          data.web3.utils.fromWei(item.amount, "ether") + " MDAO",
        ]);
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
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70rem;
  color: white;
  .close {
    position: absolute;
    cursor: pointer;
    top: 0%;
    right: 0%;
    transform: translate(50%, -50%);
    width: 1.5rem;
  }
  .bg {
    width: 100%;
  }
  .title {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-55%);
    font-size: 3rem;
  }

  .content {
    position: absolute;
    width: 100%;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .table {
      width: 70%;
      min-height: 15rem;
      margin: auto;
      margin-bottom: 2rem;
    }
    .pageNation {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 1.5rem;
      margin: auto;
      .disable {
        pointer-events: none;
        filter: grayscale(100);
      }
      img {
        cursor: pointer;
        user-select: none;
        &:hover {
          opacity: 0.8;
        }
        height: 4rem;
      }
    }
  }
}
</style>
