import * as turf from '@turf/turf';

type Graph = {
  [key: string]: {[key: string]: number};
};

function dijkstra(graph: Graph, start: string, end: string | null): string[] {
  const distances: {[key: string]: number} = {};
  const previous: {[key: string]: string | null} = {};
  const visited: string[] = [];
  const queue = Object.keys(graph);
  // console.log(queue);
  queue.forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
  });

  while (queue.length) {
    const current = queue.reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    queue.splice(queue.indexOf(current), 1);
    visited.push(current);

    if (current === end) break;

    for (const neighbor in graph[current]) {
      const alt = distances[current] + graph[current][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
      }
    }
  }

  const path: string[] = [];
  let node = end;
  while (node !== null) {
    path.unshift(node);
    node = previous[node];
  }

  return path;
}

function get2ClosetPoint(
  position: number[],
  listLeft: number[][],
  listRight: number[][],
) {
  let closetLeft = 9999;
  let closetRight = 9999;
  let leftPoint: any[] = [];
  let rightPoint: any[] = [];
  listLeft.forEach(element => {
    const distance = turf.distance(position, element, {units: 'meters'});
    if (distance < closetLeft) {
      closetLeft = distance;
      leftPoint = element;
    }
  });
  listRight.forEach(element => {
    const distance = turf.distance(position, element, {units: 'meters'});
    if (distance < closetRight) {
      closetRight = distance;
      rightPoint = element;
    }
  });
  if (closetLeft * 15 <= closetRight || closetRight * 3 <= closetLeft) {
  }
  return [closetLeft, closetRight];
}

const left1 = [106.79740800634846, 10.851751818086441];
const left2 = [106.79734286696959, 10.851688596216562];
const left3 = [106.79727121366875, 10.851603171386401];
const left4 = [106.79721488728188, 10.851531294095423];
const left5 = [106.79715130605905, 10.851460510248984];
const right1 = [106.79764243306278, 10.851566710790777];
const right2 = [106.79758662691063, 10.851509680569052];
const right3 = [106.79752855831282, 10.85144894706734];
const right4 = [106.79745691524187, 10.851368956580203];
const right5 = [106.79739884666634, 10.851309704351664];

const l1r1 = 32.84920153813561;
const l2r2 = 33.232947112337605;
const l3r3 = 32.92277928710138;
const l4r4 = 32.00696534013623;
const l5r5 = 31.81170067672677;

const l1l2 = 10.001220951098412;
const l2l3 = 12.306848734224022;
const l3l4 = 10.085433947337854;
const l4l5 = 10.495803961459957;

const r1r2 = 8.795235444908348;
const r2r3 = 9.26396300720121;
const r3r4 = 11.845950290578713;
const r4r5 = 9.144587573660775;

const listLeft = [left1, left2, left3, left4, left5];
const listRight = [right1, right2, right3, right4, right5];
// Đồ thị mẫu
const sampleGraph: Graph = {
  left1: {
    left2: 10.001220951098412,
    left3: 22.279241184489607,
    left4: 32.34303640998239,
    left5: 42.83821395984064,
    right1: 32.84920153813561,
    object: 9999,
  },
  left2: {
    left1: 10.001220951098412,
    left3: 12.306848734224022,
    left4: 22.38924078359947,
    left5: 32.876562061348096,
    right2: 33.232947112337605,
    object: 9999,
  },
  left3: {
    left2: 12.306848734224022,
    left1: 22.279241184489607,
    left4: 10.085433947337854,
    left5: 20.56971721762834,
    right3: 32.92277928710138,
    object: 12.163937174478496,
  },
  left4: {
    left2: 22.38924078359947,
    left3: 10.085433947337854,
    left1: 32.34303640998239,
    left5: 10.495803961459957,
    right4: 32.00696534013623,
    object: 9999,
  },
  left5: {
    left2: 32.876562061348096,
    left3: 20.56971721762834,
    left1: 42.83821395984064,
    left4: 10.495803961459957,
    right5: 31.81170067672677,
    object: 9999,
  },

  right1: {
    right2: 8.795235444908348,
    right3: 18.058896427052513,
    right4: 29.899640934447667,
    right5: 39.042563437316595,
    left1: 32.84920153813561,
    object: 9999,
  },
  right2: {
    right1: 8.795235444908348,
    right3: 9.26396300720121,
    right4: 21.10716523050472,
    right5: 30.248770234663247,
    left2: 33.232947112337605,
    object: 9999,
  },
  right3: {
    right2: 9.26396300720121,
    right1: 18.058896427052513,
    right4: 11.845950290578713,
    right5: 20.985348527178086,
    left3: 32.92277928710138,
    object: 20.761476486412747,
  },
  right4: {
    right2: 21.10716523050472,
    right3: 11.845950290578713,
    right1: 29.899640934447667,
    right5: 9.144587573660775,
    left4: 32.00696534013623,
    object: 9999,
  },
  right5: {
    right2: 30.248770234663247,
    right3: 20.985348527178086,
    right4: 9.144587573660775,
    right1: 39.042563437316595,
    left5: 31.81170067672677,
    object: 9999,
  },
  object: {
    right3: 20.761476486412747,
    left3: 12.163937174478496,
  },
};
export {dijkstra, get2ClosetPoint};
export type {Graph};
