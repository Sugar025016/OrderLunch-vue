<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ProductModalData } from '@/api/tab/type'
import useUserStore from '@/store/modules/user'
import { reqAddCart } from '@/api/cart'
import { CartRequest } from '@/api/cart/type'

import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

let $router = useRouter()

let userStore = useUserStore()

const props = defineProps({
  product: Object as () => ProductModalData,
})
const inputUserName = ref('')
inputUserName.value = userStore.username
const count = ref(1)
const totalPrice = ref()
totalPrice.value = props.product!.price
count.value = 1
const changeCount = (v: number) => {
  props.product!.qty = props.product!.qty + v
  totalPrice.value = count.value * props.product!.price
}

let timer: any
const checkAddCart = async () => {
  if (await userStore.isCheckChooseAddress()) {
    ElMessageBox.confirm(
      '你還未設定外送地點，請前往首頁設定外送地點！',
      '前往首頁！',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(() => {
        $router.push('/login')
      })
      .catch(() => {
        clearTimeout(timer)
      })

    // 設定定時器，在 10 秒後關閉訊息框
    timer = setTimeout(() => {
      const messageBoxInstance = ElMessageBox
      if (messageBoxInstance) {
        messageBoxInstance.close()

        $router.push('/login')
      }
    }, 5000) // 5000 毫秒即为 5 秒
    return
  }

  if (
    userStore.cartShopId != 0 &&
    userStore.cartShopId != props.product?.shopId
  ) {
    ElMessageBox.confirm(
      '你購買了其他店家商品，購物車將被清空，你確定要要清空舊購物商品！',
      '清空購物車！',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(() => {
        addCart()
      })
      .catch(() => {
        // 使用者點擊了 "取消" 按鈕或關閉了訊息框
      })
  } else {
    addCart()
  }
}

const addCart = async () => {
  let cartReq = ref<CartRequest>({
    productId: props.product!.productId,
    department: props.product!.department,
    orderUsername: props.product!.orderUsername,
    qty: props.product!.qty,
    remark: props.product!.remark,
  })
  let res = await reqAddCart(cartReq.value)

  if (res.status === 200) {
    userStore.userInfo()
  }
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- <div class="modal-header" > -->
        <!-- <div class="modal-header" style="background-image: url(product.img);"> -->
        <div
          class="modal-header"
          :style="{ backgroundImage: 'url(' + product!.imgUrl + ')' }"
        >
          <el-button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></el-button>
          <div class="image-container">
            <!-- <img src="@/assets/images/product001.jpeg" alt="a" /> -->
          </div>
        </div>

        <div class="modal-body">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ product!.name }}
          </h1>
          <span class="modal-description fs-6" id="staticBackdropLabel">
            {{ product!.description }}
            <!-- {{ product }} -->
          </span>
          <hr class="divider" />
          <!-- <div class="divider"></div> -->

          <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel">"name"</h1> -->
          <div class="modal-body-content">
            <!-- <span>訂購人</span> -->
            <label for="orderUsername">訂購人:</label>
            <input
              id="orderUsername"
              type="text"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.orderUsername"
            />
            <!-- <span>部門/單位</span> -->
            <!-- <label for="department">部門/單位1111111:</label>
            <input
              id="department"
              type="text"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.department"
            /> -->
            <!-- <span>備註</span> -->
            <label for="remark">備註:</label>
            <input
              id="remark"
              type="textarea"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.remark"
            />
            <!-- <textarea
              rows="5"
              cols="33"
              class="rounded-input input-area"
              v-model="product!.remark"
            ></textarea> -->
          </div>
        </div>
        <div class="modal-footer">
          <div class="count">
            <el-button
              type="warning"
              class="btn btn-primary btn-count"
              @click="changeCount(-1)"
              :disabled="props.product!.qty < 2"
              size="large"
            >
              <el-icon><Minus /></el-icon>
            </el-button>

            <span class="fs-5">{{ props.product!.qty }}</span>

            <el-button
              type="warning"
              class="btn btn-primary btn-count"
              @click="changeCount(1)"
              :disabled="props.product!.qty > 9"
              size="large"
            >
              <el-icon><Plus /></el-icon>
            </el-button>
            <span class="fs-5">
              總額：${{ props.product!.qty * props.product!.price }}
            </span>
          </div>
          <el-button
            type="warning"
            class="btn btn-primary"
            size="large"
            @click="checkAddCart()"
            data-bs-dismiss="modal"
            round
          >
            加入購物車
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import '../node_modules/bootstrap/scss/_modal.scss';
@import '../../../../../../node_modules/bootstrap/scss/close';
.divider {
  border-color: #ccc;
}
.modal-dialog {
  .modal-content {
    border-radius: 20px;

    .btn-close {
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: 30px;
      right: 30px;
    }
    .modal-header {
      height: 200px;
      width: 100%;
      // background: url('@/assets/images/product001.jpeg') no-repeat;
      background-position: center;
      background-size: cover;
    }
    .modal-body {
      h1 {
        font-size: 20px;
      }

      .modal-description {
        font-size: 10px;
      }

      .divider {
        margin: 10px 0;
        border-color: #505050;
        height: 2px;
      }

      .modal-body-content {
        display: flex;
        flex-direction: column;
        margin: 10px 0 0 0;
        .rounded-input {
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 20px;
          margin-bottom: 10px;
          background-color: #50505000;
          height: 40px;
        }
        .input-area {
          height: 100px;
        }
        span {
          margin: 5px;
        }

        label {
          margin: 5px;
        }
      }
    }
    .modal-footer {
      display: flex;
      justify-content: space-between;

      .btn {
        border-radius: 20px;
        background-color: $color;
        border: 0;
      }

      .count {
        .btn-count {
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
