/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosition } from '../../../features/user/userUtils';
import { IMapPosition } from '../../../types/globalTypes';
import { getAddress } from '../../../services/apiGeocoding';

type IInitialState = {
  username: string;
  status: 'loading' | 'idle' | 'error';
  position: IMapPosition;
  address: string;
  error: string;
};

const initialState: IInitialState = {
  username: '',
  status: 'idle',
  position: { latitude: 0, longitude: 0 },
  address: '',
  error: '',
};

// thunk action creator
export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition();

    const position: IMapPosition = {
      latitude: (positionObj as { coords: { latitude: string | number } })
        .coords.latitude,
      longitude: (positionObj as { coords: { longitude: string | number } })
        .coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state: IInitialState, action: PayloadAction<string | null>) {
      state.username = action.payload!;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your address, Make sure to fill this field';
      });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
