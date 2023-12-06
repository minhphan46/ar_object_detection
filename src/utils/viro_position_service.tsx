import * as turf from '@turf/turf';

function position2Viro(point1: any, point2: any) {
  const distance = turf.distance(point1, point2, {units: 'meters'});
  const angle = turf.bearing(point1, point2);

  let z = -distance * Math.cos((angle * Math.PI) / 180);
  let x = distance * Math.sin((angle * Math.PI) / 180);
  let y = 0;

  //console.log(`x: ${x},y: ${y},z: ${z}`);

  return {
    x: x,
    y: y,
    z: z,
  };
}

function getDistance(point1: any, point2: any) {
  return turf.distance(point1, point2, {units: 'meters'});
}

export {position2Viro, getDistance};
