<template>
  <div class="tag-list">
    <ul>
      <li>
        <div class="today">
          <img src="../assets/jintian.png" alt />
          <p class="title">今天</p>
        </div>
        <div class="count">0</div>
      </li>
      <li>
        <div class="today">
          <img src="../assets/jihuajindu.png" alt />
          <p class="title">计划</p>
        </div>
        <div class="count">0</div>
      </li>
      <li>
        <div class="today">
          <img src="../assets/quanbufenlei.png" alt />
          <p class="title">全部</p>
        </div>
        <div class="count">0</div>
      </li>
      <li>
        <div class="today">
          <img src="../assets/tixing.png" alt />
          <p class="title">提醒</p>
        </div>
        <div class="count">0</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tag-list {
    margin-top:15px;    
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 115px;
      height: 60px;
      display: flex;
      justify-content: space-between;
      background: #fff;
      margin-bottom:15px;
      border-radius: 8px;
      padding:10px;
      box-sizing: border-box;
      .today {
        display: flex;
        flex-direction: column;
        img {
          width: 24px;
          height: 24px;
        }
        p{
            font-size:12px;
            margin-top:8px;
            color:#6f6f6f;
        }
      }
      .count{
          color:#c0c0c0;
          font-weight: bold;
      }
    }
  }
}
</style>