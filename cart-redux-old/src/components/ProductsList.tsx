import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { addToCart, removeFromCart } from "../store/actions/cart/actions";
import { getAllProductsAction } from "../store/actions/product/action";
import { ProductState } from "../store/actions/product/actionTypes";
import {
  getItemQuantity,
  isItemInCart,
} from "../store/selectors/cartSelectors";
import {
  getAllProducts,
  getProductErrorMsg,
  getProductState,
} from "../store/selectors/productSelector";
import { TCurrency, TProduct } from "../types/Product";
import "./ProductsList.css";

const ProductItem = ({ product }: { product: TProduct }) => {
  const isProductInCart = useSelector(isItemInCart(product.id));
  const itemQuantityInCart = useSelector(getItemQuantity(product.id));

  const dispatch = useDispatch();

  return (
    <div className="products-list-item">
      <img src={product.image} alt={product.title} className="product-image" />
      <p className="product-title">{product.title}</p>
      <p className="product-price">
        {product.priceDenomination || TCurrency.DOLLAR}
        {product.price}
      </p>
      {!isProductInCart && (
        <button
          className="product-addtocart-btn"
          onClick={() => {
            dispatch(addToCart(product.id));
          }}
        >
          Add To Cart
        </button>
      )}
      {isProductInCart && (
        <div className="product-cart-actions">
          <button
            className="product-cart-icon-btn"
            onClick={() => {
              dispatch(removeFromCart(product.id));
            }}
          >
            -
          </button>
          <p>{itemQuantityInCart}</p>
          <button
            className="product-cart-icon-btn"
            onClick={() => {
              dispatch(addToCart(product.id));
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(getAllProducts);

  const productState = useSelector(getProductState);

  const errorMsg = useSelector(getProductErrorMsg);

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  if (productState === ProductState.LOADING) {
    return <p>LOADING...</p>;
  }

  if (productState === ProductState.ERROR) {
    return <p>{errorMsg}</p>;
  }

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductsList;
