'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui";

interface Props {
  className?: string;
}

export const ChooseProductModalSkeleton: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className={cn('w-[1060px] max-w-[1060px] sm:max-w-[1060px] min-h-[500px] p-0 overflow-hidden', className)}>
        {/* Заголовок для скринридеров, на экране не виден */}
        <DialogTitle className="sr-only">Загрузка товара</DialogTitle>

        <div className="flex">
          {/* Левая колонка: картинка */}
          <div className="flex flex-1 items-center justify-center p-10">
            <Skeleton className="h-[350px] w-[350px] rounded-full" />
          </div>

          {/* Правая колонка: информация и выбор */}
          <div className="flex w-[490px] flex-col bg-[#F7F6F5] p-7">
            {/* Название */}
            <Skeleton className="mb-2 h-8 w-3/4" />

            {/* Состав */}
            <Skeleton className="mb-1 h-4 w-full" />
            <Skeleton className="mb-6 h-4 w-2/3" />

            {/* Переключатели размера и теста */}
            <Skeleton className="mb-3 h-[38px] w-full rounded-3xl" />
            <Skeleton className="mb-6 h-[38px] w-full rounded-3xl" />

            {/* Добавки */}
            <Skeleton className="mb-3 h-5 w-[140px]" />
            <div className="mb-6 grid grid-cols-3 gap-3">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-[110px] rounded-md" />
              ))}
            </div>

            {/* Кнопка */}
            <Skeleton className="mt-auto h-[55px] w-full rounded-[18px]" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
