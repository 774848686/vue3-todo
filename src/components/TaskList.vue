<template>
  <div class="task-list">
    <text class="title">我的列表</text>
    <div class="list">
      <ul>
        <li
          @click="taskClick(index)"
          :class="index===currentIndex?'active':''"
          :data-index="index"
          v-for="(item,index) in taskList"
          :key="index"
        >
          <div class="name">{{item.name}}</div>
          <div class="count">{{item.child.length}}</div>
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
export default {
  setup() {
    const NULL_TEX = "新建列表";
    let state = reactive({
      taskList: [],
      createName: NULL_TEX,
      isCreated: false,
      currentIndex: null
    });
    const addTask = () => {
      state.isCreated = true;
    };
    const inputBlur = () => {
      state.taskList.push({
        name: state.createName,
        id: state.taskList.length + 1,
        child: []
      });
      state.createName = NULL_TEX;
      state.isCreated = false;
    };
    const taskClick = index => {
      state.currentIndex = index;
    };
    return {
      ...toRefs(state),
      addTask,
      inputBlur,
      taskClick
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
    max-height: 360px;
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