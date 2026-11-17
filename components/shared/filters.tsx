'use client'

import React from "react";
import { Title, RangeSlider, CheckboxFiltersGroup } from "@/components/shared";
import { Input } from "../ui";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useFilters } from "@/hooks/useFilters";
import { useQueryFilters } from "@/hooks/useQueryFilters";

interface Props {
  className?: string;
}



export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients();
  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name, }))

  const filters = useFilters();
  useQueryFilters(filters);
  const { prices, pizzaTypes, sizes, selectedIngredients, toggleSizes, togglePizzaTypes, toggleIngredients, updatePrice, setPrice } = filters

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold"></Title>


      <CheckboxFiltersGroup
        title={"Тип теста"}
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
        name={"pizzaTypes"} />


      <CheckboxFiltersGroup
        title={"Размеры"}
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20cm', value: '20' },
          { text: '30cm', value: '30' },
          { text: '40cm', value: '40' },
        ]}
        name={"sizes"} />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0} max={3000}
            value={String(prices.priceFrom || '0')}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />

          <Input
            type="number"
            min={100}
            max={3000}
            value={String(prices.priceTo || '1000')}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
        />
      </div>


      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={toggleIngredients}
        selected={selectedIngredients}
        name="ingredients"
      />
    </div>
  );
};