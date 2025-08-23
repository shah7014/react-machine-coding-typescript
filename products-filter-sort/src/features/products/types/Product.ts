export enum Currency {
  DOLLAR = "$",
  RUPEES = "₹",
}

export type Product = {
  id: number;
  title: string;
  displayImg: string;
  images: string[];
  category: string;
  tags: string[];
  price: number;
  discountPercentage: number;
  sellingPrice?: number;
  brand: string;
  rating: number;
  currency?: Currency;
};

export type ProductResponse = {
  products: Product[];
};

export type Filter = {
  category: string;
  title: string;
  price: { min: number; max: number };
};

export type FilterKeys = keyof Filter;

export type SortKey = "price" | "title" | "rating";

export type SortDir = "asc" | "desc";
