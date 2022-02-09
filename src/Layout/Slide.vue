<template>
  <div class="slide">
      <search-input></search-input>
      <tag-list></tag-list>
      <task-list></task-list>
  </div>
</template>

<script setup>
import searchInput from '../components/SearchInput.vue';
import TagList from '../components/TagList.vue';
import TaskList from '../components/TaskList.vue';
</script>

<style lang="scss" scoped>
    .slide{
        float: left;
        width: 300px;
        height: 600px;
        padding: 0 20px;
        padding-top:30px;
        box-sizing: border-box;
        background-color: #f6f6f6;
    }
</style>