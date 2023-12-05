import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {convertDeg2Rad, getObjectPosition} from '../../utils/get_angle_service';
import {position2Viro} from '../../utils/viro_position_service';
import {MapPosition} from '../../data/ProductObject';
import {handleShortestPoint} from '../../utils/find_shortest_service';
var turf = require('@turf/turf');

export type Direction = {
  heading: number;
  accuracy: number;
  rad: number;
};

export type ViroPosition = {
  x: number;
  y: number;
  z: number;
};

interface DirectionState {
  direction: Direction;
  objectViroPosition: ViroPosition;
  objectMapPosition: MapPosition;
  currentPosition: MapPosition;
  isFirstInit: boolean;
  isDeviceStanding: boolean;
  listShortestPoint: ViroPosition[];
}

const initialState: DirectionState = {
  direction: {
    heading: 0,
    accuracy: 0,
    rad: 0.0,
  },
  currentPosition: {
    lat: 10.851531,
    long: 106.797488,
  },
  objectMapPosition: {
    lat: 0,
    long: 0,
  },
  objectViroPosition: {
    x: 0,
    y: 0,
    z: 0,
  },
  isFirstInit: true,
  isDeviceStanding: false,
  listShortestPoint: [],
};

export const DirectionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    initPosition: (
      state,
      action: PayloadAction<{long: number; lat: number}>,
    ) => {
      const {long, lat} = action.payload;
      state.objectMapPosition = {
        ...state.objectMapPosition,
        lat,
        long,
      };
      state.isFirstInit = true;
      state.isDeviceStanding = false;
    },
    updateCurrentPosition: (
      state,
      action: PayloadAction<{
        lat: number;
        long: number;
      }>,
    ) => {
      const {lat, long} = action.payload;
      state.currentPosition = {
        ...state.currentPosition,
        lat,
        long,
      };
    },
    updateDirection: (
      state,
      action: PayloadAction<{
        heading: number;
        accuracy: number;
      }>,
    ) => {
      const {heading, accuracy} = action.payload;
      const currentPositionPoint = turf.point([
        state.currentPosition.long,
        state.currentPosition.lat,
      ]);
      const objectPositionPoint = turf.point([
        state.objectMapPosition.long,
        state.objectMapPosition.lat,
      ]);

      const rad = convertDeg2Rad(heading);
      if (state.isFirstInit) {
        //handle list shortest point
        const listService = handleShortestPoint(
          [state.currentPosition.long, state.currentPosition.lat],
          [state.objectMapPosition.long, state.objectMapPosition.lat],
        );
        listService.forEach(e => {
          const dotPosition = turf.point(e);
          const {x, y, z} = position2Viro(currentPositionPoint, dotPosition);
          const newDotPos = getObjectPosition(
            {
              x,
              y,
              z,
            },
            heading,
            rad,
          );
          state.listShortestPoint.push(newDotPos);
          console.log(state.listShortestPoint);
        });
        //handle object
        const {x, y, z} = position2Viro(
          currentPositionPoint,
          objectPositionPoint,
        );
        const newObjectPosition = getObjectPosition(
          {
            x,
            y,
            z,
          },
          heading,
          rad,
        );
        state.objectViroPosition = {
          ...state.objectViroPosition,
          ...newObjectPosition,
        };
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
export const {
  initPosition,
  updateDirection,
  updatePhoneDirection,
  updateCurrentPosition,
} = DirectionSlice.actions;
