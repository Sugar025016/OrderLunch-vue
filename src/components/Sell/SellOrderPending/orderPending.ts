import { OrderDetail } from '@/api/order/type'

export interface GroupedData {
  productId: number
  productName: string
  productTotalQty: number
  item: OrderDetail[]
}
