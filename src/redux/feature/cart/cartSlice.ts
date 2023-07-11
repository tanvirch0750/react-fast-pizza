/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../../types/globalTypes';
import { RootState } from '../../store';

type IInitialState = {
  cart: ICartItem[];
};

const initialState: IInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItem(state: IInitialState, action: PayloadAction<ICartItem>) {
      state.cart.push(action.payload);
    },
    delteItem(
      state: IInitialState,
      action: PayloadAction<string | number | null>
    ) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(
      state: IInitialState,
      action: PayloadAction<string | number | null>
    ) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item?.quantity && item.quantity++;
      if (item?.totalPrice && item.quantity && item.unitPrice)
        item.totalPrice = item?.quantity * item?.unitPrice;
    },
    decreaseItemQuantity(
      state: IInitialState,
      action: PayloadAction<string | number | null>
    ) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item?.quantity && item.quantity--;
      if (item?.totalPrice && item.quantity && item.unitPrice)
        item.totalPrice = item?.quantity * item?.unitPrice;

      if (item?.quantity === 0) cartSlice.caseReducers.delteItem(state, action);
    },
    clearCart(state: IInitialState) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  delteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById =
  (id: string | number) => (state: RootState) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
