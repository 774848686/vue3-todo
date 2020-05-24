<template>
  <div class="main">
    <todo-list :currentTag="currentTag"></todo-list>
  </div>
</template>

<script>
import TodoList from "../components/TodoList";
import { reactive, toRefs } from "vue";
export default {
  components: {
    TodoList
  },
  props: {
    currentTag: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
.main {
  float: left;
  width: 400px;
  height: 600px;
  padding: 0 20px;
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #ffffff;
}
</style>