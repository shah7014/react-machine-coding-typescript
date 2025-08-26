import { createContext, useContext, useState } from "react";
import { CartItem } from "../cart/CartItem";
import { Product } from "../products/product";

type ShoppingCartContextType = {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  isProductInCart: (productId: number) => boolean;
  getQuantityForProduct: (productId: number) => number;
  cart: CartItem[];
};

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

export const ShoppingCartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const isProductPresent = prev.some(
        (item) => item.product.id === product.id
      );
      if (isProductPresent) {
        return prev.map((item) => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const isQuantityOne =
        prev.find((item) => item.product.id === productId)?.quantity === 1;
      if (isQuantityOne) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const isProductInCart = (productId: number): boolean => {
    return cart.some((item) => item.product.id === productId);
  };

  const getQuantityForProduct = (productId: number): number => {
    return cart.find((item) => item.product.id === productId)?.quantity || 0;
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getQuantityForProduct,
        isProductInCart,
        cart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("ShoppingCartCOntext is used outside of its provider");
  }
  return context;
};
