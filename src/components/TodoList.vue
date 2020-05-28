<template>
  <div class="todo-list">
    <div class="add-todo" @click="addTodo" v-if="currentTag.id!=='quanbu'">
      <img src="../assets/jia.png" alt />
    </div>
    <div class="keywords" v-if="keywords">{{`"${keywords}"`}}的搜索结果</div>
    <div class="title" v-else>
      <p>{{currentTag.title}}</p>
      <p>{{todoCount}}</p>
    </div>
    <div class="task-finish" v-if="doneList.length">
      <p>{{doneList.length}}项已经完成</p>
      <div class="toggle-btn" @click="expandDone">{{isExpand?'隐藏':'显示'}}</div>
    </div>
    <div class="done-list" v-if="doneList.length && isExpand">
      <div class="list-item" v-for="item in doneList" :key="item.id">
        <input type="checkbox" class="disabled-box" disabled />
        <p>{{item.detail}}</p>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in todoList" :key="item.id" @dblclick="editeTodo(item)">
        <input type="checkbox" v-model="item.check" @change="deleTodo(item)" />
        <input
          v-if="item.isEdite"
          class="todo-input"
          autofocus
          placeholder="请输入填写提醒事项"
          @blur="todoEditeBlur(item)"
          v-model="item.detail"
          type="text"
        />
        <p v-else>{{item.detail}}</p>
      </div>
      <div class="list-item" v-if="isadd">
        <input type="checkbox" :disabled="!todoText" />
        <input
          class="todo-input"
          autofocus
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
import { reactive, toRefs, computed, onMounted } from "vue";
import { filters, todoStorage } from "../utils/custom";
import Subscribe from "../utils/Subscribe";
export default {
  setup() {
    const { add, fetch, dele, search } = filters;
    const state = reactive({
      todoList: [],
      doneList: [],
      todoText: "",
      isadd: false,
      todoCount: computed(() => {
        return state.todoList.length;
      }),
      currentTag: {},
      keywords: "",
      isExpand:false
    });
    Subscribe.$on("tagclick", id => {
      state.currentTag = fetch(id);
      state.todoList = state.currentTag.child;
      state.doneList = state.currentTag.done;
      state.todoList.forEach(item => {
        item.check = false;
      });
      state.doneList.forEach(item => {
        item.check = true;
        item.disabled = true;
      });
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
      Subscribe.$emit("updateTodo");
    };
    const deleTodo = row => {
      state.todoList = dele(
        row.parentId ? row.parentId : state.currentTag.id,
        row.id
      ).child;
      Subscribe.$emit("updateTodo");
      if (state.keywords) {
        Subscribe.$emit("inputChange", state.keywords);
      }
    };
    const editeTodo = row => {
      row.isEdite = true;
    };
    const todoEditeBlur = row => {
      row.isEdite = false;
      state.todoText = "";
      state.isadd = false;
      todoStorage.reSet(state.currentTag.id, state.currentTag);
    };
    const expandDone = ()=>{
      state.isExpand = !state.isExpand;
    }
    onMounted(() => {
      Subscribe.$on("inputChange", value => {
        state.keywords = value;
        state.todoList = search(value);
      });
    });
    return {
      ...toRefs(state),
      addTodo,
      todoBlur,
      deleTodo,
      editeTodo,
      todoEditeBlur,
      expandDone
    };
  }
};
</script>

<style lang='scss' scoped>
.todo-list {
  position: relative;
  .keywords {
    width: 100%;
    word-wrap: break-word;
    font-size: 24px;
    color: #5c6269;
    margin-bottom: 15px;
  }
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
      cursor: pointer;
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
  .done-list {
    margin-bottom: 24px;
    .disabled-box {
      position: relative;
      width: 14px;
      height: 14px;
      appearance: none;
      -webkit-appearance: none;
      border: 1px solid #e97531;
      border-radius: 100%;
    }
    .disabled-box:after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background: #e97531;
      border-radius: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>