<template>
  <div class="container">
    <CommonPageHeader @exit="$emit('exit')" />

    <div class="content">
      <InjectUser :power="power" />
      <div class="float_right_box">
        <div class="flex">
          <div class="float_item" @click="jump('airdrop')">
            <InjectIcon
              :src="require('../../assets/index/airdrop.png')"
              text="空投"
            />
          </div>
          <div class="float_item">
            <!-- <InjectIcon
            :src="require('../../assets/index/title.png')"
            text="称号"
          /> -->
            <div class="float_item" @click="jump('invite')">
              <InjectIcon
                :src="require('../../assets/index/invite.png')"
                text="邀请"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="float_left_box">
        <div class="leader_board_box" @click="jump('leader')">
          <img src="../../assets/index/Leader_board.svg" alt="" />
          <div class="leader_board_text">排行榜</div>
        </div>
      </div>

      <div class="float_action_buttons">
        <!-- <img class="up" src="../../assets/index/ac_bottom.png" alt="" /> -->
        <div class="actions_inner">
          <div class="left">
            <img src="../../assets/index/left.png" alt="" />
          </div>
          <div class="middle" @click="jump('allStarsEntry')">
            <img src="../../assets/index/middle.png" alt="" />
          </div>
          <div class="right">
            <img src="../../assets/index/right.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectUser from "../../components/inject_user";
import InjectIcon from "../../components/inject_icon";
import initWeb3 from "../../utils/initWeb3";
export default {
  name: "home",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectUser,
    InjectIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const data = reactive({
      account: "",
      web3: "",
      power: 0,
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
      await getPower();
    });
    const getPower = async () => {
      const c = store.state.c_hero;
      const list = await c.methods.cardList(data.account).call();
      data.power = list.reduce((pre, cur) => {
        pre += Number((Number(cur.power) / 100).toFixed(0));
        return pre;
      }, 0);
    };

    const refData = toRefs(data);
    const jump = (name) => {
      router.push({
        name: name,
      });
    };
    return {
      ...refData,
      jump,
    };
  },
};
</script>
<style lang="less" scoped>
@import url("./bg.css");
.container {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.float_item {
  cursor: pointer;
  margin-left: 1rem;
}
.float_right_box {
  position: absolute;
  right: 1rem;
  top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .flex {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
}

.float_left_box {
  position: absolute;
  left: 0;
  top: 30%;
  .leader_board_box {
    cursor: pointer;
    position: relative;
    img {
      width: 5rem;
    }
    .leader_board_text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3rem;
      font-size: 2.5rem;
      font-weight: 400;
      letter-spacing: 0.5rem;
      text-shadow: 1px 1px 4px #000;
    }
  }
}
.float_action_buttons {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  .actions_inner {
    display: flex;
    margin-top: 2rem;
    .left {
      user-select: none;
      pointer-events: none;
      cursor: pointer;
      position: relative;
      transform: translateX(2rem);
      white-space: nowrap;
      img {
        width: 16rem;
      }
    }
    .middle {
      &:hover {
        opacity: 0.6;
      }
      cursor: pointer;
      position: relative;
      transform: translateY(-2.5rem);
      img {
        width: 22rem;
      }
    }
    .right {
      user-select: none;
      pointer-events: none;
      cursor: pointer;
      position: relative;
      transform: translateX(-1.4rem);
      img {
        width: 18rem;
      }
    }
  }
}
</style>
