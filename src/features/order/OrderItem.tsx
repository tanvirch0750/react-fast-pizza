import { ICartItem, IOrder } from '../../types/globalTypes';
import { formatCurrency } from '../../utils/helpers';

type OrderItemProps = {
  item: Partial<ICartItem>;
  isLoadingIngredients: boolean;
  ingredients: string[];
};

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice as number)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
