import { ChooseProductModal } from "@/components/shared"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = Number(id)
  if (!Number.isInteger(productId)) {
    return notFound()
  }
  const product = await prisma.product.findUnique({
    where: {
      id: productId
    },
    include: { ingredients: true, productItems: true }
  })

  if (!product) {
    return notFound()
  }

  return <>
    <ChooseProductModal product={product} />
  </>
}