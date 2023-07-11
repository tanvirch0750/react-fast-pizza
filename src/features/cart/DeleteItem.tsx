import { ReactNode } from 'react';
import Button from '../../components/ui/Button';
import { delteItem } from '../../redux/feature/cart/cartSlice';
import { useAppDispatch } from '../../redux/hooks';

function DeleteItem({
  pizzaId,
  children,
}: {
  pizzaId: string | number;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(delteItem(pizzaId));
  };
  return (
    <Button type="small" onClick={handleDelete}>
      {children}
    </Button>
  );
}

export default DeleteItem;
