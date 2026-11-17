import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";
import React from "react";


interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
  sortBy: string;
}


export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
  );
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : [])
  );


  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })


  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value
    })
  }

  return {
    prices, pizzaTypes, sizes, selectedIngredients, toggleSizes, togglePizzaTypes, toggleIngredients, updatePrice, setPrice
  }

}