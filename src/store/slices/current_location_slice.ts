import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {position2Viro} from '../../utils/viro_position_service';
import {Point} from '@turf/turf';

type ObjectPosition = {
  x: number;
  y: number;
  z: number;
};

interface CurrentLocationType {
  lat: number;
  long: number;
  distance: number;
  angle: number;
  position: ObjectPosition | undefined;
}

const initialState: CurrentLocationType = {
  lat: 0,
  long: 0,
  distance: 0,
  angle: 0,
  position: undefined,
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
    updateTempPosition: (
      state,
      action: PayloadAction<{
        objectPosition: any;
        currentPosition: any;
      }>,
    ) => {
      const {objectPosition, currentPosition} = action.payload;
      const {x, y, z} = position2Viro(currentPosition, objectPosition);
      state.position = {x, y, z};
    },
  },
});

export default CurrentLocationSlice.reducer;
export const {
  updateCurrentLocation,
  updateDistanceAndAngle,
  updateTempPosition,
} = CurrentLocationSlice.actions;
