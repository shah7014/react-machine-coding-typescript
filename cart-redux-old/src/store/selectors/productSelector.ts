import { RootState } from "..";

export const getProductState = (state: RootState) => state.product.productState;

export const getProductErrorMsg = (state: RootState) => state.product.error;

export const getAllProducts = (state: RootState) => state.product.products;
