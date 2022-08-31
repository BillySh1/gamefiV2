<template>
  <div class="box">
    <div class="inner">
      <div class="avatar_box">
        <img
          class="avatar"
          src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/index/default_avatar.png"
          alt=""
        />
      </div>
      <div class="info_box">
        <div class="power_box">
          <img
            class="power_bg"
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/index/power_bg.png"
            alt=""
          />
          <div class="power_value">{{ $t("power") }} {{ power }}</div>
        </div>
        <div
          class="title_box"
          @click="
            () =>
              $router.push({
                name: 'title',
              })
          "
        >
          <img
            src="http://118.195.233.125:8080/ipns/k51qzi5uqu5dgrl028jw0vu9g92no96w74irny1skee8oaok5jezrpkq4idajv/rich/assets/index/title_bg.png"
            alt=""
          />
          <div class="title_value">{{ $t("emptyTitle") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
export default {
  name: "inject_user",
  props: ["power"],
  setup() {
    const data = reactive({});
    const refData = toRefs(data);
    return {
      ...refData,
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  position: absolute;
  left: 1rem;
  top: 5rem;
}
.inner {
  display: flex;
  align-items: center;
}
.avatar_box {
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  border: solid 1.5px transparent;
  background-image: linear-gradient(#fee, #fee),
    linear-gradient(180deg, #f2c671 0%, #faecd8 60.91%, #f2b1a0 140.91%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-right: 1.5rem;
  .avatar {
    width: 100%;
    height: 100%;
  }
}
.info_box {
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.power_box {
  position: relative;
  text-align: center;
  z-index: 1;
  width: auto;
  height: 55%;
  img {
    height: 100%;
  }
  .power_value {
    font-size: 1rem;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.title_box {
  cursor: pointer;
  position: relative;
  height: 30%;
  img {
    height: 100%;
  }
  .title_value {
    white-space: nowrap;
    position: absolute;
    font-size: 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
