import {magnetometer} from 'react-native-sensors';
// Import react-native-sensors
// Define a function that converts radians to degrees
function getRad2deg(rad: number) {
  return (rad * 180) / Math.PI;
}

// Define a function that returns a compass direction based on an angle
function getDirection(angle: number) {
  if (angle >= 22.5 && angle < 67.5) {
    return 'NE';
  } else if (angle >= 67.5 && angle < 112.5) {
    return 'E';
  } else if (angle >= 112.5 && angle < 157.5) {
    return 'SE';
  } else if (angle >= 157.5 && angle < 202.5) {
    return 'S';
  } else if (angle >= 202.5 && angle < 247.5) {
    return 'SW';
  } else if (angle >= 247.5 && angle < 292.5) {
    return 'W';
  } else if (angle >= 292.5 && angle < 337.5) {
    return 'NW';
  } else {
    return 'N';
  }
}

function getNewPosition(oldPosition: any, angle: number) {
  let newPosition = oldPosition;
  newPosition.x =
    oldPosition.x * Math.cos(angle) - oldPosition.z * Math.sin(angle);
  newPosition.z =
    oldPosition.z * Math.sin(angle) + oldPosition.z * Math.cos(angle);

  return newPosition;
}

export {getRad2deg, getDirection, getNewPosition};
