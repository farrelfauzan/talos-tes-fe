/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import type Product from '@/types/Data.type';

const initialState: Product = {
  data: [],
};

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    GetProduct: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const { GetProduct } = ProductSlice.actions;

export const GetAllProduct = (state: RootState) => state.products;

export default ProductSlice.reducer;
