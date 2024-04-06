import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

// 使用 VueUse 的 useWindowSize 来获取窗口大小
const { width } = useWindowSize()

// 根据窗口宽度决定是否显示工具栏
 const isBreakpointXS = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 540 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})

const isBreakpointSM = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 720 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})

const isBreakpointMD = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 960 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})
const isBreakpointLG = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 1140 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})
const isBreakpointXL = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 1320 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})
const isBreakpointXXL = computed(() => {
    // 这里可以根据实际情况调整断点的值
    return width.value >= 1500 // 例如，当窗口宽度大于等于 600px 时显示工具栏
})


export {
    isBreakpointXS,
    isBreakpointSM,
    isBreakpointMD,
    isBreakpointLG,
    isBreakpointXL,
    isBreakpointXXL
};