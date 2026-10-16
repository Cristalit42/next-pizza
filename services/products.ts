import { Product } from "@/app/generated/prisma"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const search = async (query: string): Promise<Product[]> => {

return (await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}})).data;

}