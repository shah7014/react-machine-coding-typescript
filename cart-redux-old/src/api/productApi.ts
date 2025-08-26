import PRODUCTS from "../data/products.json";
import { TProduct } from "../types/Product";

export const getAllProductsFromApi = (): Promise<TProduct[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(PRODUCTS), 2000);
  });
};
