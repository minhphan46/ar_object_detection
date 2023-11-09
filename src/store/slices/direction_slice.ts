import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  convertDeg2Rad,
  getObjectPosition,
} from '../../services/get_angle_service';

export type Direction = {
  heading: number;
  accuracy: number;
  rad: number;
};

export type ObjectPosition = {
  x: number;
  y: number;
  z: number;
};

interface DirectionState {
  direction: Direction;
  objectPosition: ObjectPosition;
  isFindPositionObject: boolean;
}

const initialState: DirectionState = {
  direction: {
    heading: 0,
    accuracy: 0,
    rad: 0.0,
  },
  objectPosition: {
    x: 0,
    y: -1,
    z: -10,
  },
  isFindPositionObject: false,
};

export const DirectionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    updateDirection: (
      state,
      action: PayloadAction<{heading: number; accuracy: number}>,
    ) => {
      const {heading, accuracy} = action.payload;
      const rad = convertDeg2Rad(heading);
      if (!state.isFindPositionObject) {
        const newObjectPosition = getObjectPosition(
          {
            x: 0,
            y: -1,
            z: -10,
          },
          heading,
          rad,
        );
        state.objectPosition = {...state.objectPosition, ...newObjectPosition};
        state.isFindPositionObject = true;
      }
      state.direction = {...state.direction, heading, accuracy, rad};
    },
  },
});

export default DirectionSlice.reducer;
export const {updateDirection} = DirectionSlice.actions;
