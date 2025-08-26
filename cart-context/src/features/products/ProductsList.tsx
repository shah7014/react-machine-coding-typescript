import { useState } from "react";
import productsJson from "../../data/products.json";
import { Product } from "./product";
import "./ProductsList.scss";
import { useShoppingCartContext } from "../app/ShoppingCartContext";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>(productsJson);

  const { addToCart, removeFromCart, getQuantityForProduct, isProductInCart } =
    useShoppingCartContext();

  return (
    <div className="products">
      {products.map((product) => (
        <div className="products__item" key={product.id}>
          <img
            className="products__item-img"
            src={product.image}
            alt={product.title}
          />
          <h3 className="products__item-name">{product.title}</h3>
          <p className="products__item-price">{product.price}</p>
          {!isProductInCart(product.id) && (
            <button
              className="products__item-addtocart-btn"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          )}
          {isProductInCart(product.id) && (
            <div className="products__item-cart-actions">
              <button onClick={() => removeFromCart(product.id)}>-</button>
              <p>{getQuantityForProduct(product.id)} in Cart</p>
              <button onClick={() => addToCart(product)}>+</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
