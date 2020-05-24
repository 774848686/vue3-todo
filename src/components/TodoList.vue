<template>
  <div class="todo-list">
    <div class="add-todo" @click="addTodo">
      <img src="../assets/jia.png" alt />
    </div>
    <div class="title">
      <p>{{currentTag.title}}</p>
      <p>{{todoCount}}</p>
    </div>
    <div class="task-finish" v-if="doneList.length">
      <p>1项已经完成</p>
      <div class="toggle-btn">显示</div>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in todoList" :key="item.id">
        <input type="checkbox" v-model="item.check" @change="deleTodo(item.id)" />
        <p>{{item.detail}}</p>
      </div>
      <div class="list-item" v-if="isadd">
        <input type="checkbox" :disabled="!todoText" />
        <input
          class="todo-input"
          placeholder="请输入填写提醒事项"
          @blur="todoBlur"
          v-model="todoText"
          type="text"
        />
      </div>
    </div>
    <div class="empty-tip" v-if="!todoList.length">没有提醒事项</div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { filters } from "../utils/custom";
import Subscribe from "../utils/Subscribe";
export default {
  setup(props) {
    const { add, fetch, dele } = filters;
    const state = reactive({
      todoList: [],
      doneList: [],
      todoText: "",
      isadd: false,
      todoCount: 0,
      currentTag: {}
    });

    const initCOunt = () => {
      state.todoCount = state.todoList.length;
    };
    initCOunt();
    watch(
      () => props.currentTag
      // cur => {

      // }
    );
    Subscribe.$on("tagclick", id => {
      state.currentTag = fetch(id);
      console.log(state.currentTag)
      state.todoList = state.currentTag.child;
      state.todoList.forEach(item => {
        item.check = false;
      });
      state.doneList = state.currentTag.done || [];
      state.doneList.forEach(item => {
        item.check = false;
      });
      initCOunt();
    });
    const addTodo = () => {
      state.isadd = true;
    };

    const todoBlur = () => {
      state.todoList = add(state.currentTag.id, {
        id: state.todoList.length + 1,
        detail: state.todoText
      }).child;
      state.todoText = "";
      state.isadd = false;
      state.todoCount = state.todoList.length;
      Subscribe.$emit("updateTodo");
    };
    const deleTodo = id => {
      state.todoList = dele(state.currentTag.id, id).child;
      state.todoCount = state.todoList.length;
      Subscribe.$emit("updateTodo");
    };

    return {
      ...toRefs(state),
      addTodo,
      todoBlur,
      deleTodo
    };
  }
};
</script>

<style lang='scss' scoped>
.todo-list {
  position: relative;
  .add-todo {
    position: absolute;
    right: 0px;
    top: -20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
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
    .todo-input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #409eff;
      outline: none;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      padding: 5px;
    }
    .todo-input:focus {
      border: none;
      border-color: transparent;
    }
  }
  .empty-tip {
    position: absolute;
    top: 200px;
    left: 25%;
    font-size: 32px;
    color: #c0c0c0;
  }
}
</style>