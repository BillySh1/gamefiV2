<template>
  <div class="container">
    <IndexHeader />
    <div class="content">
      <InjectUser />
      <div class="float_right_box">
        <div class="float_right_item">
          <InjectIcon
            :src="require('../../assets/index/invite.svg')"
            text="邀请"
            style="margin-bottom: 2rem"
          />
        </div>
        <div class="float_right_item">
          <InjectIcon
            :src="require('../../assets/index/title.svg')"
            text="称号"
          />
        </div>
      </div>
    </div>
    <CommonPageFooter />
  </div>
</template>

<script lang="js">
import { reactive,toRefs,onBeforeMount,onMounted} from 'vue'
import IndexHeader from '../../components/index_header'
import CommonPageFooter from '../../components/common_page_footer'
import InjectUser from '../../components/inject_user'
import InjectIcon from '../../components/inject_icon'
export default {
    name: 'home',
    components:{
        IndexHeader,
        CommonPageFooter,
        InjectUser,
        InjectIcon
    },
      setup() {
          console.log('1-开始创建组件-setup')
          const data = reactive({

          })
          onBeforeMount(() => {
              console.log('2.组件挂载页面之前执行----onBeforeMount')
          })
          onMounted(() => {
              console.log('3.-组件挂载到页面之后执行-------onMounted')
          })
          const refData = toRefs(data);
          return {
              ...refData,
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
.float_right_box {
  position: absolute;
  right: 1rem;
  top: 12rem;
}
</style>
