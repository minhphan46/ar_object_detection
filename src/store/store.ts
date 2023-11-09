import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {DirectionSlice} from './slices/direction_slice';
import {ListProductSlice} from './slices/list_product_slice';

const rootReducer = combineReducers({
  direction: DirectionSlice.reducer,
  listProduct: ListProductSlice.reducer,
});

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
