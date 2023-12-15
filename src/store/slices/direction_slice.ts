import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {convertDeg2Rad} from '../../utils/get_angle_service';
import {
  angleBetweenTwoPoint,
  getDistance,
  position2Viro,
} from '../../utils/viro_position_service';
import {MapPosition} from '../../data/ProductObject';
import {handleShortestPoint} from '../../utils/find_shortest_service';

var turf = require('@turf/turf');

export enum ShowToastType {
  reject,
  pending,
  success,
}

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
  distance: string;
  isFirstInit: boolean;
  isDeviceStanding: boolean;
  listShortestPoint: ViroPosition[];
  listAngleDirection: number[];
  mustShowToast: ShowToastType;
  isShowModal: boolean;
  headingRealtime: number;
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
  distance: '0',
  objectViroPosition: {
    x: 0,
    y: 0,
    z: 0,
  },
  isFirstInit: true,
  isDeviceStanding: false,
  listShortestPoint: [],
  listAngleDirection: [],
  mustShowToast: ShowToastType.reject,
  isShowModal: false,
  headingRealtime: 0,
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
      state.mustShowToast = ShowToastType.reject;
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
      const currentPositionPoint = turf.point([long, lat]);
      const objectPositionPoint = turf.point([
        state.objectMapPosition.long,
        state.objectMapPosition.lat,
      ]);
      const distance = getDistance(currentPositionPoint, objectPositionPoint);

      if (distance >= 5) {
        state.mustShowToast = ShowToastType.reject;
      }

      if (distance <= 2 && state.mustShowToast === ShowToastType.reject) {
        state.mustShowToast = ShowToastType.pending;
      }

      state.distance = distance.toFixed(1);

      // console.log('distance', state.distance);
    },
    updateDirection: (
      state,
      action: PayloadAction<{
        heading: number;
        accuracy: number;
      }>,
    ) => {
      const {heading, accuracy} = action.payload;

      state.headingRealtime = heading;

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
        state.listShortestPoint = [];
        state.listAngleDirection = [];

        const listShortest = handleShortestPoint(
          [state.objectMapPosition.long, state.objectMapPosition.lat],
          [state.currentPosition.long, state.currentPosition.lat],
        );

        listShortest.forEach((e, index) => {
          const dotPosition = turf.point(e);
          const {x, y, z} = position2Viro(currentPositionPoint, dotPosition);

          if (index !== listShortest.length - 1) {
            const angleBetweenDotAndObject = angleBetweenTwoPoint(
              dotPosition,
              objectPositionPoint,
            );

            state.listAngleDirection.push(angleBetweenDotAndObject);
          }

          state.listShortestPoint.push({x, y, z});
        });
        //handle object
        const {x, y, z} = position2Viro(
          currentPositionPoint,
          objectPositionPoint,
        );

        state.objectViroPosition = {
          ...state.objectViroPosition,
          ...{x, y, z},
        };
        state.isFirstInit = false;
        state.direction = {...state.direction, heading, accuracy, rad};
      }
    },
    updatePhoneDirection: (
      state,
      action: PayloadAction<{isStading: boolean}>,
    ) => {
      const {isStading} = action.payload;
      state.isDeviceStanding = isStading;
    },
    showToastSuccess: (state, _) => {
      state.mustShowToast = ShowToastType.success;
    },
    toggleShowModal: (state, _) => {
      state.isShowModal = !state.isShowModal;
    },
  },
});

export default DirectionSlice.reducer;
export const {
  initPosition,
  updateDirection,
  updatePhoneDirection,
  updateCurrentPosition,
  showToastSuccess,
  toggleShowModal,
} = DirectionSlice.actions;
