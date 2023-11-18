<template>
  <div class="login">
    <h1 class="title">{{ title }}</h1>

    <div class="table">
      <span class="table-title">會員登入</span>
      <div>
        <span>新密碼</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>再次輸入新密碼</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <input type="text" class="rounded-input" placeholder="输入文本" />
        <img />
      </div>
      <el-button size="large" round>登入</el-button>
      <a></a>
    </div>
    <span class="register">
      還沒有帳號嗎？
      <a>註冊會員</a>
    </span>
    <div class="social-media">
      <el-button size="large" round>登入</el-button>
      <el-button size="large" round>登入</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
let title = document.title
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  // align-items:center;
  justify-content: center;
  flex-direction: column;

  .title {
    margin: 0 auto;
    vertical-align: middle;
    font-size: 35px;
    color: $color;
    font-weight: 700;
  }

  .table {
    margin: 20px auto;
    min-width: 350px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    .table-title {
      margin: 0 auto;
      vertical-align: middle;
      font-size: 30px;
      color: white;
      font-weight: 700;
    }
    div {
      display: flex;
      flex-direction: column;
      margin: 0 0 20px 0;

      .rounded-input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin-bottom: 10px;
      }
      span {
        margin: 5px;
      }
    }
  }
  .register {
    margin: auto;
  }
  .social-media {
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    min-width: 350px;
    button {
      // display: block;
      display: flex;

      width: 100%;
    }
  }
}
</style>
