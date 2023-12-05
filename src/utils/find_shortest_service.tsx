import * as turf from '@turf/turf';
import {
  Point,
  dataGraph,
  listLeft,
  listPoint,
  listRight,
} from '../data/building_point/BuildingPoint';

type Graph = {
  [key: string]: {[key: string]: number};
};

function _dijkstra(graph: Graph, start: string, end: string | null): string[] {
  const distances: {[key: string]: number} = {};
  const previous: {[key: string]: string | null} = {};
  const visited: {[key: string]: boolean} = {};
  const queue = Object.keys(graph);

  queue.forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  });

  while (queue.length) {
    const current = queue.reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    queue.splice(queue.indexOf(current), 1);

    visited[current] = true;

    if (current === end) break;

    Object.keys(graph[current]).forEach(neighbor => {
      const alt = distances[current] + graph[current][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
      }
    });
  }

  const path: string[] = [];
  let node: string | null = end;
  while (node !== null) {
    path.unshift(node);
    node = previous[node];
  }

  return path;
}

function _get2ClosetPoint(
  position: number[],
  listLeft: Point,
  listRight: Point,
) {
  let closetLeft = 9999;
  let closetRight = 9999;
  let rightPoint: string = '';
  let leftPoint: string = '';

  for (const item in listLeft) {
    const distance = turf.distance(position, listLeft[item], {units: 'meters'});
    if (distance < closetLeft) {
      closetLeft = distance;
      leftPoint = item;
    }
  }

  for (const item in listRight) {
    const distance = turf.distance(position, listRight[item], {
      units: 'meters',
    });
    if (distance < closetRight) {
      closetRight = distance;
      rightPoint = item;
    }
  }

  const closetData: Graph = {
    leftPoint: {[leftPoint]: closetLeft},
    rightPoint: {[rightPoint]: closetRight},
  };

  return closetData;
}

function _handleGraphStatusPoint(
  graph: Graph,
  object: number[],
  pointName: String,
) {
  //Handle object graph status
  const closet = _get2ClosetPoint([object[0], object[1]], listLeft, listRight);
  const leftDistanceData = closet['leftPoint'];
  const rightDistanceData = closet['rightPoint'];
  const leftPoint = Object.keys(leftDistanceData)[0];
  const rightPoint = Object.keys(rightDistanceData)[0];
  let handleGraph: Graph = graph;
  //input closetData to graph
  const queue = Object.keys(handleGraph);
  //handle direction to object distance
  queue.forEach(element => {
    switch (element) {
      case leftPoint:
        handleGraph[element][`${pointName}`] = leftDistanceData[leftPoint];
        break;
      case rightPoint:
        handleGraph[element][`${pointName}`] = rightDistanceData[rightPoint];
        break;
      default:
        handleGraph[element][`${pointName}`] = 9999;
        break;
    }
  });
  //handle graph data
  const queueHandleGraph = Object.keys(handleGraph[`${pointName}`]);
  queueHandleGraph.forEach(key => {
    switch (key) {
      case leftPoint:
        handleGraph[`${pointName}`][leftPoint] = leftDistanceData[leftPoint];
        break;
      case rightPoint:
        handleGraph[`${pointName}`][rightPoint] = rightDistanceData[rightPoint];
        break;
      default:
        handleGraph[`${pointName}`][key] = 9999;
        break;
    }
  });

  return handleGraph;
}

function handleShortestPoint(object: number[], currentPos: number[]) {
  const closestLeftPosPoint = _get2ClosetPoint(currentPos, listLeft, listRight)[
    'leftPoint'
  ];
  const closestLeftObjPoint = _get2ClosetPoint(object, listLeft, listRight)[
    'leftPoint'
  ];
  const queuePos = Object.keys(closestLeftPosPoint);
  const queueObj = Object.keys(closestLeftObjPoint);
  //console.log(queuePos[0], queueObj[0]);
  if (queuePos[0] === queueObj[0]) {
    let listShortestPoint: number[][] = [];
    listShortestPoint.push(currentPos);
    listShortestPoint.push(object);
    return listShortestPoint;
  }
  //find shortest way from current position to target
  let objectGraphStatus: Graph = _handleGraphStatusPoint(
    dataGraph,
    object,
    'object',
  );
  let currentPosGraphStatus: Graph = _handleGraphStatusPoint(
    objectGraphStatus,
    currentPos,
    'currentPos',
  );

  //handle dijkstra
  const shortestPath = _dijkstra(currentPosGraphStatus, 'currentPos', 'object');
  // console.log('Đường đi ngắn nhất:', shortestPath.join(' -> '));
  let listShortestPoint: number[][] = [];
  shortestPath.forEach(e => {
    switch (e) {
      case 'currentPos':
        listShortestPoint.push(currentPos);
        break;
      case 'object':
        listShortestPoint.push(object);
        break;
      default:
        listShortestPoint.push(listPoint[e]);
        break;
    }
  });
  // console.log(listShortestPoint);
  return listShortestPoint;
}

export {handleShortestPoint};
export type {Graph};
