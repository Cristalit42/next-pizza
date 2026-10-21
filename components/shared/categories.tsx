'use client';

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

interface Props {
  className?: string;
  categories: { id: number, name: string }[];
}

export const Categories: React.FC<Props> = ({ className, categories }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
        categories.map(({ name, id }) => (
          <a className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
          )} key={id}
            href={`/#${name}`}
          >
            <div>{name}</div>
          </a>
        ))
      }
    </div>
  );
};