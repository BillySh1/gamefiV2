<template>
  <div class="index_container">
    <CommonPageHeader @exit="disconnect" />

    <div class="content">
      <InjectUser :power="power" />
      <div class="float_right_box">
        <div class="flex">
          <div class="float_item" @click="jump('airdrop')">
            <InjectIcon
              :src="'https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/index/airdrop.png'"
              :text="t('airdrop')"
            />
          </div>
          <!-- <div class="float_item">
            <div class="float_item" @click="jump('invite')">
              <InjectIcon
                :src="'https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/index/invite.png'"
                :text="t('invite')"
              />
            </div>
          </div> -->
        </div>
        <!-- <div class="flex">
          <div class="float_item" @click="jump('obtain')">
            <InjectIcon
              :src="require('../../assets/index/lingqu.png')"
              :text="t('obtain')"
            />
          </div>
        </div> -->
      </div>
      <div class="float_left_box">
        <div class="leader_board_box" @click="jump('leader')">
          <img
            src="https://cryptorich3.mypinata.cloud/ipfs/QmTLaiRRXJ1BaDbxb92T3cfyN9xMMyD1GuWaxHXGQSFhQg/rich/assets/index/Leader_board.svg"
            alt=""
          />
          <div class="leader_board_text">{{ t("board") }}</div>
        </div>
      </div>

      <div class="float_action_buttons">
        <div class="actions_inner_zh">
          <img
            @click="jump('stk_entry')"
            class="left"
            :src="require(`../../assets/Lang/left_${curLang}.png`)"
          />
          <img
            class="middle"
            :src="require(`../../assets/Lang/middle_${curLang}.png`)"
            alt=""
          />
          <img
            class="right"
            :src="require(`../../assets/Lang/right_${curLang}.png`)"
            alt=""
          />
          {{ locale }}
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script >
import { computed, onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CommonPageHeader from "../../components/common_page_header";
import CommonPageFooter from "../../components/common_page_footer";
import InjectUser from "../../components/inject_user";
import InjectIcon from "../../components/inject_icon";
import initWeb3 from "../../utils/initWeb3";
import { useI18n } from "vue-i18n";
export default {
  name: "home",
  components: {
    CommonPageHeader,
    CommonPageFooter,
    InjectUser,
    InjectIcon,
  },
  setup(prop, { emit }) {
    const { t, locale } = useI18n();
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      account: "",
      web3: "",
      power: 0,
    });
    const curLang = computed(() => {
      return locale.value || "en";
    });
    const exit = () => {
      emit("exit");
    };
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
    const disconnect = () => {
      window.dispatchEvent(new Event("disconnet_wlt"));
    };
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
      t,
      ...refData,
      curLang,
      disconnect,
      jump,
      exit,
    };
  },
};
</script>
<style lang="less" scoped>
@import url("./bg.css");
.index_container {
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
  right: 2rem;
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
      writing-mode: vertical-lr;
    }
  }
}
.float_action_buttons {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 15%;
  .actions_inner_zh {
    display: flex;
    margin-top: 2rem;
    user-select: none;
    pointer-events: none;
    filter: grayscale(1);
    .left {
      &:hover {
        opacity: 0.6;
      }
      cursor: pointer;
      position: relative;
      transform: translateX(2rem);
      white-space: nowrap;
      width: 16rem;
      height: auto;
    }
    .middle {
      user-select: none;
      pointer-events: none;
      filter: grayscale(1);
      &:hover {
        opacity: 0.6;
      }
      cursor: pointer;
      position: relative;
      transform: translateY(-2.5rem);
      width: 22rem;
      height: auto;
    }
    .right {
      user-select: none;
      pointer-events: none;
      cursor: pointer;
      position: relative;
      transform: translateX(-1.4rem);
      width: 18rem;
      height: auto;
    }
  }
}
</style>
