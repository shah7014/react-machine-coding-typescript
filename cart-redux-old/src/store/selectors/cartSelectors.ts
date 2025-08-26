import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import PRODUCTS from "../../data/products.json";
import { getAllProducts } from "./productSelector";

export const isItemInCart = (productId: number) => (state: RootState) => {
  return Boolean(state.cart.cart[productId]);
};

export const getItemQuantity = (productId: number) => (state: RootState) => {
  return Number(state.cart.cart[productId] || 0);
};

export const getAllCartItems = (state: RootState) => state.cart.cart;

export const getAllCartItemsWithProductsInfo = createSelector(
  [getAllCartItems, getAllProducts],
  (cart, products) => {
    return Object.entries(cart).map(([pid, quantity]) => {
      const product = products.find((p) => p.id === Number(pid));
      if (!product) {
        throw new Error("Product Not Found");
      }
      return { ...product, quantity };
    });
  }
);

export const getCartAmount = createSelector(getAllCartItems, (allCartItems) => {
  return Object.keys(allCartItems)
    .map(Number)
    .reduce((acc, currVal) => {
      const product = PRODUCTS.find((p) => p.id === currVal);
      const price = product ? product.price : 0;
      acc = acc + price * allCartItems[currVal];
      return acc;
    }, 0);
});
