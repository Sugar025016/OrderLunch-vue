<script setup lang="ts">
// import { Watch, Phone } from '@element-plus/icons-vue'
// import scheduleSetModal from '../scheduleSetModal/index.vue'
import 'bootstrap/dist/js/bootstrap.bundle'
// import { ref, reactive, defineProps } from 'vue'

// const scheduleModelSwitch = ref(false)
// const props =defineProps(['schedules', 'phone', 'name' ,'scheduleModelSwitch'])
// const props = defineProps({
//   scheduleModelSwitch: Boolean,
// })

// const { emit } = defineEmits()


// const props = defineProps({
//   dialogVisible: Boolean,
// });
//  scheduleModelSwitch.value = computed(() => props.scheduleModelSwitch  )
// const scheduleModelSwitch = ref(props.scheduleModelSwitch)
// const openModal = (modalId: string) => {
//   const modal = document.getElementById(modalId)
//   if (modal) {
//     modal.classList.add('show')
//     modal.style.display = 'block'
//   }
// }

// const openModal = (modalId: string) => {
//   const modal = document.getElementById(modalId);
//   if (modal) {
//
//     modal.addEventListener('shown.bs.modal', () => {
//       modal.focus()
// })
//   }
// };
</script>
<template>
  <!-- <div
    class="modal fade"
    id="scheduleModal"
    tabindex="-1"
    aria-labelledby="scheduleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3" id="exampleModalLabel">
            <el-icon :size="20"><Watch /></el-icon>
            營業時間
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="schedule item">
            <div v-for="schedulePeriods in schedules" class="week">
              <span v-if="schedulePeriods.week === 0">星期日：</span>
              <span v-else-if="schedulePeriods.week === 1">星期一：</span>
              <span v-else-if="schedulePeriods.week === 2">星期二：</span>
              <span v-else-if="schedulePeriods.week === 3">星期三：</span>
              <span v-else-if="schedulePeriods.week === 4">星期四：</span>
              <span v-else-if="schedulePeriods.week === 5">星期五：</span>
              <span v-else-if="schedulePeriods.week === 6">星期六：</span>
              <component
                v-if="schedulePeriods.timePeriods.length > 0"
                v-for="(schedulePeriod, index) in schedulePeriods.timePeriods"
              >
                <span v-if="index > 0">,</span>
                <span class="time">
                  {{ schedulePeriod.startTime }}~{{ schedulePeriod.endTime }}
                </span>
              </component>
              <span v-else>非營業日</span>
            </div>
          </div>
          <div class="demo-time-range">
            <el-time-select
              v-model="startTime"
              :max-time="endTime"
              class="mr-4"
              placeholder="Start time"
              start="08:30"
              step="00:15"
              end="18:30"
            />
            <el-time-select
              v-model="endTime"
              :min-time="startTime"
              placeholder="End time"
              start="08:30"
              step="00:15"
              end="18:30"
            />
          </div>
        </div>
        <div class="modal-footer">
          <span @click="openModal('scheduleSetModal')">編輯星期一 ～ 日</span>
          <span>編輯特定日期</span>
          <el-button text @click="scheduleModelSwitch = true">
    open a Form nested Dialog
  </el-button>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <scheduleSetModal
    :schedules="shopData?.schedules"
    :phone="shopData?.phone"
    :name="shopData?.name"
  ></scheduleSetModal> -->
  <!-- <el-dialog :visible="visible" @close="closeDialog" title="Shipping address"> -->
  <!-- <el-form :model="form">
      <el-form-item label="Promotion name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Zones" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="Zone No.1" value="shanghai" />
          <el-option label="Zone No.2" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button> 
      </span>
    </template> -->
  <!-- </el-dialog> -->
</template>

<style lang="scss" scoped>
@import '@/styles/bootstrap.scss';
@import 'node_modules/bootstrap/scss/_modal.scss';
@import 'node_modules/bootstrap/scss/close';
// @import 'node_modules/bootstrap/scss/buttons';
// @import 'node_modules/bootstrap/scss/button-group';

.modal {
  background-color: rgba(0, 0, 0, 0.5);

  .modal-title {
    margin: 10px;
  }

  .modal-header {
    border-bottom: 2px;
    border-style: solid;
    border-color: rgb(155, 155, 155);
    button {
      margin: 10px;
    }
  }
  .modal-body {
    // border-width: 2px;

    .item {
      margin: 10px;
      .title {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 20px;
        font-weight: 900;
        .el-icon {
          margin-right: 2px;
        }
      }
      .week {
        font-size: 16px;
        margin: 5px 20px;
        span {
          margin: 0 2px;
        }
      }
    }
    .shop-name {
      .title {
        font-size: 36px;
        font-weight: 100;
      }
    }
  }
  .modal-footer {
    display: flex;
    font-size: 22px;
    justify-content: space-around;
    align-items: center;
    color: $color;
    margin: 0 0 30px 0;
    span {
      margin: 0 20px;
    }
    span:hover {
      color: white;
      cursor: pointer;
    }

    span:active {
      color: $color;
      cursor: pointer;
    }
  }
}

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
