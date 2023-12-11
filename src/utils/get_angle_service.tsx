export type ProductPosition = {
  x: number;
  y: number;
  z: number;
};

// Define a function that converts radians to degrees
function getRad2deg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function convertDeg2Rad(deg: number) {
  return (deg * Math.PI) / 180;
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

  newPosition.x =
    oldPosition.x * Math.cos(angle) - oldPosition.z * Math.sin(angle);

  newPosition.z =
    oldPosition.x * Math.sin(angle) + oldPosition.z * Math.cos(angle);

  return newPosition;
}

function getObjectPosition(
  oldPosition: ProductPosition,
  heading: number,
  angle: number,
): ProductPosition {
  let newPosition = oldPosition;
  console.log('heading tinh toan', heading);
  console.log('angle tinh toan', angle);
  console.log('old position tinh toan', oldPosition);

  newPosition.x =
    oldPosition.x * Math.cos(angle) + oldPosition.z * Math.sin(angle);

  newPosition.z =
    -oldPosition.x * Math.sin(angle) + oldPosition.z * Math.cos(angle);

  //console.log('new postion tinh toan', newPosition);

  return newPosition;
}

function getStadingArea(axisX: number, axisY: number, axisZ: number) {
  // console.log(axisY);

  const gravity = 9.81; // Gia tốc trọng trường, g = 9.81 m/s²
  // Kiểm tra nếu gia tốc trục Z gần bằng gia tốc trọng trường
  const tolerance = 0; // Độ lệch cho phép
  const isStandingY =
    Math.abs(axisY) > gravity - tolerance &&
    Math.abs(axisY) < gravity + tolerance;
  return isStandingY;
}

export {
  getRad2deg,
  convertDeg2Rad,
  getDirection,
  getNewPosition,
  getObjectPosition,
  getStadingArea,
};
