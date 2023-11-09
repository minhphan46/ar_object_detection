import {createSlice} from '@reduxjs/toolkit';

import {ProductInfo} from '../../data/ProductObject';

interface DirectionState {
  listProducts: ProductInfo[];
}

const initialState: DirectionState = {
  listProducts: [],
};

export const ListProductSlice = createSlice({
  name: 'list-prduct',
  initialState,
  reducers: {},
});

export default ListProductSlice.reducer;
export const {} = ListProductSlice.actions;
