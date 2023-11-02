import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from '../pages/ObjectDetectionPage';
import bohucImages from '../utils/bohuc_images';
import CocaImages from '../utils/coca_images';
import CafeImages from '../utils/cafe_image';
import PepsiImages from '../utils/pepsi_images';
import BidaoImages from '../utils/bidao_image';

const ObjectMap: {
  [key: string]: {
    modelName: string;
    description: string;
    images: any;
    color: string;
    imageLogo: any;
  };
} = {
  CoCaCola: {
    modelName: 'CoCaCola',
    description: 'Đây là lon Coca Cola',
    images: CocaImages,
    color: 'red',
    imageLogo: require('../../assets/images/coca/coca.jpg'),
  },
  BoHuc: {
    modelName: 'Bò húc',
    description: 'Nước tăng lực redbull',
    images: bohucImages,
    color: 'yellow',
    imageLogo: require('../../assets/images/bohuc/bohuc.jpg'),
  },
  Cafe: {
    modelName: 'Cà phê',
    description: 'Cà phê sữa highlands coffee',
    images: CafeImages,
    color: 'brown',
    imageLogo: require('../../assets/images/cafe/cafe.jpg'),
  },
  Pepsi: {
    modelName: 'Pepsi',
    description: 'Pepsi không calo',
    images: PepsiImages,
    color: 'black',
    imageLogo: require('../../assets/images/pepsi/pepsi.jpg'),
  },
  Bidao: {
    modelName: 'Bí đao',
    description: 'Trà bí đao Wonderfarm',
    images: BidaoImages,
    color: 'green',
    imageLogo: require('../../assets/images/bidao/bidao.jpg'),
  },
};

function DetectObject(): JSX.Element {
  return (
    <ViroARScene>
      {Object.keys(ObjectMap).map(key => (
        <ObjectDetectionPage
          key={key}
          modelName={ObjectMap[key].modelName}
          description={ObjectMap[key].description}
          images={ObjectMap[key].images}
          color={ObjectMap[key].color}
          imageLogo={ObjectMap[key].imageLogo}
        />
      ))}
    </ViroARScene>
  );
}

export default DetectObject;
