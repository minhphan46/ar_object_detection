export enum CanType {
  can250,
  can310,
  can320,
}

export function getCanSource(canType: CanType) {
  switch (canType) {
    case CanType.can320:
      return require('../../../assets/model/can320.obj');
    case CanType.can310:
      return require('../../../assets/model/can310.obj');
    case CanType.can250:
      return require('../../../assets/model/can250.obj');
  }
}

export function getZPosition(canType: CanType) {
  switch (canType) {
    case CanType.can250:
    case CanType.can320:
      return -8;
    case CanType.can310:
      return -1;
  }
}

export function getYPosition(canType: CanType) {
  switch (canType) {
    case CanType.can250:
      return -1;
    case CanType.can320:
      return -2;
    case CanType.can310:
      return -0.5;
  }
}

export function getZoomInObject(canType: CanType) {
  switch (canType) {
    case CanType.can250:
      return -2;
    case CanType.can320:
      return -6;
    case CanType.can310:
      return 0;
  }
}
