import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface CurrentLocationType {
  lat: number;
  long: number;
  distance: number;
  angle: number;
}

const initialState: CurrentLocationType = {
  lat: 0,
  long: 0,
  distance: 0,
  angle: 0,
};

export const CurrentLocationSlice = createSlice({
  name: 'current-location',
  initialState,
  reducers: {
    updateCurrentLocation: (
      state,
      action: PayloadAction<{
        lat: number;
        long: number;
      }>,
    ) => {
      const {lat, long} = action.payload;
      state.lat = lat;
      state.long = long;
    },
    updateDistanceAndAngle: (
      state,
      action: PayloadAction<{
        distance: number;
        angle: number;
      }>,
    ) => {
      const {distance, angle} = action.payload;
      state.distance = distance;
      state.angle = angle;
    },
  },
});

export default CurrentLocationSlice.reducer;
export const {updateCurrentLocation, updateDistanceAndAngle} =
  CurrentLocationSlice.actions;
