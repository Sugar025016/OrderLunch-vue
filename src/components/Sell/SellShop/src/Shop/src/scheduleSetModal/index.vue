<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'

import { TimePeriods } from '@/api/shop/type'
const props = defineProps({
  scheduleSetModal: Boolean,
  title: String,
  message: String,
  onClose: Function,
})
const visible = ref(props.scheduleSetModal)

const $emit = defineEmits(['update:scheduleSetModal', 'change-event'])

// 定义关闭对话框的方法
const handleClose = () => {
  $emit('update:scheduleSetModal', (visible.value = false))
}

// const { emits } = defineEmits(['change-event']);
// 定义确认和取消按钮的方法
const confirm = async () => {
  await formRef.value.validate()

  switch (radio.value) {
    case 1:
      await confirmSet1()
      break
    case 2:
      await confirmSet2()
      break
    default:
      await confirmSet3()
  }
  $emit('change-event', scheduleParams.value)
  handleClose()
}

const confirmSet1 = async () => {
  scheduleParams.value.times = []
}
const confirmSet2 = async () => {
  scheduleParams.value.times = [{ startTime: '00:00', endTime: '24:00' }]
}
const confirmSet3 = async () => {
  scheduleParams.value.times.forEach((time) => {
    if (time.endTime === '00:00') {
      time.endTime = '24:00'
    }
  })
  scheduleParams.value.times.forEach((time1, index1) => {
    scheduleParams.value.times.forEach((time2, index2) => {
      // 确保不与自身比较
      if (index1 !== index2) {
        // 将时间字符串转换为分钟数以进行比较

        const startTime1 = convertTimeToMinutes(time1.startTime)
        const endTime1 = convertTimeToMinutes(
          time1.endTime === '00:00' ? '24:00' : time1.endTime,
        )
        const startTime2 = convertTimeToMinutes(time2.startTime)
        const endTime2 = convertTimeToMinutes(
          time2.endTime === '00:00' ? '24:00' : time2.endTime,
        )
        // 检查是否有冲突
        if (startTime1 <= endTime2 && endTime1 >= startTime2) {
          // 存在冲突
          if (startTime1 > startTime2) {
            time1.startTime = time2.startTime
          }

          if (endTime1 < endTime2) {
            time1.endTime = time2.endTime
          }
          scheduleParams.value.times.splice(index2, 1)
        }
      }
    })
  })
}

type ChangeWeek = {
  weeks: number[]
  times: Time[]
}

function convertTimeToMinutes(timeStr: string) {
  const [hours, minutes] = timeStr.split(':')

  return parseInt(hours) * 60 + parseInt(minutes)
}
const cancel = () => {
  // 执行取消操作
  // 可以根据需要触发事件或执行其他逻辑
  handleClose()
}

type Week = {
  week: number
  weekName: String
}

type Time = {
  startTime: String
  endTime: String
}
const weekLists = ref<Week[]>([
  { week: 1, weekName: '星期一' },
  { week: 2, weekName: '星期二' },
  { week: 3, weekName: '星期三' },
  { week: 4, weekName: '星期四' },
  { week: 5, weekName: '星期五' },
  { week: 6, weekName: '星期六' },
  { week: 0, weekName: '星期日' },
])

const checkAll = ref(true)
const isIndeterminate = ref(false)

type ScheduleParams = {
  weeks: number[]
  times: TimePeriods
}

const scheduleParams = ref<ScheduleParams>({
  weeks: [],
  times: [{ startTime: '', endTime: '' }],
})

