import LinkButton from '../../components/ui/LinkButton';
import Button from '../../components/ui/Button';
import { ICartItem } from '../../types/globalTypes';
import CartItem from './CartItem';
import { useAppSelector } from '../../redux/hooks';
import { clearCart, getCart } from '../../redux/feature/cart/cartSlice';
import { useDispatch } from 'react-redux';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const cart = useAppSelector(getCart);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item: ICartItem) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
