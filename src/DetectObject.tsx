import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import bohucImages from './utils/bohuc_images';
import CocaImages from './utils/coca_images';

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
      {/* <ObjectDetectionPage
        modelName={'Bò húc'}
        description={'Nước tăng lực redbull'}
        images={bohucImages}
        color="yellow"
        imageLogo={require('../assets/images/bohuc/bohuc.jpg')}
      /> */}
    </ViroARScene>
  );
}

export default DetectObject;
