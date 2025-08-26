import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/actions/cart/actions";
import {
  getAllCartItemsWithProductsInfo,
  getCartAmount,
} from "../store/selectors/cartSelectors";
import { TCurrency, TProduct } from "../types/Product";
import "./CartItems.css";

interface ICartItemProps {
  cartItem: TProduct & { quantity: number };
}

const CartItem = ({ cartItem }: ICartItemProps) => {
  const dispatch = useDispatch();

  const handleIncrementItemInCart = () => {
    dispatch(addToCart(cartItem.id));
  };

  const handleDecrementItemInCart = () => {
    dispatch(removeFromCart(cartItem.id));
  };

  return (
    <div className="cart-item">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="cart-item-img"
      />
      <div className="cart-item-desc">
        <p>{cartItem.title}</p>
        <p>
          {cartItem.priceDenomination ?? TCurrency.DOLLAR}
          {cartItem.price}
        </p>
        <div className="cart-item-actions">
          <button className="cart-icon-btn" onClick={handleDecrementItemInCart}>
            -
          </button>
          <p>{cartItem.quantity}</p>
          <button className="cart-icon-btn" onClick={handleIncrementItemInCart}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItemsList = () => {
  const cartItems = useSelector(getAllCartItemsWithProductsInfo);

  const totalAmount = useSelector(getCartAmount);

  if (cartItems.length === 0) {
    return (
      <p>
        There are no items added in cart yet. Please explore our{" "}
        <NavLink to={"/"}>Products Catalog</NavLink>
      </p>
    );
  }

  return (
    <div className="cart-items-list">
      {cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.id} />
      ))}
      <p>Total Amount:- ${totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default CartItemsList;
