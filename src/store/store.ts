import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {DirectionSlice} from './slices/direction_slice';
import {ListProductSlice} from './slices/list_product_slice';
import {DetectObjectSlice} from './slices/detect_object_slice';
import {CurrentLocationSlice} from './slices/current_location_slice';

const rootReducer = combineReducers({
  direction: DirectionSlice.reducer,
  listProduct: ListProductSlice.reducer,
  detectObject: DetectObjectSlice.reducer,
  currentLocation: CurrentLocationSlice.reducer,
});

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
