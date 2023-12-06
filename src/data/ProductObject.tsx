import {CanType} from './enum/3DCanEnum';
import CocaImages from './image_object/coca_images';
import Bohuc_images from './image_object/bohuc_images';
import pepsi_images from './image_object/pepsi_images';
import cafe_images from './image_object/cafe_image';
import bidao_images from './image_object/bidao_image';
import sting_images from './image_object/sting_images';
import fanta_images from './image_object/fanta_images';
import seven_images from './image_object/sevenup_images';

export type MapPosition = {
  long: number;
  lat: number;
};

export type ProductCan = {
  type: CanType;
  brandLabel: any;
};

export type ProductInfo = {
  id: string;
  name: string;
  canObject: ProductCan[];
  image: any;
  position: MapPosition;
  url: string;
  brandName: string;
  type: string;
  price: string;
  imageDetect?: Record<string, any> | undefined;
};

export const listProduct: ProductInfo[] = [
  {
    id: '1',
    name: 'Bò húc',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/redbull_label.png'),
      },
    ],
    image: require('../../assets/images/bohuc/bohuc.png'),
    position: {
      long: 106.7974385,
      lat: 10.851669,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/redbull-250ml',
    brandName: 'Redbull (Thái Lan)',
    type: 'Nước ngọt',
    price: '10.800đ',
    imageDetect: Bohuc_images,
  },
  {
    id: '2',
    name: 'Coca',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/coca_label.jpg'),
      },
    ],
    image: require('../../assets/images/coca/coca.png'),
    position: {
      long: 106.797597,
      lat: 10.851606,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-coca-cola-320ml',
    brandName: 'Coca Cola (Mỹ)',
    type: 'nước ngọt',
    price: '10.600đ',
    imageDetect: CocaImages,
  },
  {
    id: '3',
    name: 'Pepsi',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
      },
    ],
    image: require('../../assets/images/pepsi/pepsi.png'),
    position: {
      long: 106.797522,
      lat: 10.851565,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-pepsi-khong-calo-330ml',
    brandName: 'Pepsi',
    type: 'nước ngọt',
    price: '8.000đ',
    imageDetect: pepsi_images,
  },
  {
    id: '4',
    name: 'Fanta',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/fanta_label.jpg'),
      },
    ],
    image: require('../../assets/images/fanta/fanta.png'),
    position: {
      long: 106.797469,
      lat: 10.851511,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-fanta-huong-cam-loc-6-lon',
    brandName: 'Fanta',
    type: 'nước ngọt',
    price: '8.000đ',
    imageDetect: fanta_images,
  },
  {
    id: '5',
    name: '7Up',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/7up_label.jpg'),
      },
    ],
    image: require('../../assets/images/7up/7up.png'),
    position: {
      long: 106.797436,
      lat: 10.851619,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/7up-sleek-330ml',
    brandName: '7 Up (Mỹ)',
    type: 'nước ngọt',
    price: '8.000đ',
    imageDetect: seven_images,
  },
  {
    id: '6',
    name: 'Pocari Sweet',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/pocari_sweet_label.jpg'),
      },
    ],
    image: require('../../assets/images/pocari/pocari.jpg'),
    position: {
      long: 106.797376,
      lat: 10.851672,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/nuoc-bo-sung-ion-pocari-sweat-500ml-chai',
    brandName: 'Pocari Sweat (Nhật Bản)',
    type: 'nước bù khoáng',
    price: '12.300đ',
  },
  {
    id: '7',
    name: 'Sting',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/sting_label.jpg'),
      },
    ],
    image: require('../../assets/images/sting/sting.png'),
    position: {
      long: 106.797325,
      lat: 10.851733,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/nuoc-tang-luc-sting-vi-dau-loc-6-lon-cao-330ml',
    brandName: 'Sting (Việt Nam)',
    type: 'nước ngọt',
    price: '9.100đ',
    imageDetect: sting_images,
  },
  {
    id: '8',
    name: 'Mirinda hương cam',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/mirinda_orange_label.jpg'),
      },
    ],
    image: require('../../assets/images/mirinda_orange/mirinda.png'),
    position: {
      long: 106.79715,
      lat: 10.851546,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/mirinda-cam-330ml-sleek-lon',
    brandName: 'Mirinda (Việt Nam)',
    type: 'nước ngọt',
    price: '9.000đ',
  },
  {
    id: '9',
    name: 'Cà phê sữa Highlands',
    canObject: [
      {
        type: CanType.can320,
        brandLabel: require('../../assets/images/soft_drink_label/cafe_label.png'),
      },
    ],
    image: require('../../assets/images/cafe/cafe.png'),
    position: {
      long: 106.797512,
      lat: 10.851681,
    },
    url: 'https://www.bachhoaxanh.com/ca-phe-lon/ca-phe-sua-highlands-lon-235ml',
    brandName: 'Highlands (Việt Nam)',
    type: 'Cà phê sữa',
    price: '11.600đ',
    imageDetect: cafe_images,
  },
  {
    id: '10',
    name: 'Trà bí đao Wonderfarm',
    canObject: [
      {
        type: CanType.can250,
        brandLabel: require('../../assets/images/soft_drink_label/bidao_label.png'),
      },
    ],
    image: require('../../assets/images/bidao/bidao.png'),
    position: {
      long: 106.797463,
      lat: 10.851439,
    },
    url: 'https://www.bachhoaxanh.com/nuoc-tra/nuoc-tra-bi-dao-lon-310ml',
    brandName: 'Wonderfarm (Việt Nam)',
    type: 'Trà bí đao',
    price: '8.600đ',
    imageDetect: bidao_images,
  },
];
