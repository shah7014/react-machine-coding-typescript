import { Currency, Product } from "../types/Product";

export function getAsDisplayProducts(product: Product): Product {
  const sp = product.price - (product.price * product.discountPercentage) / 100;
  const sellingPrice = Number(sp.toFixed(2));
  return {
    ...product,
    sellingPrice,
    displayImg: product.images[0],
    currency: product.currency || Currency.DOLLAR,
  };
}
