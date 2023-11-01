import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import bohucImages from './utils/bohuc_images';
import CocaImages from './utils/coca_images';

function DetectObject(): JSX.Element {
  return (
    <ViroARScene>
      <ObjectDetectionPage
        modelName={'CoCa Cola'}
        description={'Đây_là_lon_Coca_Cola'}
        images={CocaImages}
        color="red"
        imageLogo={require('../assets/images/coca/coca.png')}
      />
      <ObjectDetectionPage
        modelName={'Bò húc'}
        description={'Nước tăng lực redbull'}
        images={bohucImages}
        color="yellow"
        imageLogo={require('../assets/images/bohuc/bohuc.jpg')}
      />
    </ViroARScene>
  );
}

export default DetectObject;
