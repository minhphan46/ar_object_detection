import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import bohucImages from './utils/bohuc_images';

function DetectObject(): JSX.Element {
  return (
    <ViroARScene>
      <ObjectDetectionPage modelName={'bohuc'} images={bohucImages} />
    </ViroARScene>
  );
}

export default DetectObject;
