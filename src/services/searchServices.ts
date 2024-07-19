import { axiosBase } from "@/config/axiosBase"
import { Search as searchTypes } from '@/types/search';

export const searchServices = {
  async getSearch(search:string,startIndex:number,page:number) {
    return (await axiosBase.get<searchTypes>(`&q=${search}&startIndex=${startIndex}&page=${page}`)).data
  }
}
