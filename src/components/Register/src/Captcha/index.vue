<script setup lang="ts">
import { ref } from 'vue'

import { Warning } from '@element-plus/icons-vue'

const emits = defineEmits(['update:verifyCode'])

const captchaUrl = ref<string>(
  '/api/api/register/captcha?timestamp=' + Date.now(),
)
const refreshCaptcha = () => {
  captchaUrl.value = '/api/api/register/captcha?timestamp=' + Date.now()
}

const verifyCode = ref<string>('')
</script>
<template>
  <el-input
    :prefix-icon="Warning"
    v-model="verifyCode"
    placeholder="驗證碼"
    size="large"
    maxlength="4"
  >
    <template #append>
      <img :src="captchaUrl" alt="Captcha Image" />
      <div class="font-icon">
        <el-link
          target="_blank"
          type="primary"
          :underline="false"
          @click="refreshCaptcha"
        >
          <el-icon><RefreshRight /></el-icon>
          <span class="span">驗證碼</span>
        </el-link>
      </div>
    </template>
  </el-input>
</template>

<style lang="scss" scoped>
:deep(.el-input-group__append) {
  background-color: rgb(255, 255, 255);
  margin: 0 0 0 10px;
  padding: 0;
  border: none;
  box-shadow: none;
}
img {
  width: 120px;
  height: 40px;
}
.font-icon {
  margin: 0 0 0 5px;
  i {
    font-size: 20px;
    letter-spacing: 4px;
  }
  .span {
    font-size: 14px;
  }
}
:deep(.el-input__inner) {
  letter-spacing: 2px !important;
}
</style>
