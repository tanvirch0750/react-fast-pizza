import Button from '../../components/ui/Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../../redux/feature/cart/cartSlice';
import { useAppDispatch } from '../../redux/hooks';

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: {
  pizzaId: string | number;
  currentQuantity: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
