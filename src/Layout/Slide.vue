<template>
  <div class="slide">
      <search-input></search-input>
      <tag-list></tag-list>
      <task-list></task-list>
  </div>
</template>

<script>
import searchInput from '../components/SearchInput';
import TagList from '../components/TagList';
import TaskList from '../components/TaskList';
import {reactive,toRefs} from 'vue';
export default {
    components:{
        searchInput,
        TagList,
        TaskList
    },
    setup(){
        const state = reactive({
        });
        return {
            ...toRefs(state),
        }
    }
}
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