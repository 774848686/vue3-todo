<template>
  <layout></layout>
</template>

<script>
import Layout from "./Layout/index.vue";

import { reactive, computed, toRefs } from "vue";

export default {
  components: {
    Layout
  },

  // Using Composition API style
  setup() {
    const data = reactive({
      todoList: [],
      showingStatus: "all",
      onShowList: computed(() => {
        if (data.showingStatus === "all") {
          return data.todoList;
        } else if (data.showingStatus === "completed") {
          return data.todoList.filter(({ completed }) => completed);
        } else if (data.showingStatus === "uncompleted") {
          return data.todoList.filter(({ completed }) => !completed);
        }
      })
    });

    function submit(content) {
      data.todoList.push({
        completed: false,
        content,
        id: parseInt(Math.random(0, 1) * 100000)
      });
    }
    function onStatusChanged(status) {
      data.showingStatus = status;
    }
    function toggleStatus({ isChecked, id }) {
      data.todoList.forEach(item => {
        if (item.id === id) {
          item.completed = isChecked;
        }
      });
    }
    function onItemDelete(id) {
      let index = 0;
      data.todoList.forEach((item, i) => {
        if (item.id === id) {
          index = i;
        }
      });
      data.todoList.splice(index, 1);
    }

    return {
      ...toRefs(data),
      submit,
      onStatusChanged,
      toggleStatus,
      onItemDelete
    };
  }
};
</script>
<style lang="scss">
ul,
li,p {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
