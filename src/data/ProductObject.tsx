import {CanType} from '../enum/3DCanEnum';

export type ProductPosition = {
  x: number;
  y: number;
  z: number;
};

export type ProductCan = {
  type: CanType;
  brandLabel: any;
};

export type ProductInfo = {
  id: number;
  name: String;
  canObject: ProductCan[];
  image: any;
  position: ProductPosition;
};

export const listProduct: ProductInfo[] = [
  {
    id: 1,
    name: 'Bò húc',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
      },
    ],
    image: require('../../assets/images/bohuc/bohuc.jpg'),
    position: {
      x: 0,
      y: -1,
      z: -10,
    },
  },
  {
    id: 2,
    name: 'Coca',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/coca_label.jpg'),
      },
    ],
    image: require('../../assets/images/coca/coca.jpg'),
    position: {
      x: 0,
      y: -2,
      z: -8,
    },
  },
  {
    id: 3,
    name: 'Pepsi',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
      },
    ],
    image: require('../../assets/images/pepsi/pepsi.jpg'),
    position: {
      x: 2,
      y: -1,
      z: 6,
    },
  },
  {
    id: 4,
    name: 'Fanta',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/fanta_label.jpg'),
      },
    ],
    image: require('../../assets/images/fanta/fanta.png'),
    position: {
      x: 2,
      y: -1,
      z: 9,
    },
  },
  {
    id: 5,
    name: '7Up',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/fanta_label.jpg'),
      },
    ],
    image: require('../../assets/images/7up/7up.png'),
    position: {
      x: -2,
      y: -1,
      z: 9,
    },
  },
  {
    id: 6,
    name: 'Pocari Sweet',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/pocari_sweet_label.jpg'),
      },
    ],
    image: require('../../assets/images/pocari/pocari.jpg'),
    position: {
      x: 0,
      y: -1,
      z: 4,
    },
  },
  {
    id: 7,
    name: 'Sting',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/sting_label.jpg'),
      },
    ],
    image: require('../../assets/images/sting/sting.png'),
    position: {
      x: 0,
      y: -1,
      z: 1,
    },
  },
  {
    id: 8,
    name: 'Mirinda hương cam',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/mirinda_orange_label.jpg'),
      },
    ],
    image: require('../../assets/images/mirinda_orange/mirinda_orange.jpg'),
    position: {
      x: 0,
      y: -1,
      z: -11,
    },
  },
];
