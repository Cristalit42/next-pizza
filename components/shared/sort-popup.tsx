'use client'

import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Popover } from "../ui";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { sortConstants } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}



export const SortPopup: React.FC<Props> = ({ className }) => {
  const router = useRouter();               // 1
  const searchParams = useSearchParams();   // 2

  const onSelect = (value: string) => {     // 3
    const params = new URLSearchParams(searchParams.toString());  // 4
    params.set('sortBy', value);                                  // 5
    router.push(`?${params.toString()}`, { scroll: false });      // 6
  };

  const sortText = sortConstants.find((item) => item.value === searchParams.get('sortBy'))?.label ?? sortConstants[0].label;

  return (
    <Popover >
      <PopoverTrigger asChild={true}>
        <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
          <ArrowUpDown size={16} />
          <b>Сортировка</b>
          <b className="text-primary">{sortText}</b>
        </div >
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[250px]">
        {
          sortConstants.map((item) => (
            <button key={item.value} onClick={() => onSelect(item.value)} className="text-left">{item.label}</button>
          ))
        }
      </PopoverContent>
    </Popover >
  );
};