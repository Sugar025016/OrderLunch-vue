import { ref } from 'vue'
import { TabData } from '@/api/tab/type'

export const tapProduct = ref<TabData>({
  id: 0,
  name: '',
  shelve: false,
  products: [],
})
