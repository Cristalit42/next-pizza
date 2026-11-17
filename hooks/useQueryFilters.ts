import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useFilters } from "./useFilters";


export const useQueryFilters = (params: ReturnType<typeof useFilters>) => {

  const searchParams = useSearchParams();

  const router = useRouter();

  React.useEffect(() => {
    const filters = {
      ...params.prices,
      pizzaTypes: Array.from(params.pizzaTypes),
      sizes: Array.from(params.sizes),
      ingredients: Array.from(params.selectedIngredients),
      sortBy: searchParams.get('sortBy') || undefined,
    };

    const query = qs.stringify(filters, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [params.sizes, params.pizzaTypes, params.prices, params.selectedIngredients, router]);
}