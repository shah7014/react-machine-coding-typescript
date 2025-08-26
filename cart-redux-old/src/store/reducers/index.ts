import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

const reducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

export default reducer;
