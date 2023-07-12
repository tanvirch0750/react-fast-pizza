import { ICartItem, IOrder } from '../../types/globalTypes';
import { formatCurrency } from '../../utils/helpers';

type OrderItemProps = {
  item: Partial<ICartItem>;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice as number)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
