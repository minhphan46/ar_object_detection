import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {PersonSlice} from './slices/person_slice';
import {ProductSlice} from './slices/product';

const rootReducer = combineReducers({
  person: PersonSlice.reducer,
  product: ProductSlice.reducer,
});

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
