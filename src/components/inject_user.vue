<template>
  <div class="box">
    <div class="inner">
      <div class="avatar_box">
        <img class="avatar" src="../assets/index/default_avatar.png" alt="" />
      </div>
      <div class="info_box">
        <div class="power_box">
          <img class="power_bg" src="../assets/index/power_bg.svg" alt="" />
          <div class="power_value">战力 1,000000</div>
        </div>
        <div class="title_box">
          <img src="../assets/index/title_bg.svg" alt="" />
          <div class="title_value">一等公爵</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
export default {
  name: "",
  setup() {
    console.log("1-开始创建组件-setup");
    const data = reactive({});
    onBeforeMount(() => {
      console.log("2.组件挂载页面之前执行----onBeforeMount");
    });
    onMounted(() => {
      console.log("3.-组件挂载到页面之后执行-------onMounted");
    });
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
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.power_box {
  position: relative;
  text-align: center;
  z-index: 1;
  width: auto;
  height: 3rem;
  margin-bottom: 0.5rem;
  img {
    height: 100%;
  }
  .power_value {
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.title_box {
  position: relative;
  height: 2.5rem;
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
