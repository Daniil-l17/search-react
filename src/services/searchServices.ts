import { axiosBase } from "@/config/axiosBase"
import { Search as searchTypes } from '@/types/search';
import { SearchImages } from "@/types/searchImage";

export const searchServices = {
  async getSearch(search:string,startIndex:number) {
    return (await axiosBase.get<searchTypes>(`&q=${search}&start=${startIndex}`)).data
  },
  async getSearchImage(search:string,startIndex:number) {
    return (await axiosBase.get<SearchImages>(`&q=${search}&start=${startIndex}&searchType=image`)).data
  },
}
