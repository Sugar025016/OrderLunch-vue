<template>
  <div class="register-member">
    <div class="table">
      <span class="table-title">註冊帳號</span>
      <div>
        <span>名稱</span>
        <input type="text" class="rounded-input" placeholder="請輸入名稱" />
      </div>
      <div>
        <span>Email</span>
        <input type="text" class="rounded-input" placeholder="請輸入Email" />
      </div>
      <div>
        <span>密碼</span>
        <input type="text" class="rounded-input" placeholder="請輸入密碼" />
      </div>
      <div>
        <span>密碼確認</span>
        <input type="text" class="rounded-input" placeholder="請輸入確認密碼" />
      </div>
      <div>
        <span>手機</span>
        <input type="text" class="rounded-input" placeholder="請輸入手機號碼" />
      </div>
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-button size="large" round>確認</el-button>
      <a></a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// let title = document.title
const checked1 = ref(true)
</script>
<style lang="scss" scoped>
.register-member {
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
      margin: 20px auto;
      vertical-align: middle;
      font-size: 36px;
      color: rgb(80, 80, 80);
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
    .el-form-item {
      :deep(.el-input__wrapper) {
        border-radius: 20px !important;
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
  }
}
</style>
