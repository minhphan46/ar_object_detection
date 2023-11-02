import BidaoImages from './bidao_image';
import bohucImages from './bohuc_images';
import CafeImages from './cafe_image';
import CocaImages from './coca_images';
import PepsiImages from './pepsi_images';

export const ObjectMap: {
  [key: string]: {
    modelName: string;
    description: string;
    images: any;
    color: string;
    imageLogo: any;
    productType: string;
    price: string;
    url: string;
  };
} = {
  CoCaCola: {
    modelName: 'Nước ngọt Coca Cola lon 320ml',
    description: 'Coca Cola (Mỹ)',
    productType: 'Nước ngọt',
    price: '10.600đ',
    images: CocaImages,
    color: 'red',
    imageLogo: require('../../assets/images/coca/coca.png'),
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-coca-cola-320ml',
  },
  BoHuc: {
    modelName: 'Nước tăng lực Redbull 250ml',
    description: 'Redbull (Thái Lan)',
    productType: 'Nước tăng lực',
    price: '10.800đ',
    images: bohucImages,
    color: 'yellow',
    imageLogo: require('../../assets/images/bohuc/bohuc.png'),
    url: 'https://www.bachhoaxanh.com/nuoc-tang-luc/redbull-250ml',
  },
  Cafe: {
    modelName: 'Cà phê sữa Highlands 235ml',
    description: 'Highlands (Việt Nam)',
    images: CafeImages,
    productType: 'Cà phê sữa',
    price: '11.600đ',
    color: 'brown',
    imageLogo: require('../../assets/images/cafe/cafe.png'),
    url: 'https://www.bachhoaxanh.com/ca-phe-lon/ca-phe-sua-highlands-lon-235ml',
  },
  Pepsi: {
    modelName: 'Nước ngọt Pepsi không calo lon 320ml',
    description: 'Pepsi (Mỹ)',
    productType: 'Nước ngọt',
    price: '8.500đ',
    images: PepsiImages,
    color: 'black',
    imageLogo: require('../../assets/images/pepsi/pepsi.png'),
    url: 'https://www.bachhoaxanh.com/nuoc-ngot/nuoc-ngot-pepsi-khong-calo-330ml',
  },
  Bidao: {
    modelName: 'Trà bí đao Wonderfarm 310ml',
    description: 'Wonderfarm (Việt Nam)',
    productType: 'Trà bí đao',
    price: '8.600đ',
    images: BidaoImages,
    color: 'green',
    imageLogo: require('../../assets/images/bidao/bidao.png'),
    url: 'https://www.bachhoaxanh.com/nuoc-tra/nuoc-tra-bi-dao-lon-310ml',
  },
};
