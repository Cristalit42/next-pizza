'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  items: { text: string, value: number, disabled?: boolean }[];
  selected: string;
  onClick: (value: string) => void;
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none', className)}>
      {/* Выбранный вариант */}
      <button
        type="button"
        className="flex items-center justify-center flex-1 h-[30px] px-5 rounded-3xl text-sm transition-all duration-300 bg-white shadow"
      >
        Маленькая
      </button>

      {/* Обычный вариант */}
      <button
        type="button"
        className="flex items-center justify-center flex-1 h-[30px] px-5 rounded-3xl text-sm transition-all duration-300 hover:bg-white/60"
      >
        Средняя
      </button>

      {/* Отключённый вариант */}
      <button
        type="button"
        disabled
        className="flex items-center justify-center flex-1 h-[30px] px-5 rounded-3xl text-sm transition-all duration-300 text-gray-400 cursor-not-allowed"
      >
        Большая
      </button>
    </div>
  );
};
