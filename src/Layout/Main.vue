<template>
  <div class="main">
      <todo-list></todo-list>
  </div>
</template>

<script>
import TodoList from '../components/TodoList';
export default {
    components:{
        TodoList
    }
}
</script>

<style lang="scss" scoped>
    .main{
        float: left;
         width: 400px;
        height: 600px;
         padding: 0 20px;
        padding-top:30px;
        box-sizing: border-box;
        background-color: #ffffff;
    }
</style>