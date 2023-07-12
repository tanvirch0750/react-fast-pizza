import { Params, useFetcher } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { IOrder } from '../../types/globalTypes';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }: { order: IOrder }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: { params: Params<string> }) {
  const data = { priority: true };

  await updateOrder(params.id!, data);
  return null;
}
