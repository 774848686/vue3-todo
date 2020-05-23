<template>
  <div class="task-list">
    <text class="title">我的列表</text>
    <div class="list">
      <ul>
        <li>
          <div class="name">今日需求</div>
          <div class="count">0</div>
        </li>
       <li>
          <div class="name">今日需求</div>
          <div class="count">0</div>
        </li>
       <li>
          <div class="name">今日需求</div>
          <div class="count">0</div>
        </li>
        <li>
          <div class="name">今日需求</div>
          <div class="count">0</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.task-list {
  .title {
    font-size: 12px;
    color: #606266;
  }
  .list {
    margin-top:15px;
    max-height: 320px;
    overflow-y: auto;
    li {
      position: relative;
      padding-left: 28px;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      margin-bottom:15px;
      font-size:14px;
      color:#313031;
    }
    li:after{
      position: absolute;
      left:0;
      top:-4px;
      content:'';
      width:24px;
      height: 24px;
      background: url(../assets/woyaozuode.png) no-repeat;
      background-size: 100% 100%;
      border-radius: 100%;

    }
  }
}
</style>