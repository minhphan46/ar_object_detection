import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {ProductInfo, listProduct} from '../../data/ProductObject';

interface DirectionState {
  listProducts: ProductInfo[];
  selectedProduct: ProductInfo | undefined;
}

const initialState: DirectionState = {
  listProducts: listProduct,
  selectedProduct: undefined,
};

export const ListProductSlice = createSlice({
  name: 'list-product',
  initialState,
  reducers: {
    setSelectedProduct: (
      state,
      action: PayloadAction<{product: ProductInfo}>,
    ) => {
      const selectedProduct = action.payload.product;
      state.selectedProduct = {...selectedProduct};
    },
  },
});

export default ListProductSlice.reducer;
export const {setSelectedProduct} = ListProductSlice.actions;
