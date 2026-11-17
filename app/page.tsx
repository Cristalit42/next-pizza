import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/shared";
import { ProductGroupList } from "@/components/shared/products-group-list";
import findPizzas from "@/lib/find-pizzas";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const getSearchParams = (await searchParams);
  const getFilteredItems = await findPizzas(getSearchParams);

  const topBarCategories = getFilteredItems.filter((category) => category.products.length !== 0).map(({ id, name }) => ({ id, name }));

  return <>

    <Container>
      <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />

    </Container>
    <TopBar categories={topBarCategories} />


    <Container className="pb-14 mt-10">
      <div className="flex gap-[60px]">


        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>


        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16 ">
            {
              topBarCategories.length !== 0 ?
                getFilteredItems.map((category) => {
                  return <ProductGroupList key={category.id} title={category.name} products={category.products} categoryId={category.id} />
                }) :
                <div className="flex flex-col items-center justify-center gap-5 mt-20">
                  <p className="text-lg font-bold">К сожалению, по вашему запросу ничего не найдено</p>
                  <a href={'/'} className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">Сбросить фильтр</a>
                </div>
            }
          </div>
        </div>
      </div>
    </Container>
  </>
}
