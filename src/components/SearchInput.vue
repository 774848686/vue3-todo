<template>
  <div class="inputer">
    <input
      type="text"
      placeholder="搜索"
      @input="inputChange"
      v-model="todoContent"
    />
  </div>
</template>

<script>
import Subscribe from "../utils/Subscribe";
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      todoContent: ""
    });
    const inputChange = (e)=>{
      Subscribe.$emit('inputChange',e.target.value)
    }
    return {
      ...toRefs(state),
      inputChange
    };
  }
};
</script>

<style lang="scss" scoped>
.inputer {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: none;
    padding: 0 15px;
    padding-left: 35px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
input:focus {
  outline: none;
  border-color: #409eff;
}
.inputer:after {
  position: absolute;
  left: 10px;
  top: 4px;
  content: "";
  width: 20px;
  height: 20px;
  background: url(../assets/sousuo.png) no-repeat;
  background-size: 100% 100%;
}
</style>