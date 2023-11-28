import {createSlice} from '@reduxjs/toolkit';
import data from '../../data/data.json';

export type Product = {
  modelName: string;
  description: string;
  color: string;
  productType: string;
  price: string;
  url: string;
};

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: data.map((item: any) => {
    return {
      modelName: item.modelName,
      description: item.description,
      color: item.color,
      productType: item.productType,
      price: item.price,
      url: item.url,
    };
  }),
};

export const ProductSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
});

export default ProductSlice.reducer;
export const {} = ProductSlice.actions;
