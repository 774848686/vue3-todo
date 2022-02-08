<template>
  <div class="tag-list">
    <ul>
      <li v-for="(item,index) in tagList" :key="item.id" :class="currentIndex===index?`active${index}`:''"
        @click="tagClick(index)">
        <div class="type">
          <img :src="currentIndex===index?item.icon_active:item.icon" alt />
          <p class="title">{{item.title}}</p>
        </div>
        <div class="count">{{item.child.length}}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {
    ref,
    onMounted
  } from "vue";
  import {
    todoStorage,
    filters
  } from "../utils/custom";
  import Subscribe from "../utils/Subscribe";
  import icon1 from "../assets/jintian.png";
  import icon1_active from "../assets/jintian_active.png";
  import icon2 from "../assets/jihuajindu.png";
  import icon2_active from "../assets/jihuajindu_active.png";
  import icon3 from "../assets/quanbufenlei.png";
  import icon3_active from "../assets/quanbufenlei_active.png";
  import icon4 from "../assets/tixing.png";
  import icon4_active from "../assets/tixing_active.png";
  const {
    set: storageSet,
    get: storageGet
  } = todoStorage;
  let tagList = ref([{
      id: "jintian",
      title: "今天",
      icon: icon1,
      icon_active: icon1_active,
      child: [],
      done: []
    },
    {
      id: "jihua",
      title: "计划",
      icon: icon2,
      icon_active: icon2_active,
      child: [],
      done: []
    },
    {
      id: "quanbu",
      title: "全部",
      icon: icon3,
      icon_active: icon3_active,
      child: [],
      done: []
    },
    {
      id: "tixing",
      title: "提醒",
      icon: icon4,
      icon_active: icon4_active,
      child: [],
      done: []
    }
  ]);
  let currentIndex = ref(0);
  const tagClick = index => {
    currentIndex.value = index;
    Subscribe.$emit("tagclick", tagList.value[index].id);
  };
  tagList.value =
    storageGet().length >= 4 ? storageGet().slice(0, 4) : tagList.value;
  storageSet(storageGet().length >= 4 ? storageGet() : tagList.value);
  Subscribe.$on("updateTodo", () => {
    const store = storageGet();
    const temp = store.map(item => {
      if (item.id === "quanbu") {
        item.child = filters.search();
      }
      return item;
    });
    tagList.value = temp.slice(0, 4);
    storageSet(temp);
    if (currentIndex.value > -1) {
      Subscribe.$emit("tagclick", tagList.value[currentIndex.value].id);
    }
  });
  onMounted(() => {
    Subscribe.$emit("tagclick", tagList.value[0].id);
    Subscribe.$on("inputChange", () => {
      currentIndex.value = -1;
    });
  });
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