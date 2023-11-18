<template>
  <div class="login">
    <h1 class="title">{{ title }}</h1>

    <div class="table">
      <span class="table-title">註冊帳號</span>
      <div>
        <span>帳號</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>密碼</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>密碼確認</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>Email</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>名稱/公司/團體</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>手機</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>
      <div>
        <span>公司電話</span>
        <input type="text" class="rounded-input" placeholder="输入文本" />
      </div>

      <el-checkbox v-model="checked1" label="Option 1" size="large" />

      <el-button size="large" round>確認</el-button>
      <a></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

let title = document.title
const checked1 = ref(true)
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
      margin: 0 0 15px 0;

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
    button {
      // display: block;
      display: flex;
      background-color: $color;
      width: 100%;
      color: white;
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
  }
}
</style>
