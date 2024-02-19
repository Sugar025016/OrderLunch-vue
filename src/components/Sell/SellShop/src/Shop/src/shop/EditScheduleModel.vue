<script setup lang="ts">
import { ref, defineProps, onMounted, computed, watchEffect } from 'vue'

import { PutSchedule, Schedule, Schedules, TimePeriods } from '@/api/shop/type'

import ScheduleSetModal from '../scheduleSetModal/index.vue'

import useSellShopStore from '@/store/modules/sellShop'

let sellShopStore = useSellShopStore()
// const props = defineProps({
//   product: Object as () => ProductModalData,
// })」defineEmit」
// 定義需要的 props
const props = defineProps({
  scheduleVisible: Boolean,
  title: String,
  message: String,
  schedules: Object as () => Schedules,
  onClose: Function,
})
// const schedulesChange = ref<Schedules>([])
let schedulesChange = ref<Schedules>([])
// let schedulesChange = ref<Schedules>([])

const setting = () => {
  schedulesChange.value = JSON.parse(
    JSON.stringify(sellShopStore.shop.schedules),
  )
}
watchEffect(() => {
  if (sellShopStore.shop.schedules) {
    setting()
  }
})

type ScheduleParams = {
  weeks: number[]
  times: TimePeriods
}
const receivedData = ref<ScheduleParams>({
  weeks: [],
  times: [{ startTime: '', endTime: '' }],
})

const handleChangeEvent = (data: ScheduleParams) => {
  receivedData.value = data

  receivedData.value.weeks.forEach((v) => {
    schedulesChange.value[v].timePeriods = receivedData.value.times
  })
}

const deleteTimePeriods = (i: number) => {
  if (sellShopStore.shop.schedules !== undefined) {
    schedulesChange.value[i].timePeriods = JSON.parse(
      JSON.stringify(sellShopStore.shop.schedules[i].timePeriods),
    )
  } else {
    schedulesChange.value[i].timePeriods = []
  }
}


const visible = ref(props.scheduleVisible)

const $emit = defineEmits(['update:scheduleVisible'])

const handleClose = () => {
  $emit('update:scheduleVisible', (visible.value = false))
}

const childRef = ref<typeof ScheduleSetModal | null>(null)
const checkedWeeks = ref<number[]>([])
const timePeriods = ref<TimePeriods[]>([])
const triggerChildEvent = (schedule: Schedule) => {
  if (childRef.value) {
    checkedWeeks.value = []
    checkedWeeks.value.push(schedule.week)
    timePeriods.value.push(schedule.timePeriods)
    childRef.value?.handleWeekChange(checkedWeeks.value, schedule.timePeriods) // 调用子组件的方法

    scheduleSetModal.value = true
  }
}

const weeksChildEvent = () => {
  if (childRef.value) {
    checkedWeeks.value = [1, 2, 3, 4, 5, 6, 0]
    scheduleSetModal.value = true
    childRef.value?.handleWeekChange(checkedWeeks.value, timePeriods.value) // 调用子组件的方法
  }
}

const confirm = async () => {
  let changeData: Schedules = []
  await sellShopStore.shop.schedules?.forEach((v, i) => {
    if (
      JSON.stringify(schedulesChange.value[i].timePeriods) !=
      JSON.stringify(v.timePeriods)
    ) {
      changeData.push(schedulesChange.value[i])
    }
  })

  handleClose()
  if (changeData.length > 0) {
    const putSchedule = ref<PutSchedule>({
      type: 0,
      schedules: changeData,
    })
    let res = await reqPutSchedule(
      sellShopStore.shopId as number,
      putSchedule.value,
    )
    if (res.data) {
      await sellShopStore.getSellShop(sellShopStore.shopId)
    }
  }
}

const cancel = () => {
  handleClose()
}

const scheduleSetModal = ref(false)

