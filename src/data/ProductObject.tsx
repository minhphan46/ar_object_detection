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
      y: 0,
      z: 0,
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
      y: 0,
      z: 0,
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
      x: 0,
      y: 0,
      z: 0,
    },
  },
];
