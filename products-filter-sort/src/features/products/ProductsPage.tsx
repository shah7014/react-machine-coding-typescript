import React from "react";
import "./ProductsPage.scss";
import ProductsGrid from "./components/ProductsGrid";
import ProductsFilter from "./components/filters/ProductsFilter";
import { ProductContextProvider } from "./context/ProductsContext";

const ProductPage: React.FC = () => {
  return (
    <div className="products">
      <ProductContextProvider>
        <ProductsFilter />
        <ProductsGrid />
      </ProductContextProvider>
    </div>
  );
};

export default ProductPage;
