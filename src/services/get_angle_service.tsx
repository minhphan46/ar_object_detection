import {magnetometer} from 'react-native-sensors';
// Import react-native-sensors
// Define a function that converts radians to degrees
function getRad2deg(rad: number) {
  return (rad * 180) / Math.PI;
}

// Define a function that returns a compass direction based on an angle
function getDirection(angle: number) {
  if (angle >= 22.5 && angle < 67.5) {
    return 'Đông Bắc';
  } else if (angle >= 67.5 && angle < 112.5) {
    return 'Đông';
  } else if (angle >= 112.5 && angle < 157.5) {
    return 'Đông Nam';
  } else if (angle >= 157.5 && angle < 202.5) {
    return 'Nam';
  } else if (angle >= 202.5 && angle < 247.5) {
    return 'Tây Nam';
  } else if (angle >= 247.5 && angle < 292.5) {
    return 'Tây';
  } else if (angle >= 292.5 && angle < 337.5) {
    return 'Tây Bắc';
  } else {
    return 'Bắc';
  }
}

function getNewPosition(oldPosition: any, angle: number) {
  let newPosition = oldPosition;
  console.log('x truoc ' + newPosition.x);
  newPosition.x =
    oldPosition.x * Math.cos(angle) - oldPosition.z * Math.sin(angle);
  console.log('x sau ' + newPosition.x);

  newPosition.z =
    oldPosition.z * Math.sin(angle) + oldPosition.z * Math.cos(angle);

  return newPosition;
}

export {getRad2deg, getDirection, getNewPosition};
