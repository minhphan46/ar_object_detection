import * as turf from '@turf/turf';

function position2Viro(point1: any, point2: any) {
  const distance = turf.distance(point1, point2, {units: 'meters'});
  const angle = turf.bearing(point1, point2);

  let z = distance * Math.cos((angle * Math.PI) / 180);
  let x = distance * Math.sin((angle * Math.PI) / 180);
  let y = 0;
  if (angle < 90) {
    z = -z;
  }

  return {
    x: x,
    y: y,
    z: z,
  };
}

export {position2Viro};
