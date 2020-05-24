<template>
  <div class="layout">
    <Slide/>
    <Main/>
  </div>
</template>

<script>
import Slide from "./Slide";
import Main from "./Main";
import {reactive,toRefs} from 'vue';
export default {
  components: {
    Slide,
    Main
  },
  setup(){
    const state = reactive({
    });
    return {
      ...toRefs(state),
    }
  }
};
</script>

<style lang='scss' scoped>
    .layout{
        width: 700px;
        border:1px solid #e2e2e3;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 8px;
        overflow: hidden;
        margin:0 auto;
        margin-top:100px;
    }
</style>