

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { Ref, computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
import Captcha from '@/components/Register/src/Captcha/index.vue'

// import Identify from '@/components/VerifyCode/index.vue'
// VerifyCode import
const captchaRef = ref<typeof Captcha | null>(null)

let $router = useRouter()
let $route = useRoute()
let loading = ref(false)

const identifyCode = ref('1234')
const identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz')

// 重置验证码

const makeCode = (o: Ref<any>, l: number) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value +=
      identifyCodes.value[randomNum(0, identifyCodes.value.length)]
  }
}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

let useStore = useUserStore()
let loginForms = ref()

const loginForm = reactive({
  username: 'admin@gmail.com',
  password: 'password',
  verifyCode: '',
  rememberMe: true,
})

const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的任意组合'))
  } else {
    callback()
  }
}

const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length < 4) {
    callback(new Error('请输入正确的验证码'))
  } else {
    callback()
  }
}
import { Response, ResponseData } from '@/api/type'
import { ElNotification } from 'element-plus/lib/components/index.js'
const login = async () => {
  loginForm.verifyCode=captchaRef.value?.verifyCode
  await loginForms.value.validate()
  loading.value = true
  try {
    const loginResponse: ResponseData = await useStore.userLogin(loginForm)

    console.log('登陆成功', loginResponse)

    if (loginResponse?.status === 200) {
      let redirect: string = $route.query.redirect as string

      $router.push({ path: redirect || '/' })
      // $router.push('/')
      ElNotification({
        type: 'success',
        message: '登陆成功',
        title: `Hi, ${getTime()}好`,
      })
    } else if (loginResponse?.status === 401) {
      // $router.push('/')
      ElNotification({
        type: 'error',
        message: '帳號或密碼錯，請輸入正確的帳號或密碼',
        title: '帳號或密碼錯',
      })
    } else if (loginResponse?.status === 411) {
      captchaRef.value?.refreshCaptcha()

      ElNotification({
        type: 'error',
        message: loginResponse.message,
        title: '驗證碼錯誤',
      })
    } else {
      captchaRef.value?.refreshCaptcha()

      ElNotification({
        type: 'error',
        message: '驗證碼過期，更新驗證碼',
        title: '驗證碼錯誤',
      })
    }

    // if (loginResponse?.status === 411) {
    //   captchaRef.value?.refreshCaptcha()

    //   ElNotification({
    //     type: 'error',
    //     message: '驗證碼過期，更新驗證碼',
    //     title: '驗證碼錯誤',
    //   })
    // } else if(loginResponse?.status === 401){

    //   // $router.push('/')
    //   ElNotification({
    //     type: 'error',
    //     message: '帳號或密碼錯，請輸入正確的帳號或密碼',
    //     title: '帳號或密碼錯',
    //   })
    // } else {
    //   let redirect: string = $route.query.redirect as string

    //   $router.push({ path: redirect || '/' })
    //   // $router.push('/')
    //   ElNotification({
    //     type: 'success',
    //     message: '登陆成功',
    //     title: `Hi, ${getTime()}好`,
    //   })
    // }

    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

const rules = {
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
  verifyCode: [
    {
      trigger: 'blur',
      validator: validatorVerifyCode,
    },
  ],
}

// ../../assets/images/0050.png
</script>



<template>
  <div class="login_container">
    <el-card class="login_form">
      <!-- <h1>{{ title }}</h1> -->
      <h3>會員登入</h3>
      <el-form
        label-position="top"
        :model="loginForm"
        :rules="rules"
        ref="loginForms"
      >
        <el-form-item prop="username" label="帳號(信箱)：">
          <el-input
            :prefix-icon="User"
            v-model="loginForm.username"
            clearable
            placeholder="請輸入帳號"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密碼：">
          <el-input
            type="password"
            :prefix-icon="Lock"
            show-password
            v-model="loginForm.password"
            size="large"
            placeholder="請輸入密碼"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="驗證碼："
          prop="verifyCode"
          class="custom-form-item"
        >
          <Captcha  ref="captchaRef"></Captcha>
        </el-form-item>
        <el-form-item prop="rememberMe">
          <el-checkbox
            class="custom-checkbox"
            v-model="loginForm.rememberMe"
            label="記住我"
            size="large"
            text-color="#F56C6C"
          />
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button
          :loading="loading"
          class="login_btn"
          type="primary"
          size="default"
          @click="login"
          round
        >
          登入
        </el-button>
        <!-- <el-button type="primary" round>Primary</el-button> -->
      </el-form-item>
      <div class="forget">
        <router-link :to="'/Login/forgetPassword'" class="link">
          忘記密碼
        </router-link>
      </div>
      <hr />
      <div class="forget">
        <router-link :to="'/Register'" class="link">
          沒有帳號這邊可以註冊
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.login_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .el-card {
    border: 0px;
    box-shadow: none;
    border-radius: 40px;
    width: 100%;
  }
  .login_form {
    position: relative;
    padding: 10px;
    background: transparent;
    width: 100%;

    h1 {
      background: $color;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }

    h3 {
      font-size: 36px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 40px;
      margin-top: -10px;
      color: rgb(87, 87, 87);
    }
    .login_btn {
      width: 100%;
    }
    button {
      // border: 0px;
      height: 40px;
      // border-radius: 40px;
      font-size: 16px;
    }
    .forget {
      width: 100%;
      display: flex;
      text-align: center;
      a {
        width: 100%;
        text-decoration: none;
        color: $color;

        margin: 1px;
      }
    }
    hr {
      border-bottom: 1px;
      border-style: solid;
    }

    @import '@/styles/form.scss';
  }
}
.custom-checkbox {
  color: red; /* 设置文字颜色为红色 */
}
.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
