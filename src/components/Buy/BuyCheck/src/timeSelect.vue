<script setup lang="ts">
import { ref, watch } from 'vue'

import { Schedule, Schedules, TimePeriod, TimePeriods } from '@/api/shop/type'

let $emit = defineEmits(['date', 'time'])

type DeliveryTime = {
  date: MyDateDisabled
  time: string
}

const props = defineProps({
  schedules: Object as () => Schedules,
  deliveryTime: Object as () => DeliveryTime,
})

const selectedDate = ref<MyDateDisabled>({
  year: 0,
  month: 0,
  date: 0,
  show: '',
  week: 0,
  disabled: false,
  times: [],
})

// 计算日期选项
const startOptionDay = new Date()
const oneWeekLater = new Date()
oneWeekLater.setDate(startOptionDay.getDate() + 7)

const startGetDate = new Date()
startGetDate.setHours(startGetDate.getHours() + 1, startGetDate.getMinutes())
const today = startGetDate.getTime()

const availableTimes = (time: number, timePeriods: TimePeriods) => {
  const times: string[] = []

  timePeriods?.forEach((v: TimePeriod) => {
    const [startHours, startMinutes] = v.startTime.split(':').map(Number)

    if (v.endTime === '00:00') {
      v.endTime = '24:00'
    }
    const [endHours, endMinutes] = v.endTime.split(':').map(Number)

    const startTime1 = new Date()
    const endTime1 = new Date()

    //設定當天可訂購時間
    if (today >= time) {
      const nowTime = new Date()
      const nowHours = nowTime.getHours() + 1
      const nowMinutes = Math.ceil(nowTime.getMinutes() / 10) * 10
      const startMinutesAll = startHours * 60 + startMinutes
      const endMinutesAll = endHours * 60 + endMinutes
      const nowMinutesAll = nowHours * 60 + nowMinutes
      if (nowMinutesAll <= startMinutesAll) {
        startTime1.setHours(startHours, startMinutes, 0, 0)
        endTime1.setHours(endHours, endMinutes, 0, 0)
      } else if (nowMinutesAll <= endMinutesAll) {
        startTime1.setHours(nowHours, nowMinutes, 0, 0)
        endTime1.setHours(endHours, endMinutes, 0, 0)
      } else {
        startTime1.setHours(24, 0, 0, 0)
        endTime1.setHours(23, 0, 0, 0)
      }
    } else {
      startTime1.setHours(startHours, startMinutes, 0, 0)
      endTime1.setHours(endHours, endMinutes, 0, 0)
    }
    const interval = 10 * 60 * 1000 // 10分
    let currentTime1 = startTime1.getTime()
    while (currentTime1 <= endTime1.getTime()) {
      const time = new Date(currentTime1)
      times.push(formatTime(time))
      currentTime1 += interval
    }

    if (times.includes('00:00') && v.endTime.includes('00:00')) {
      const index = times.indexOf('00:00')
      times[index] = '24:00'
    }
  })
  return times.filter((item) => item !== '00:00').sort()
}
// 辅助函数，将时间格式化为HH:mm字符串
function formatTime(time: Date) {
  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

type MyDateDisabled = {
  year: number
  month: number
  date: number
  show: string
  week: number
  disabled: boolean
  times: string[]
}
let dateOptions = ref<MyDateDisabled[]>([])

const deliveryTime = ref<DeliveryTime>({
  date: {
    year: 0,
    month: 0,
    date: 0,
    show: '',
    week: 0,
    disabled: false,
    times: [],
  },
  time: '',
})

const setOptionDate = async () => {
  while (startOptionDay <= oneWeekLater) {
    let schedule = (props.schedules as Schedules).find(
      (v) => v.week === startOptionDay.getDay(),
    ) as Schedule
    let timePeriods = schedule?.timePeriods as TimePeriods

    const times: string[] = availableTimes(
      startOptionDay.getTime(),
      timePeriods,
    )
    const disabled: boolean = !(timePeriods?.length > 0 && times.length > 0)
    const show: string =
      startOptionDay.getFullYear() +
      ' - ' +
      (startOptionDay.getMonth() + 1) +
      ' - ' +
      startOptionDay.getDate() +
      (disabled ? ' 休息' : '')
    const dateData = ref<MyDateDisabled>({
      year: startOptionDay.getFullYear(),
      month: startOptionDay.getMonth() + 1,
      date: startOptionDay.getDate(),
      show: show,
      week: schedule.week,
      disabled: disabled,
      times: times,
    })

    dateOptions.value.push(dateData.value)
    startOptionDay.setDate(startOptionDay.getDate() + 1)
  }

  //   if (deliveryTime.value && dateOptions.value) {
  //   deliveryTime.value?.date = dateOptions.value.find(
  //     (v) => !v.disabled,
  //   ) as MyDateDisabled
  // }
  deliveryTime.value.date = dateOptions.value.find(
    (v) => !v.disabled,
  ) as MyDateDisabled

  if (selectedDate.value.date === startGetDate.getDate()) {
    deliveryTime.value.time = selectedDate.value.times[0]
  } else {
    deliveryTime.value.date = dateOptions.value[0]
    deliveryTime.value.time = ''
  }
  setEmit()
}

const validateOptional = (rule: any, value: any, callback: any) => {
  if (value.times.length === 0) {
    callback(new Error('請選擇日期'))
  } else {
    callback()
  }
}

watch(
  () => props.schedules,
  () => {
    setOptionDate()
  },
)
const clearTime = () => {
  deliveryTime.value.time = ''
  setEmit()
}
import moment from 'moment'
const setEmit = () => {
  let setDeliveryTime = new Date()
  setDeliveryTime.setFullYear(deliveryTime.value.date.year)
  setDeliveryTime.setMonth(deliveryTime.value.date.month - 1)
  setDeliveryTime.setDate(deliveryTime.value.date.date)

  const [hours, minutes] = deliveryTime.value.time.split(':').map(Number)
  setDeliveryTime.setHours(hours, minutes, 0, 0)

  // console.log('aaa ISO', setDeliveryTime.toISOString())

  // const parsedDate2 = moment(
  //   setDeliveryTime.toISOString(),
  //   'YYYY/MM/DD a hh:mm:ss',
  // ).format()
  // console.log('------vISO-----', parsedDate2)
  // console.log('------vISO-----', parsedDate2.format('YYYY-MM-DDTHH:mm:ss'))

  // console.log('aaa6', setDeliveryTime.toString())
  // console.log('aaa5', setDeliveryTime.toLocaleString())
  // const momentTime = moment(
  //   setDeliveryTime.toLocaleString(),
  //   'YYYY-MM-DD HH:mm:ss',
  // )
  //   const dateString = '2023/11/7 下午3:30:00';
  // const formatString = 'YYYY-MM-DD"T"HH:mm:ss';
  // const formattedDate = moment(
  //   setDeliveryTime.toLocaleString(),
  //   'YYYY/MM/DD a hh:mm:ss',
  // )

  // console.log("aaa8",formattedDate);
  // console.log("aaa8",momentTime.format('YYYY-MM-DD a HH:mm:ss'))

  // console.log("aaa4", moment(setDeliveryTime.toLocaleString(), 'YYYY/MM/DD a hh:mm:ss').format(formatString))
  // console.log("aaa7",momentTime.format('YYYY-MM-DD a hh:mm:ss'))
  // $emit('deliveryTime', momentTime.format('YYYY-MM-DD T HH:mm:ss'))

  // const dateString = '2023/11/7 下午13:30:00'
  // const formatString = 'YYYY/MM/DD a hh:mm:ss'
  // const parsedDate = moment(dateString, formatString).format('YYYY-MM-DDTHH:mm:ss');
  console.log('-----------', setDeliveryTime.toLocaleString())
  console.log('-----------', setDeliveryTime.toISOString())
  console.log('-----------', setDeliveryTime.toJSON())
  console.log('-----------', setDeliveryTime.toUTCString())
  // const formattedDate = moment(setDeliveryTime.toLocaleString(), 'YYYY/MM/DD a hh:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
  // const formattedDate = moment(setDeliveryTime.toLocaleString(), 'YYYY/MM/DD a hh:mm:ss').format('YYYY-MM-DDTHH:mm:ss');
  // const formattedDate = moment(setDeliveryTime.toLocaleString(), 'YYYY/MM/DD a hh:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  // const formattedDate = moment(setDeliveryTime.toJSON(), 'YYYY/MM/DD a hh:mm:ss', 'Asia/Taipei').utcOffset('+0800').format('YYYY-MM-DDTHH:mm:ss');
  const formattedDate = moment(setDeliveryTime.toISOString()).format(
    'YYYY-MM-DDTHH:mm:ss',
  )
  console.log('-----------', formattedDate)

  $emit('deliveryTime', formattedDate)
}

const selectedTimeRules = {
  date: [
    { required: true, message: '請選擇日期', trigger: 'change' },
    {
      validator: validateOptional,
      trigger: 'blur',
      message: '請選擇日期',
    },
  ],
  time: [{ required: true, message: '請選擇時間', trigger: 'change' }],
}

const formSize = ref('default')

let formRef = ref<any>()

const save = async () => {
  await formRef.value.validate()
}
defineExpose({
  save,
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="deliveryTime"
    :rules="selectedTimeRules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
    label-position="top"
  >
    <el-form-item prop="date">
      <el-select
        v-model="deliveryTime.date"
        placeholder="请选择日期"
        size="large"
        value-key="date"
        :label="selectedDate.show"
        @change="clearTime()"
      >
        <el-option
          v-for="(date, i) in dateOptions"
          :key="i + 1"
          :label="date.show"
          :value="date"
          :disabled="date.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item prop="time">
      <el-select
        v-model="deliveryTime.time"
        placeholder="請選擇時間"
        size="large"
        no-data-text="請先選擇日期"
        @change="setEmit()"
      >
        <el-option
          v-for="time in deliveryTime.date.times"
          :key="time"
          :label="time"
          :value="time"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  display: flex;
  grid-gap: 10px;
  .el-form-item {
    width: 130px;
    margin-bottom: 0px;
  }
  .el-form-item:first-child {
    width: 190px;
  }
}
</style>
