<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock, Warning } from '@element-plus/icons-vue'
import { RegisterMember } from '@/api/user/type'
import { reqAddMember } from '@/api/user'
import ElMessage from 'element-plus/lib/components/message/index.js'
import Captcha from '../Captcha/index.vue'

const registerMember = ref<RegisterMember>({
  name: 'jjj',
  account: 'ruby028016@gmail.com',
  phone: '123456789',
  password: 'password',
  passwordCheck: 'password',
  verifyCode: '',
})



let formRef = ref<any>()

const validatorName = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入名稱'))
  } else if (value.length < 3) {
    callback(new Error('名稱t長度不可小於3字母'))
  } else {
    callback()
  }
}
const validatorEmail = (rule: any, value: any, callback: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // return emailRegex.test(email);
  if (value.length === 0) {
    callback(new Error('請輸入信箱'))
  } else if (emailRegex.test(value)) {
    callback() // 驗證通過
  } else {
    callback(new Error('請輸入有效的信箱')) // 驗證失敗，返回錯誤訊息
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的英數任意组合'))
  } else {
    callback()
  }
}
const validatorPasswordCheck = (rule: any, value: any, callback: any) => {
  console.log(value)
  const password = registerMember.value.password
  if (value.length === 0) {
    callback(new Error('请输入密码確認'))
  } else if (value !== password) {
    callback(new Error('密码錯誤'))
  } else {
    callback()
  }
}
const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  console.log("value.length:",value.length)
  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length < 4) {
    callback(new Error('请输入4碼验证码'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    {
      required: true,
      trigger: 'change',
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
  passwordCheck: [
    {
      required: true,
      trigger: 'change',
      validator: validatorPasswordCheck,
    },
  ],
  account: [
    {
      required: true,
      trigger: 'change',
      validator: validatorEmail,
    },
  ],
  verifyCode: [
    {
      required: true,
      trigger: 'change',
      validator: validatorVerifyCode,
    },
  ],
}

const save = async () => {
  await formRef.value.validate()

  let res: any = await reqAddMember(registerMember.value)

  if (res.code === 200) {
    // sellShopStore.shopDrawer = false
    ElMessage({
      message: '註冊成功',
      type: 'success',
    })
    window.location.reload()
  } else {
    // sellShopStore.shopDrawer = false
    ElMessage({
      type: 'error',
      message: '註冊失敗',
    })
  }
}
</script>
<template>
  <div class="register-member">
    <span class="table-title">註冊帳號</span>
    <el-form
      :model="registerMember"
      :rules="rules"
      ref="formRef"
      label-width="auto"
      label-position="top"
    >
      <el-form-item prop="name" label="名稱：" size="large">
        <el-input
          :prefix-icon="User"
          v-model="registerMember.name"
          clearable
          placeholder="name"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item prop="account" label="帳號(信箱)：" size="large">
        <el-input v-model="registerMember.account" size="large">
          <template #prefix>
            <!-- <el-icon class="el-input__icon"><calendar /></el-icon> -->
            <def-svg-icon
              class="buy-svg-icon"
              name="email"
              color="#a8abb2"
              width="14px"
              height="14px"
            ></def-svg-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密碼：" size="large">
        <el-input
          type="password"
          :prefix-icon="Lock"
          show-password
          v-model="registerMember.password"
          size="large"
          placeholder="Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwordCheck" label="密碼確認：" size="large">
        <el-input
          type="password"
          :prefix-icon="Lock"
          show-password
          v-model="registerMember.passwordCheck"
          size="large"
          placeholder="Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="verifyCode"
        class="custom-form-item"
        label="驗證碼："
        size="large"
      >
        <Captcha v-model="registerMember.verifyCode"></Captcha>
      </el-form-item>
    </el-form>
    <!-- <el-checkbox v-model="checked1" label="Option 1" size="large" /> -->
    <el-button size="large" type="primary" round @click="save()">
      確認
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.register-member {
  display: flex;
  // align-items:center;
  justify-content: center;
  flex-direction: column;
  .table-title {
    margin: 20px auto;
    vertical-align: middle;
    font-size: 36px;
    color: rgb(80, 80, 80);
    font-weight: 700;
  }

  @import '@/styles/form.scss';
}
</style>
