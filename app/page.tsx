import { Container, Title, Categories, SortPopup, TopBar, Filters } from "@/components/shared";
import { ProductGroupList } from "@/components/shared/products-group-list";

export default function Page() {
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
            <ProductGroupList title={"Пиццы"} items={[
              {
                id: 1,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
              {
                id: 2,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
              {
                id: 3,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
            ]} categoryId={1} />
            <ProductGroupList title={"Комбо"} items={[
              {
                id: 1,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
              {
                id: 2,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
              {
                id: 3,
                name: "Пепперони Фреш с перцем",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/019c4195175d723ca1d2379f461a8f25.avif",
                price: 415,
                items: [{ price: 415 }]
              },
            ]} categoryId={2} />
          </div>
        </div>
      </div>
    </Container>
  </>
}
