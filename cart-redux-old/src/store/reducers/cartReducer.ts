import { TCartAction } from "../actions/cart/actions";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
} from "../actions/cart/actionTypes";

type TInititialState = {
  cart: Record<number, number>;
};

const initialState: TInititialState = {
  cart: {},
};

const cartReducer = (state = initialState, action: TCartAction) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const isItemPresent = Boolean(state.cart[action.payload]);
      if (isItemPresent) {
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload]: state.cart[action.payload] + 1,
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload]: 1,
          },
        };
      }
    }

    // {cart: {10: 2, 20: 1, 30: 4}}
    case REMOVE_FROM_CART: {
      if (state.cart[action.payload] === 1) {
        return {
          ...state,
          cart: Object.keys(state.cart)
            .map(Number)
            .filter((key) => key !== action.payload)
            .reduce<Record<number, number>>((acc, currVal) => {
              acc[currVal] = state.cart[currVal];
              return acc;
            }, {}),
        };
        // const { [action.payload]: _, ...rest } = state.cart;
        // return { ...state, cart: { ...rest } };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload]: state.cart[action.payload] - 1,
          },
        };
      }
    }

    case CLEAR_CART: {
      return {
        ...state,
        cart: {},
      };
    }

    default: {
      return state;
    }
  }
};

export default cartReducer;
