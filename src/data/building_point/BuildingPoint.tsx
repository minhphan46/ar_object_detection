import {Graph} from '../../utils/dijisktra_author';

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

type Point = {
  [key: string]: number[];
};

const listLeft: Point = {
  left1: left1,
  left2: left2,
  left3: left3,
  left4: left4,
  left5: left5,
};
const listRight: Point = {
  right1: right1,
  right2: right2,
  right3: right3,
  right4: right4,
  right5: right5,
};
const listPoint: Point = {...listLeft, ...listRight};
const dataGraph: Graph = {
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
    object: 9999,
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
    object: 9999,
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
    left1: 9999,
    left2: 9999,
    left3: 9999,
    left4: 9999,
    left5: 9999,

    right1: 9999,
    right2: 9999,
    right3: 9999,
    right4: 9999,
    right5: 9999,
  },
  currentPos: {
    left1: 9999,
    left2: 9999,
    left3: 9999,
    left4: 9999,
    left5: 9999,

    right1: 9999,
    right2: 9999,
    right3: 9999,
    right4: 9999,
    right5: 9999,
  },
};
export {listLeft, listRight, listPoint, dataGraph};
export type {Point};
