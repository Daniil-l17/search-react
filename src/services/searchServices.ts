import { axiosBase } from "@/config/axiosBase"
import { Search as searchTypes } from '@/types/search';

export const searchServices = {
  async getSearch(search:string,startIndex:number) {
    return (await axiosBase.get<searchTypes>(`&q=${search}&start=${startIndex}`)).data
  }
}
