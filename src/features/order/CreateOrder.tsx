/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-refresh/only-export-components */
import { useState, MouseEvent } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { ICartItem, IOrder } from '../../types/globalTypes';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../../redux/feature/cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../redux/store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../../redux/feature/user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

type errorsObj = {
  phone?: string;
};

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useAppDispatch();

  const isLoadingAddress = addressStatus === 'loading';

  // to catch error
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState<boolean>(false);
  const cart = useAppSelector(getCart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              defaultValue={username}
              name="customer"
              className="input"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input" required />
            {(formErrors as errorsObj)?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {(formErrors as errorsObj)?.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            value={withPriority.toString()}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="fon-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(
    Array.from(formData.entries()).map(([key, value]) => [
      key,
      value.toString(),
    ])
  );

  const order: Partial<IOrder> = {
    ...data,
    cart: JSON.parse(data.cart) as ICartItem[],
    priority: data.priority === 'true',
  };

  const errors: errorsObj = {};
  if (!isValidPhone(order.phone!))
    errors.phone =
      'Please Give us your correct phone number. We might need to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // redux
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
