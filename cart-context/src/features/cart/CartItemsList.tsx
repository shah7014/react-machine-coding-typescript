import { useShoppingCartContext } from "../app/ShoppingCartContext";
import "./CartItemsList.scss";

const CartItemsList: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useShoppingCartContext();

  return (
    <div className="cartitems">
      {cart.map((item) => (
        <div className="cart-item" key={item.product.id}>
          <img
            src={item.product.image}
            alt={item.product.title}
            className="cart-item__image"
          />
          <div className="cart-item__desc">
            <p>{item.product.title}</p>
            <div className="cart-item__actions">
              <button onClick={() => removeFromCart(item.product.id)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => addToCart(item.product)}>+</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsList;
