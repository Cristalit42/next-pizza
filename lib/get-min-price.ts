export function getMinPrice(product: { productItems: { price: number }[] }) {
  return Math.min(...product.productItems.map((productItem: { price: number }) => productItem.price))
} 