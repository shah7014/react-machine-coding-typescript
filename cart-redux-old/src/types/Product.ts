export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  priceDenomination?: TCurrency;
};

export enum TCurrency {
  DOLLAR = "$",
}
