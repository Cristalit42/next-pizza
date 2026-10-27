import { getMinPrice } from "./get-min-price";
import { prisma } from "./prisma"

export default async function findPizzas(searchParams: { [key: string]: string | undefined }) {

  const sizesArr = searchParams.sizes ? searchParams.sizes.split(',').map((item) => Number(item)) : undefined
  const pizzaTypesArr = searchParams.pizzaTypes ? searchParams.pizzaTypes.split(',').map((item) => Number(item)) : undefined
  const ingredientsArr = searchParams.ingredients ? searchParams.ingredients.split(',').map((item) => Number(item)) : undefined
  const priceFrom = Number(searchParams.priceFrom) || 0;
  const priceTo = Number(searchParams.priceTo) || 1000;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        where: {
          ingredients: {
            some: ingredientsArr ? { id: { in: ingredientsArr }, } : undefined
          },
          productItems: {
            some: {
              size: { in: sizesArr },
              pizzaType: { in: pizzaTypesArr },
              price: { gte: priceFrom, lte: priceTo },
            },
          },
        },
        include: { ingredients: true, productItems: true }
      }
    }
  })

  switch (searchParams.sortBy) {
    case 'price_asc':
      categories.forEach((category) => {
        category.products.sort((a, b) => (getMinPrice(a) - getMinPrice(b)))
      })
      break;
    case 'price_desc':
      categories.forEach((category) => {
        category.products.sort((a, b) => (getMinPrice(b) - getMinPrice(a)))
      })
      break;

  }

  return categories
}

