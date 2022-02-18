<template>
  <div class="container">
    <CommonPageHeader />
    <div class="content">
      <InjectUser />
      <div class="float_right_box">
        <div class="float_item" @click="jump('invite')">
          <InjectIcon
            :src="require('../../assets/index/invite.svg')"
            text="邀请"
            style="margin-bottom: 2rem"
          />
        </div>
        <div class="float_item" @click="jump('title')" >
          <InjectIcon
            :src="require('../../assets/index/title.svg')"
            text="称号"
          />
        </div>
      </div>
      <div class="float_left_box">
        <div class="float_item" @click="jump('airdrop')" >
          <InjectIcon
            style="margin-left: 1rem"
            :src="require('../../assets/index/airdrop.svg')"
            text="空投"
          />
        </div>
        <div class="leader_board_box" @click="jump('leader')" >
          <img src="../../assets/index/Leader_board.svg" alt="" />
          <div class="leader_board_text">排行榜</div>
        </div>
      </div>

      <div class="float_action_buttons">
        <img class="up" src="../../assets/index/ac_bottom.svg" alt="" />
        <div class="actions_inner">
          <div class="left">
            <img src="../../assets/index/ac_left.svg" alt="" />
            <div class="text">群英会战</div>
          </div>
          <div class="middle">
            <img src="../../assets/index/ac_middle.svg" alt="" />
            <div class="text">排位赛</div>
          </div>
          <div class="right">
            <img src="../../assets/index/ac_right.svg" alt="" />
            <div class="text">攻城略地</div>
          </div>
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import CommonPageHeader from '../../components/common_page_header'
import CommonPageFooter from '../../components/common_page_footer'
import InjectUser from '../../components/inject_user'
import InjectIcon from '../../components/inject_icon'
export default {
    name: 'home',
    components:{
        CommonPageHeader,
        CommonPageFooter,
        InjectUser,
        InjectIcon
    },
      setup() {
        const router = useRouter()
          const data = reactive({

          })
          onBeforeMount(() => {
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const refData = toRefs(data);
          const jump = (name)=>{
            router.push({
              name:name
            })
          }
          return {
              ...refData,
              jump
          }

      }
  };
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/index/home_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.float_item{
  cursor: pointer;
}
.float_right_box {
  position: absolute;
  right: 0.5rem;
  top: 6rem;
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
      -webkit-text-stroke: 0.5px #231008;
    }
  }
}
.float_action_buttons {
  position: absolute;
  left: 50%;
  transform: translateX(-65%);
  bottom: 10%;
  .up {
    width: 40rem;
  }
  .actions_inner {
    display: flex;
    margin-top: 2rem;
    font-family: zihun143-zhengkuchaojihei;
    font-size: 2rem;
    text-align: center;

    .left {
      position: relative;
      transform: translateX(2.5rem);
      img {
        width: 20rem;
      }
    }
    .middle {
      position: relative;
      transform: translateY(-2rem);
      font-size: 2.5rem;
      letter-spacing: 2rem;
      img {
        width: 25rem;
      }
      .text {
        transform: translate(-50%, -75%);
      }
    }
    .right {
      position: relative;
      transform: translateX(-2.5rem);
      img {
        width: 20rem;
      }
    }
    .text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      letter-spacing: 0.5rem;
      -webkit-text-stroke: 0.5px #231008;
    }
  }
}
</style>
