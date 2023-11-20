import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {convertDeg2Rad, getObjectPosition} from '../../utils/get_angle_service';
import {ProductPosition} from '../../data/ProductObject';

export type Direction = {
  heading: number;
  accuracy: number;
  rad: number;
};

interface DirectionState {
  direction: Direction;
  objectPosition: ProductPosition;
  isFirstInit: boolean;
  isDeviceStanding: boolean;
}

const initialState: DirectionState = {
  direction: {
    heading: 0,
    accuracy: 0,
    rad: 0.0,
  },
  objectPosition: {
    x: 0,
    y: 0,
    z: 0,
  },
  isFirstInit: true,
  isDeviceStanding: false,
};

export const DirectionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    initPosition: (
      state,
      action: PayloadAction<{x: number; y: number; z: number}>,
    ) => {
      const {x, y, z} = action.payload;
      state.objectPosition = {...state.objectPosition, x, y, z};
      state.isFirstInit = true;
    },
    updateDirection: (
      state,
      action: PayloadAction<{heading: number; accuracy: number}>,
    ) => {
      const {heading, accuracy} = action.payload;
      const rad = convertDeg2Rad(heading);
      if (state.isFirstInit) {
        const newObjectPosition = getObjectPosition(
          {
            x: state.objectPosition.x,
            y: state.objectPosition.y,
            z: state.objectPosition.z,
          },
          heading,
          rad,
        );
        state.objectPosition = {...state.objectPosition, ...newObjectPosition};
        state.isFirstInit = false;
      }
      state.direction = {...state.direction, heading, accuracy, rad};
    },
    updatePhoneDirection: (
      state,
      action: PayloadAction<{isStading: boolean}>,
    ) => {
      const {isStading} = action.payload;
      state.isDeviceStanding = isStading;
    },
  },
});

export default DirectionSlice.reducer;
export const {initPosition, updateDirection, updatePhoneDirection} =
  DirectionSlice.actions;
