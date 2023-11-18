<template>
  <div class="changeProfile-header">
    <div>
      <span>姓名</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="userProfile.name"
      />
    </div>
    <div>
      <span>Email</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="userProfile.email"
      />
    </div>
    <div>
      <span>電話</span>
      <input
        type="text"
        class="rounded-input"
        placeholder="输入文本"
        v-model="userProfile.phone"
      />
    </div>
  </div>
  <div class="changeProfile-foot">
    <el-button
      type="warning"
      size="large"
      class="button"
      round
      @click="changeUserProfile"
    >
      確認修改
    </el-button>
  </div>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import useLoadingStore from '@/store/modules/loading'
import { UserState } from '@/store/modules/types/types'
import { onMounted, ref } from 'vue'
import { UserProfile } from '@/api/user/type'

let userStore = useUserStore()

const loadingStore = useLoadingStore()

let userProfile = ref<UserProfile>({
  account: '',
  email: '',
  name: '',
  phone: '',
})

const updateUser = (v: UserState) => {
  userProfile.value.account = v.account
  userProfile.value.email = v.email
  userProfile.value.name = v.username
  userProfile.value.phone = v.phone
}

onMounted(() => {
  updateUser(userStore)
})

const changeUserProfile = async () => {
  loadingStore.startLoading()
  const response = await userStore.changeUserInfo(userProfile.value)
  loadingStore.stopLoading()
  loadingStore.open(response)
}
</script>
<style lang="scss" scoped>
.changeProfile-header {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  div {
    display: flex;
    flex-direction: column;
    margin: 10px 20px 0 0;
    .rounded-input {
      padding: 8px 15px;
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-icon {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
