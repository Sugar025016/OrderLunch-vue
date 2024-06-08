<script setup lang="ts">
import { ref } from 'vue'

import { Warning } from '@element-plus/icons-vue'

const emits = defineEmits(['update:verifyCode'])

const captchaUrl = ref<string>('/api/register/captcha?timestamp=' + Date.now())

const refreshCaptcha = async () => {
  captchaUrl.value = (await '/api/register/captcha?timestamp=') + Date.now()
}

const verifyCode = ref<string>('')
defineExpose({
  refreshCaptcha,
  verifyCode,
})
</script>
<template>
  <div class="captcha">
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
  </div>
</template>

<style lang="scss" scoped>
.captcha {
  width: 100%;
  :deep(.el-input-group) {
    .el-input-group__append {
      background-color: rgb(255, 255, 255);
      margin: 0 0 0 10px;
      padding: 0;
      border: none;
      box-shadow: none;
    }

    @media (max-width: $breakpoint-xs) {
      display: flex;
      flex-direction: column;
      width: auto;
      width: 100%;
      .el-input__wrapper {
        margin: 0 0 10px 0;
        width: 100%;
      }
      .el-input-group__append {
        margin: 0 10px;
        display: inline-flex;
        justify-content: flex-start;
      }
    }
  }
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
