import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import bohucImages from './utils/bohuc_images';
import CocaImages from './utils/coca_images';
import CafeImages from './utils/cafe_image';
import PepsiImages from './utils/pepsi_images';

function DetectObject(): JSX.Element {
  return (
    <ViroARScene>
      <ObjectDetectionPage
        modelName={'CoCaCola'}
        description={'Đây là lon Coca Cola'}
        images={CocaImages}
        color="red"
        imageLogo={require('../assets/images/coca/coca.jpg')}
      />
      <ObjectDetectionPage
        modelName={'Bò húc'}
        description={'Nước tăng lực redbull'}
        images={bohucImages}
        color="yellow"
        imageLogo={require('../assets/images/bohuc/bohuc.jpg')}
      />
      <ObjectDetectionPage
        modelName={'Cà phê'}
        description={'Cà phê sữa highlands coffee'}
        images={CafeImages}
        color="brown"
        imageLogo={require('../assets/images/cafe/cafe.jpg')}
      />
      <ObjectDetectionPage
        modelName={'Pepsi'}
        description={'Pepsi không calo'}
        images={PepsiImages}
        color="black"
        imageLogo={require('../assets/images/pepsi/pepsi.jpg')}
      />
    </ViroARScene>
  );
}

export default DetectObject;
