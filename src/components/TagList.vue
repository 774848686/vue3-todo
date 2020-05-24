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
        <div class="count">{{item.count}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup(props,context) {
    const state = reactive({
      tagList: [
        {
          id: "jintian",
          title: "今天",
          icon: require("../assets/jintian.png"),
          icon_active:require("../assets/jintian_active.png"),
          count: 0
        },
        {
          id: "jihua",
          title: "计划",
          icon: require("../assets/jihuajindu.png"),
          icon_active:require("../assets/jihuajindu_active.png"),
          count: 0
        },
        {
          id: "quanbu",
          title: "全部",
          icon: require("../assets/quanbufenlei.png"),
          icon_active:require("../assets/quanbufenlei_active.png"),
          count: 0
        },
        {
          id: "tixing",
          title: "提醒",
          icon: require("../assets/tixing.png"),
          icon_active:require("../assets/tixing_active.png"),
          count: 0
        }
      ],
      currentIndex: 0
    });
    const tagClick = index => {
      state.currentIndex = index;
      context.emit('tagChange',state.tagList[index])
    };
     context.emit('tagChange',state.tagList[0])
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