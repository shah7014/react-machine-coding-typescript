import { TProduct } from "../../types/Product";
import {
  ProductState,
  SET_ALL_PRODUCTS,
  SET_ERROR_MSG,
  SET_PRODUCT_STATE,
  TProductAction,
} from "../actions/product/actionTypes";

type TInitialState = {
  products: TProduct[];
  productState: ProductState;
  error: string;
};

const initialState: TInitialState = {
  products: [],
  productState: ProductState.IDLE,
  error: "",
};

const productReducer = (state = initialState, action: TProductAction) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case SET_PRODUCT_STATE: {
      return {
        ...state,
        productState: action.payload,
      };
    }
    case SET_ERROR_MSG: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
