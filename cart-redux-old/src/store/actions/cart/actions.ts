import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./actionTypes";

// action-creators
export const addToCart = (id: number) => {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
};

export const removeFromCart = (id: number) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

// action-type-definitions
type TAddToCartAction = {
  type: typeof ADD_TO_CART;
  payload: number;
};

type TRemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART;
  payload: number;
};

type TClearCartAction = {
  type: typeof CLEAR_CART;
};

export type TCartAction =
  | TAddToCartAction
  | TRemoveFromCartAction
  | TClearCartAction;
