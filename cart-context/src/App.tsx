import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import AppLayout from "./layout/AppLayout";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import { ShoppingCartContextProvider } from "./features/app/ShoppingCartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <ShoppingCartContextProvider>
      <RouterProvider router={router} />
    </ShoppingCartContextProvider>
  );
};

export default App;
