<template>
  <div class="todo-list">
    <div class="title">
      <p>{{currentTag.title}}</p>
      <p>{{currentTag.count}}</p>
    </div>
    <div class="task-finish">
      <p>1项已经完成</p>
      <div class="toggle-btn">显示</div>
    </div>
    <div class="list">
      <div class="list-item">
        <input type="checkbox" />
        <p>今天要做的事情就是把TODO的原型开发出来</p>
      </div>
      <div class="list-item">
        <input type="checkbox" />
        <p>今天要做的事情就是把TODO的原型开发出来</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs,watch } from "vue";
export default {
  props: {
    currentTag: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const state = reactive({
    });
     watch(
      () => props.currentTag,
      cur => {
        console.log("todo", cur);
      }
    );
    return {
      ...toRefs(state)
    }
  }
};
</script>

<style lang='scss' scoped>
.todo-list {
  .title {
    font-size: 24px;
    color: #2f7cf6;
    display: flex;
    font-weight: bold;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .task-finish {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    p {
      font-size: 14px;
    }
    .toggle-btn {
      font-size: 14px;
      color: #2f7cf6;
    }
  }
  .list-item {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    font-size: 14px;
    input[type="checkbox"] {
      margin-right: 15px;
      width: 16px;
      height: 16px;
    }
    p {
      position: relative;
      width: 100%;
    }
    p:after {
      position: absolute;
      bottom: -10px;
      left: 0;
      content: "";
      height: 1px;
      width: 100%;
      background: #e6e6e6;
    }
  }
}
</style>