const handleCheckAllChange = (val: boolean) => {
  scheduleParams.value.weeks = val
    ? weekLists.value.map((item) => item.week)
    : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: number[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === weekLists.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < weekLists.value.length
}

const handleWeekChange = (value: number[], timePeriods: TimePeriods) => {
  scheduleParams.value.weeks = value
  handleCheckedCitiesChange(scheduleParams.value.weeks)
  scheduleParams.value.times = [{ startTime: '', endTime: '' }]
  if (timePeriods.length === 0) {
    radio.value = 1
  } else if (
    timePeriods.length === 1 &&
    timePeriods[0].startTime === '00:00' &&
    timePeriods[0].endTime === '00:00'
  ) {
    radio.value = 2
  } else {
    scheduleParams.value.times = JSON.parse(JSON.stringify(timePeriods))
    radio.value = 3
  }
  nextTick(() => {
    formRef.value.clearValidate('times')
  })
}

defineExpose({
  handleWeekChange,
})

function addTime() {
  scheduleParams.value.times.push({ startTime: '', endTime: '' })
}

function deleteTime(i: number) {
  scheduleParams.value.times.splice(i, 1)
}

const radio = ref(3)

let formRef = ref<any>()

let rules1 = {
  weeks: [{ required: true, message: '請選澤星期', trigger: 'change' }],
}

let rules3 = {
  weeks: [{ required: true, message: 'weeks不能為空', trigger: 'change' }],
  times: [{ required: true, message: 'times不能為空', trigger: 'change' }],
  'times.0.startTime': [
    { required: true, message: '請輸入營業開始時間', trigger: 'change' },
  ],
  'times.1.startTime': [
    { required: true, message: '請輸入營業開始時間', trigger: 'change' },
  ],
  'times.2.startTime': [
    { required: true, message: '請輸入營業開始時間', trigger: 'change' },
  ],
  'times.0.endTime': [
    { required: true, message: '請輸入營業結束時間', trigger: 'change' },
  ],
  'times.1.endTime': [
    { required: true, message: '請輸入營業結束時間', trigger: 'change' },
  ],
  'times.2.endTime': [
    { required: true, message: '請輸入營業結束時間', trigger: 'change' },
  ],
}

const radioChange = () => {
  nextTick(() => {
    formRef.value.clearValidate('times')
    formRef.value.clearValidate('times.0.startTime')
    formRef.value.clearValidate('times.1.startTime')
    formRef.value.clearValidate('times.2.startTime')
    formRef.value.clearValidate('times.0.endTime')
    formRef.value.clearValidate('times.1.endTime')
    formRef.value.clearValidate('times.2.endTime')
  })
}
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="props.scheduleSetModal"
      title="設定營業時間"
      :before-close="handleClose"
      class="test1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <el-form
            :model="scheduleParams"
            :rules="radio === 3 ? rules3 : rules1"
            ref="formRef"
          >
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              每天
            </el-checkbox>

            <el-form-item prop="weeks">
              <el-checkbox-group
                v-model="scheduleParams.weeks"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="week in weekLists"
                  :key="week.week"
                  :label="week.week"
                >
                  {{ week.weekName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-radio-group v-model="radio" @change="radioChange">
              <el-radio :label="1">非營業日</el-radio>
              <el-radio :label="2">24小時營業</el-radio>
              <el-radio :label="3">選擇營業時間</el-radio>
            </el-radio-group>

            <el-form-item prop="times">
              <div class="chooseTime" :class="{ allowed: radio !== 3 }">
                <div
                  class="set-time demo-time-range"
                  :class="{ allowed: radio !== 3 }"
                  v-for="(time, index) in scheduleParams.times"
                >
                  <el-form-item :prop="'times.' + index + '.startTime'">
                    <el-time-select
                      v-model="time.startTime"
                      :max-time="
                        time.endTime === '00:00' ? '23:59' : time.endTime
                      "
                      class="mr-4"
                      placeholder="Start time"
                      start="00:00"
                      step="00:10"
                      end="23:50"
                      :disabled="radio !== 3"
                      :clearable="false"
                    />
                  </el-form-item>
                  <span>～</span>

                  <el-form-item :prop="'times.' + index + '.endTime'">
                    <el-time-select
                      v-model="time.endTime"
                      :min-time="time.startTime"
                      placeholder="End time"
                      start="00:10"
                      step="00:10"
                      end="24:00"
                      :disabled="radio !== 3"
                      :clearable="false"
                    />
                  </el-form-item>
                  <el-button
                    class="button-icon"
                    type="primary"
                    :icon="Delete"
                    circle
                    plain
                    @click="deleteTime(index)"
                    :disabled="radio !== 3"
                    v-if="scheduleParams.times.length > 1"
                  />
                </div>
                <el-button
                  class="button-icon"
                  type="primary"
                  :icon="Plus"
                  circle
                  plain
                  @click="addTime"
                  v-if="scheduleParams.times.length < 3"
                  :disabled="radio !== 3"
                />
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="btn btn-primary"
            @click="cancel()"
            type="primary"
            round
            plain
          >
            取消
          </el-button>

          <el-button
            class="btn btn-primary"
            @click="confirm()"
            type="primary"
            round
            plain
          >
            設定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.modal-dialog {
  // margin-bottom: 0px;
  .modal-content {
    .el-checkbox-group {
      margin-right: none;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      .el-checkbox {
        display: flex;
        width: 100%;
        margin: 10px;
        align-items: center;
        justify-content: center;
      }
    }

    .el-radio-group {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // margin-right:none;
      // margin: 10px;
      .el-radio {
        width: 100%;
        display: flex;
        align-items: center;
        margin-right: none;
        margin: 5px 0;
      }
    }
    .chooseTime {
      border: 1px;
      border-color: red;
      border: 1px solid $color;
      padding: 5px 5px 5px 10px;

      .set-time {
        display: grid;
        grid-template-columns: 3fr auto 3fr auto;
        grid-column-gap: 5px;
        align-items: center;
        justify-content: center;
        padding: 0 5px;
        margin: 5px 0;
        ::v-deep .el-select {
          .select-trigger {
            margin: 0px;
            border-radius: 30px;

            .el-input {
              border-radius: 30px;
              .el-input__wrapper {
                border: none;
                box-shadow: none;
                border: 1px solid $color;
              }

              .el-input__wrapper:active {
                border: none;
                box-shadow: none;
              }
            }
          }
        }
      }
      span {
        margin: 10px;
      }
      .buy-svg-icon {
        margin: 10px;
      }
      .button-icon {
        margin: 10px;
      }
    }
    .allowed {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .allowed {
      opacity: 0.5;
      cursor: not-allowed;
      .el-input__wrapper:hover {
        box-shadow: 0 0 0 0px $color-skin;
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
      span:active {
        color: $color;
        cursor: pointer;
      }
    }
  }
}
.el-dialog__footer {
  .dialog-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-button {
      margin-right: 20px;
      ::v-deep span {
        font-size: 16px;
        margin: 10px;
      }
    }
  }
}
</style>
