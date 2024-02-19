<template>
  <div class="changeProfile">
    <div>
      <span>現有密碼</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="userPwd.password"
      />
    </div>
    <div>
      <span>新密碼</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="userPwd.NewPassword"
      />
    </div>
    <div>
      <span>再次輸入新密碼</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="checkPwd"
      />
    </div>
  </div>
  <div class="changeProfile-foot">
    <el-button
      type="warning"
      size="large"
      class="button"
      round
      @click="changeUserPassword"
    >
      確認修改
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { UserPwd } from '@/api/user/type'
import useLoadingStore from '@/store/modules/loading'
import useUserStore from '@/store/modules/user'
import { ref } from 'vue'
let userStore = useUserStore()
const loadingStore = useLoadingStore()

const checkPwd = ref('')

let userPwd = ref<UserPwd>({
  password: '',
  NewPassword: '',
})

const changeUserPassword = async () => {
  loadingStore.startLoading()
  const response = await userStore.changeUserPwd(userPwd.value)
  loadingStore.stopLoading()
  loadingStore.open(response)
}
</script>
<style lang="scss" scoped>
.changeProfile {
  margin: 20px auto;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  div {
    display: flex;
    flex-direction: column;
    margin: 10px 0 0 0;

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
.changeProfile-foot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
  .button {
    width: 200px;
    font-size: 20px;
    background-color: $color;
  }
  .button:hover {
    background-color: rgb(253, 102, 20);
  }
}
</style>
