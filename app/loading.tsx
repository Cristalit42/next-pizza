import { Container, ProductCardSkeleton } from "@/components/shared";
import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <>
      {/* Заголовок «Все пиццы» */}
      <Container>
        <Skeleton className="mt-10 h-10 w-[220px]" />
      </Container>

      {/* Полоса категорий и сортировки (как TopBar) */}
      <div className="py-5 shadow-lg shadow-black/5">
        <Container className="flex items-center justify-between">
          <Skeleton className="h-[52px] w-[600px] rounded-2xl" />
          <Skeleton className="h-[52px] w-[260px] rounded-2xl" />
        </Container>
      </div>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтры */}
          <div className="w-[250px]">
            <Skeleton className="mb-5 h-7 w-[140px]" />

            {[3, 4].map((count, group) => (
              <div key={group} className="mb-5">
                <Skeleton className="mb-3 h-5 w-[110px]" />
                {Array(count).fill(0).map((_, index) => (
                  <Skeleton key={index} className="mb-4 h-6 rounded-[8px]" />
                ))}
              </div>
            ))}

            <Skeleton className="mt-5 h-[120px] w-full rounded-lg" />
          </div>

          {/* Товары */}
          <div className="flex-1">
            <Skeleton className="mb-5 h-8 w-[160px]" />
            <div className="grid grid-cols-3 gap-[50px]">
              {Array(6).fill(0).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
