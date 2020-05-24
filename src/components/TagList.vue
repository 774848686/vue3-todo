<template>
  <div class="tag-list">
    <ul>
      <li
        v-for="(item,index) in tagList"
        :key="item.id"
        :class="currentIndex===index?`active${index}`:''"
        @click="tagClick(index)"
      >
        <div class="type">
          <img :src="currentIndex===index?item.icon_active:item.icon" alt />
          <p class="title">{{item.title}}</p>
        </div>
        <div class="count">{{item.child.length}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { todoStorage } from "../utils/custom";
import Subscribe from "../utils/Subscribe";
export default {
  setup() {
    const state = reactive({
      tagList: [
        {
          id: "jintian",
          title: "今天",
          icon: require("../assets/jintian.png"),
          icon_active: require("../assets/jintian_active.png"),
          child: []
        },
        {
          id: "jihua",
          title: "计划",
          icon: require("../assets/jihuajindu.png"),
          icon_active: require("../assets/jihuajindu_active.png"),
          child: []
        },
        {
          id: "quanbu",
          title: "全部",
          icon: require("../assets/quanbufenlei.png"),
          icon_active: require("../assets/quanbufenlei_active.png"),
          child: []
        },
        {
          id: "tixing",
          title: "提醒",
          icon: require("../assets/tixing.png"),
          icon_active: require("../assets/tixing_active.png"),
          child: []
        }
      ],
      currentIndex: 0
    });
    const tagClick = index => {
      state.currentIndex = index;
      Subscribe.$emit("tagclick", state.tagList[index].id);
    };
    state.tagList =
      todoStorage.get().length > 4
        ? todoStorage.get().slice(0, 4)
        : state.tagList;
    todoStorage.set(todoStorage.get().length>4 ? todoStorage.get() : state.tagList);
    Subscribe.$emit("tagclick", state.tagList[0].id);

    Subscribe.$on("updateTodo", () => {
      state.tagList = todoStorage.get().slice(0, 4);
    });
    return {
      ...toRefs(state),
      tagClick
    };
  }
};
</script>

<style lang="scss" scoped>
.tag-list {
  margin-top: 15px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 115px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      margin-bottom: 15px;
      border-radius: 8px;
      padding: 10px;
      box-sizing: border-box;
      .type {
        display: flex;
        flex-direction: column;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          font-size: 12px;
          margin-top: 8px;
          color: #6f6f6f;
        }
      }
      .count {
        color: #c0c0c0;
        font-weight: bold;
      }
      &.active0 {
        background: #4395d6;
        p {
          color: #fff;
        }
        .count {
          color: #fff;
        }
      }
      &.active1 {
        background: #f19951;
        p {
          color: #fff;
        }
        .count {
          color: #fff;
        }
      }
      &.active2 {
        background: #dbdbdb;
        p {
          color: #fff;
        }
        .count {
          color: #fff;
        }
      }
      &.active3 {
        background: #f4b19e;
        p {
          color: #fff;
        }
        .count {
          color: #fff;
        }
      }
    }
  }
}
</style>