import { deleteSecond } from '@/utils/time'
import { reqPutSchedule } from '@/api/shop'
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="props.scheduleVisible"
      title="營業時間"
      :before-close="handleClose"
      class="test1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="schedule item">
              <div
                v-for="(schedulePeriods, index) in sellShopStore.shop.schedules"
                class="week"
              >
                <span v-if="schedulePeriods.week === 0">星期日：</span>
                <span v-else-if="schedulePeriods.week === 1">星期一：</span>
                <span v-else-if="schedulePeriods.week === 2">星期二：</span>
                <span v-else-if="schedulePeriods.week === 3">星期三：</span>
                <span v-else-if="schedulePeriods.week === 4">星期四：</span>
                <span v-else-if="schedulePeriods.week === 5">星期五：</span>
                <span v-else-if="schedulePeriods.week === 6">星期六：</span>
                <div>
                  <div class="schedule-time">
                    <div
                      :class="{
                        'delete-span':
                          JSON.stringify(schedulesChange[index].timePeriods) !=
                          JSON.stringify(schedulePeriods.timePeriods),
                      }"
                    >
                      <component
                        v-if="schedulePeriods.timePeriods.length > 0"
                        v-for="(
                          schedulePeriod, i
                        ) in schedulePeriods.timePeriods"
                      >
                        <!-- {{
                          JSON.stringify(schedulesChange[index].timePeriods) ==
                          JSON.stringify(schedulePeriods.timePeriods)
                        }} -->
                        <span v-if="i > 0">,</span>
                        <span class="time">
                          {{ deleteSecond(schedulePeriod.startTime) }}~{{
                            deleteSecond(
                              schedulePeriod.endTime === '00:00'
                                ? '24:00'
                                : schedulePeriod.endTime,
                            )
                          }}
                          <!-- {{ schedulesChange[index].timePeriods[i].startTime }}~{{ schedulesChange[index].timePeriods[i].endTime }} -->
                        </span>
                      </component>
                      <span v-else>非營業日</span>
                    </div>
                    <span
                      class="change"
                      @click="triggerChildEvent(schedulePeriods)"
                    >
                      編輯
                    </span>
                  </div>
                  <div
                    v-if="
                      JSON.stringify(schedulesChange[index].timePeriods) !=
                      JSON.stringify(schedulePeriods.timePeriods)
                    "
                  >
                    <component
                      v-if="schedulesChange[index].timePeriods.length > 0"
                      v-for="(scheduleChange, i) in schedulesChange[index]
                        .timePeriods"
                    >
                      <span v-if="i > 0">,</span>
                      <span class="time">
                        {{ deleteSecond(scheduleChange.startTime) }}~{{
                          deleteSecond(scheduleChange.endTime)
                        }}
                      </span>
                    </component>

                    <span v-else>非營業日</span>
                    <span
                      v-if="schedulesChange[index].timePeriods.length > 0"
                      class="change"
                      @click="deleteTimePeriods(index)"
                    >
                      刪除
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="body-footer">
              <span @click="weeksChildEvent()">編輯營業時間星期一 ～ 日</span>
              <!-- <span>編輯特定日期</span> -->
            </div>
          </div>

          <!-- <div class="modal-footer">
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
              設定1
            </el-button>
          </div> -->
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel()" round>取消</el-button>
          <el-button type="primary" @click="confirm()" round>確認</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <ScheduleSetModal
    v-model:scheduleSetModal="scheduleSetModal"
    ref="childRef"
    @change-event="handleChangeEvent"
  />
</template>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: 20px;
    width: 500px;
    .el-dialog__header {
      margin: 0px;
      border-bottom: 1px;
      border-style: solid;
      border-color: rgb(155, 155, 155);
      padding: 20px 20px 15px 20px;
      span {
        font-size: 24px;
      }
    }
    .modal-content {
      .modal-header {
        border-bottom: 2px;
        border-style: solid;
        border-color: rgb(155, 155, 155);
        button {
          margin: 10px;
        }
      }
      .modal-body {

        .item {
          .title {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-weight: 900;
            .el-icon {
              margin-right: 2px;
            }
          }
          .week {
            display: flex;
            align-items: center;
            font-size: 18px;
            margin: 15px 20px;
            span {
              margin: 0 2px;
              font-size: 16px;
            }

            .change {
              font-size: 14px;
              margin: 5px;
            }

            .delete-span {
              text-decoration: line-through;
            }
            .schedule-time {
              display: flex;
              align-items: center;
            }
          }
        }
        .shop-name {
          .title {
            font-size: 36px;
            font-weight: 100;
          }
        }
        .body-footer {
          display: flex;
          font-size: 16px;
          justify-content: space-around;
          align-items: center;
          color: $color;
          margin: 30px 0 10px 0;
          span {
            margin: 0 20px;
          }
          span:hover {
            color: $color;
            cursor: pointer;
          }

          span:active {
            color: $color-skin;
            cursor: pointer;
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

        .btn-primary:active {
          ::v-deep span:active {
            color: rgb(255, 255, 255);
          }
        }
      }
    }
  }

  .dialog-footer {
    // button:first-child {
    //   margin-right: 10px;
    // }

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
