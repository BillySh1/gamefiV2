<template>
  <div class="back_c">
    <img style="width: 2rem" src="../../assets/stake/back_d.png" alt="" />
    <div style="margin: 0 1.5rem">{{ t("stake_back") }}</div>
    <img style="width: 6rem" src="../../assets/stake/cloud.png" alt="" />
  </div>
</template>

<script lang='js'>
import { reactive,toRefs} from 'vue'
import { useI18n } from 'vue-i18n';
export default {
    name: 'bch',

      setup() {
        
          const data = reactive({

          })
          const {t} = useI18n()
        
          const refData = toRefs(data);
          return {
              ...refData,
              t
          }

      }
  };
</script>
<style lang='less' scoped>
.back_c {
  cursor: pointer;
  position: fixed;
  bottom: 5%;
  left: 5%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: white;
}
</style>