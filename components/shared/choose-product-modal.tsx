'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  product: { name: string, imageUrl: string };
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className={cn(' w-[1060px] max-w-[1060px] sm:max-w-[1060px] min-h-[500px] p-0 overflow-hidden ', className)}>
        <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
        <DialogTitle>{product.name}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};