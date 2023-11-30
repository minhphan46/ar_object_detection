import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface DetectObjectState {
  idObject: string;
  indexImageDetected: number;
  oldIndexImageDetected: number;
}

const initialState: DetectObjectState = {
  idObject: '-1',
  indexImageDetected: -1,
  oldIndexImageDetected: -1,
};

export const DetectObjectSlice = createSlice({
  name: 'detect-object',
  initialState,
  reducers: {
    updateObjectDetected: (
      state,
      action: PayloadAction<{
        id: string;
        indexImageDetected: number;
      }>,
    ) => {
      const {id, indexImageDetected} = action.payload;
      state.oldIndexImageDetected = state.indexImageDetected;
      state.indexImageDetected = indexImageDetected;
      state.idObject = id;
    },
    removeObjectDetected: (state, _) => {
      state.oldIndexImageDetected = -1;
      state.indexImageDetected = -1;
      state.idObject = '';
    },
  },
});

export default DetectObjectSlice.reducer;
export const {updateObjectDetected, removeObjectDetected} =
  DetectObjectSlice.actions;
