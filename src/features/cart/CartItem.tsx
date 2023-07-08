import { formatCurrency } from '../../utils/helpers';

type ICartItem = {
  pizzaId: string;
  name: string;
  quantity: number;
  totalPrice: number;
};

function CartItem({ item }: { item: ICartItem }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
