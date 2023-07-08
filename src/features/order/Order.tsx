/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { LoaderFunction, Params, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import { ILoaderParams, IOrder } from '../../types/globalTypes';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

function Order() {
  const order: IOrder = useLoaderData() as IOrder;
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export const loader = async ({
  params,
}: {
  params: Params<string>;
}): Promise<IOrder> => {
  const order = await getOrder(params.id!);
  return order;
};

export default Order;
