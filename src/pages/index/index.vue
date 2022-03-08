<template>
  <div class="container">
    <CommonPageHeader />
 
    <div  class="content">
      <InjectUser :power="power" />
      <div class="float_right_box">
        <div class="flex">
          <div class="float_item" @click="jump('invite')">
            <InjectIcon
              :src="require('../../assets/index/invite.png')"
              text="邀请"
            />
          </div>
          <div class="float_item" @click="jump('airdrop')">
            <InjectIcon
              :src="require('../../assets/index/airdrop.png')"
              text="空投"
            />
          </div>
        </div>

        <div class="float_item" @click="jump('title')">
          <InjectIcon
            :src="require('../../assets/index/title.png')"
            text="称号"
          />
        </div>
      </div>
      <div class="float_left_box">
        <div class="leader_board_box" @click="jump('leader')">
          <img src="../../assets/index/Leader_board.svg" alt="" />
          <div class="leader_board_text">排行榜</div>
        </div>
      </div>

      <div class="float_action_buttons">
        <img class="up" src="../../assets/index/ac_bottom.png" alt="" />
        <div class="actions_inner">
          <div class="left" @click="jump('allStarsEntry')">
            <img src="../../assets/index/ac_left.png" alt="" />
            <div class="text">群英会战</div>
          </div>
          <div class="middle">
            <img src="../../assets/index/ac_middle.png" alt="" />
            <div class="text">排位赛</div>
          </div>
          <div class="right">
            <img src="../../assets/index/ac_right.png" alt="" />
            <div class="text">攻城略地</div>
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
        pre += Number(cur.power) / 100;
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
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/index/home_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
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
      text-shadow: 1px 1px 4px #000
    }
  }
}
.float_action_buttons {
  position: absolute;
  left: 50%;
  transform: translateX(-70%);
  bottom: 12%;
  .up {
    width: 30rem;
  }
  .actions_inner {
    display: flex;
    margin-top: 2rem;
    font-family: zihun143;
    font-weight: bold;
    font-size: 1.8rem;
    text-align: center;

    .left {
      cursor: pointer;
      position: relative;
      transform: translateX(1.4rem);
      white-space: nowrap;
      img {
        width: 16rem;
      }
    }
    .middle {
      cursor: pointer;
      position: relative;
      transform: translateY(-1rem);
      font-size: 2.3rem;
      letter-spacing: 1.5rem;
      img {
        width: 18rem;
      }
      .text {
        width: 100%;
        transform: translate(-47%, -83%);
      }
    }
    .right {
      cursor: pointer;
      position: relative;
      transform: translateX(-1.4rem);
      letter-spacing: 4px;
      white-space: nowrap;
      img {
        width: 16rem;
      }
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-shadow: 1px 1px 4px #000
    }
  }
}
</style>
