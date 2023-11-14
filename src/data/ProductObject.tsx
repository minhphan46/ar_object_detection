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
  url: string;
  brandName: string;
  type: string;
  price: string;
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
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/redbull-250ml',
    brandName: 'Redbull (Thái Lan)',
    type: 'Nước ngọt',
    price: '10.800đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-coca-cola-320ml',
    brandName: 'Coca Cola (Mỹ)',
    type: 'nước ngọt',
    price: '10.600đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-pepsi-khong-calo-330ml',
    brandName: 'Pepsi',
    type: 'nước ngọt',
    price: '8.000đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-fanta-huong-cam-loc-6-lon',
    brandName: 'Fanta',
    type: 'nước ngọt',
    price: '8.000đ',
  },
  {
    id: 5,
    name: '7Up',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/7up_label.jpg'),
      },
    ],
    image: require('../../assets/images/7up/7up.png'),
    position: {
      x: -2,
      y: -1,
      z: 9,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/7up-sleek-330ml',
    brandName: '7 Up (Mỹ)',
    type: 'nước ngọt',
    price: '8.000đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/nuoc-bo-sung-ion-pocari-sweat-500ml-chai',
    brandName: 'Pocari Sweat (Nhật Bản)',
    type: 'nước bù khoáng',
    price: '12.300đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/nuoc-tang-luc-sting-vi-dau-loc-6-lon-cao-330ml',
    brandName: 'Sting (Việt Nam)',
    type: 'nước ngọt',
    price: '9.100đ',
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
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/mirinda-cam-330ml-sleek-lon',
    brandName: 'Mirinda (Việt Nam)',
    type: 'nước ngọt',
    price: '9.000đ',
  },
];
