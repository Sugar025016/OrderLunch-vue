import request from '@/utils/request'
import type { PutAddMealsData, AddMealsProductsResponseData } from './type'
enum API {
  AddMeals = '/api/addMeals',
}

export const reqGetAddMealsProducts = (data: number) =>
  request.get<any, AddMealsProductsResponseData>(API.AddMeals + '/' + data)

export const reqDeleteAddMeals = (data: number) =>
  request.delete<any, AddMealsProductsResponseData>(API.AddMeals + '/' + data)


export const reqAddOrUpdateAddMeals = (data: PutAddMealsData, addMealsId: number = 0) => {
  if (addMealsId != 0) {
    return request.put<any, any>(API.AddMeals + '/' + addMealsId, data)
  } else {
    return request.post<any, any>(API.AddMeals, data)
  }
}
