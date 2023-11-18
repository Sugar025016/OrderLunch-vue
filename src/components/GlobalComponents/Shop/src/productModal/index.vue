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
          :style="{ backgroundImage: 'url(' + product!.img + ')' }"
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
          </span>
          <hr class="divider" />
          <!-- <div class="divider"></div> -->

          <!-- <h1 class="modal-title fs-5" id="staticBackdropLabel">"name"</h1> -->
          <div class="modal-body-content">
            <span>訂購人</span>
            <input
              type="text"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.orderUsername"
            />
            <span>部門/單位</span>
            <input
              type="text"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.department"
            />
            <span>備註</span>
            <input
              type="text"
              class="rounded-input"
              placeholder="输入文本"
              v-model="product!.remark"
            />
          </div>
        </div>
        <div class="modal-footer">
          <div class="count">
            <el-button
              type="warning"
              class="btn btn-primary btn-count"
              @click="changeCount(-1)"
              :disabled="count < 2"
              size="large"
            >
              <el-icon><Minus /></el-icon>
            </el-button>

            <span class="fs-5">{{ props.product!.qty }}</span>

            <el-button
              type="warning"
              class="btn btn-primary btn-count"
              @click="changeCount(1)"
              :disabled="count > 9"
              size="large"
            >
              <el-icon><Plus /></el-icon>
            </el-button>
          </div>
          <el-button
            type="warning"
            class="btn btn-primary"
            size="large"
            @click="addCart()"
            data-bs-dismiss="modal"
            round
          >
            加入購物車
            <span>{{ props.product!.qty * props.product!.prise }}</span>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ProductModalData } from '@/api/tab/type'
import useUserStore from '@/store/modules/user'
import { apiAddCart } from '@/api/cart'
import { CartRequest } from '@/api/cart/type'

let userStore = useUserStore()

const props = defineProps({
  product: Object as () => ProductModalData,
})
const inputUserName = ref('')
inputUserName.value = userStore.username
const count = ref(1)
const totalPrice = ref()
totalPrice.value = props.product!.prise
count.value = 1
const changeCount = (v: number) => {
  props.product!.qty = props.product!.qty + v
  totalPrice.value = count.value * props.product!.prise
}

const addCart = async () => {
  let cartReq = ref<CartRequest>({
    productId: props.product!.productId,
    department: props.product!.department,
    orderUsername: props.product!.orderUsername,
    qty: props.product!.qty,
    remark: props.product!.remark,
  })
  // Object.assign(cartReq.value, productModal.value)

  let res = await apiAddCart(cartReq.value)

  if (res.code === 200) {
    userStore.cartCount = res.data
  }
}
</script>
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
      // top:1;
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
      // .divider::after {
      //   content: '';
      //   position: absolute;
      //   top: 62px;
      //   left: 0;
      //   width: 100%;
      //   height: 2px;
      //   background-color: #838282;
      //   transform: translateY(50%);
      // }
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
        span {
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
