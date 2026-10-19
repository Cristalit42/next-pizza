import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/shared";
import { ProductGroupList } from "@/components/shared/products-group-list";
import findPizzas from "@/lib/find-pizzas";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const getSearchParams = (await searchParams);

  const getFilteredItems = await findPizzas(getSearchParams)

  return <>

    <Container>
      <Title text="Все пиццы" size="lg" className="font-extrabold mt-10" />

    </Container>
    <TopBar />


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
              getFilteredItems.map((category) => {
                return <ProductGroupList key={category.id} title={category.name} productItems={category.products} categoryId={category.id} />
              })
            }
          </div>
        </div>
      </div>
    </Container>
  </>
}
