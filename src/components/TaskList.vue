<template>
  <div class="task-list">
    <text class="title">我的列表</text>
    <div class="list">
      <ul>
        <li
          @click="taskClick(index)"
          @dblclick="editeTask(item)"
          :class="index===currentIndex?'active':''"
          :data-index="index"
          v-for="(item,index) in taskList"
          :key="index"
        >
          <div class="name">
            <input
              v-if="item.isEdite"
              type="text"
              autofocus
              @blur="inputEditeBlur(item)"
              v-model="item.title"
            />
            <span v-else>{{item.title}}</span>
          </div>
          <div class="count">{{item.child?item.child.length:0}}</div>
        </li>
        <li class="active" v-if="isCreated">
          <div class="name">
            <input type="text" autofocus @blur="inputBlur" v-model="createName" />
          </div>
          <div class="count">0</div>
        </li>
      </ul>
    </div>
    <div class="add-todo" @click="addTask">添加列表</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { todoStorage } from "../utils/custom";
import Subscribe from "../utils/Subscribe";
export default {
  setup() {
    const NULL_TEX = "新建列表";
    let state = reactive({
      taskList: todoStorage.get().slice(4),
      createName: NULL_TEX,
      isCreated: false,
      currentIndex: null
    });
    const addTask = () => {
      state.isCreated = true;
    };
    const inputBlur = () => {
      let waitPush = {
        id: state.taskList.length + 1,
        title: state.createName,
        child: [],
        done:[]
      };
      state.taskList.push(waitPush);
      state.createName = NULL_TEX;
      state.isCreated = false;
      todoStorage.set([...todoStorage.get(), waitPush]);
    };
    const taskClick = index => {
      state.currentIndex = index;
      Subscribe.$emit("tagclick", state.taskList[index].id);
    };
    const editeTask = row => {
      row.isEdite = true;
    };
    const inputEditeBlur = row => {
      row.isEdite = false;
      todoStorage.reSet(row.id, row);
      Subscribe.$emit("tagclick", row.id);
    };
    Subscribe.$on("updateTodo", () => {
      state.taskList = todoStorage.get().slice(4);
    });
    return {
      ...toRefs(state),
      addTask,
      inputBlur,
      taskClick,
      editeTask,
      inputEditeBlur
    };
  }
};
</script>

<style lang="scss" scoped>
.task-list {
  position: relative;
  height: 360px;
  .title {
    font-size: 12px;
    color: #606266;
  }
  .list {
    margin-top: 15px;
    max-height: 300px;
    overflow-y: auto;
    li {
      cursor: pointer;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 14px;
      color: #313031;
      padding: 5px;
      padding-left: 28px;
      input {
        width: 200px;
        border-radius: 3px;
        outline: none;
        font-size: 12px;
        padding-left: 5px;
        box-sizing: border-box;
        color: #606266;
      }
      &.active {
        background-color: #2f7cf6;
        color: #fff;
      }
    }
    li:after {
      position: absolute;
      left: 0;
      top: 0px;
      content: "";
      width: 24px;
      height: 24px;
      background: url(../assets/woyaozuode.png) no-repeat;
      background-size: 100% 100%;
      border-radius: 100%;
    }
  }
  .add-todo {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  .add-todo:after {
    position: absolute;
    left: -4px;
    top: -2px;
    content: "";
    width: 20px;
    height: 20px;
    background: url(../assets/tianjia.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>