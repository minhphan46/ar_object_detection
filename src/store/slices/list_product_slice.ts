import {createSlice} from '@reduxjs/toolkit';

import {ProductInfo, listProduct} from '../../data/ProductObject';

interface DirectionState {
  listProducts: ProductInfo[];
}

const initialState: DirectionState = {
  listProducts: listProduct,
};

export const ListProductSlice = createSlice({
  name: 'list-prduct',
  initialState,
  reducers: {},
});

export default ListProductSlice.reducer;
export const {} = ListProductSlice.actions;
