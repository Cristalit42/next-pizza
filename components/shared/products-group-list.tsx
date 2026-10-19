'use client';

import React from "react";
import { useIntersection } from 'react-use';

import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";

interface Props {
  title: string;
  productItems: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  productItems,
  className,
  listClassName,
  categoryId
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLDivElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.5
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title])

  return (productItems.length !== 0 &&

    <div className={className} id={title} ref={intersectionRef}>

      <Title text={title} size="md" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {productItems
          .map((products, i) => (
            <ProductCard
              key={i}
              id={products.id}
              name={products.name}
              imageUrl={products.imageUrl}
              price={products.productItems[0].price}
            />
          ))
        }
      </div>
    </div>
  );
};