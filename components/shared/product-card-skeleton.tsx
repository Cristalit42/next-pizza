import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui";

interface Props {
  className?: string;
}

export const ProductCardSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {/* Картинка */}
      <Skeleton className="h-[260px] w-full rounded-lg" />

      {/* Название */}
      <Skeleton className="mt-3 mb-1 h-7 w-3/4" />

      {/* Описание (две строки) */}
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />

      {/* Цена и кнопка */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-7 w-[90px]" />
        <Skeleton className="h-10 w-[120px] rounded-md" />
      </div>
    </div>
  );
};
