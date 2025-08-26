import { AppDispatch } from "../..";
import { getAllProductsFromApi } from "../../../api/productApi";
import { TProduct } from "../../../types/Product";
import {
  ProductState,
  SET_ALL_PRODUCTS,
  SET_ERROR_MSG,
  SET_PRODUCT_STATE,
} from "./actionTypes";

const setProducts = (products: TProduct[]) => {
  return {
    type: SET_ALL_PRODUCTS,
    payload: products,
  };
};

const setProductState = (productState: ProductState) => {
  return {
    type: SET_PRODUCT_STATE,
    payload: productState,
  };
};

const setErrorMsg = (msg: string) => {
  return {
    type: SET_ERROR_MSG,
    payload: msg,
  };
};

export const getAllProductsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setProductState(ProductState.LOADING));
    const products = await getAllProductsFromApi();
    dispatch(setProductState(ProductState.SUCCESS));
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setProductState(ProductState.ERROR));
    dispatch(setErrorMsg("Its Not Working"));
  }
};
