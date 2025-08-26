import { TProduct } from "../../../types/Product";

export const SET_ALL_PRODUCTS = "SET_ALL_PRODUCTS";
export const SET_PRODUCT_STATE = "SET_PRODUCT_STATE";
export const SET_ERROR_MSG = "SET_ERROR_MSG";

export enum ProductState {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  IDLE = "IDLE",
}

type TSetAllProductsAction = {
  type: typeof SET_ALL_PRODUCTS;
  payload: TProduct[];
};

type TSetProductState = {
  type: typeof SET_PRODUCT_STATE;
  payload: ProductState;
};

type TSetErrorMessage = {
  type: typeof SET_ERROR_MSG;
  payload: string;
};

export type TProductAction =
  | TSetAllProductsAction
  | TSetProductState
  | TSetErrorMessage;
