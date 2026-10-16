import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Ingredient } from "@/app/generated/prisma";

export const getAll = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
