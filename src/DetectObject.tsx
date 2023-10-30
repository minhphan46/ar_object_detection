import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './pages/ObjectDetectionPage';
import bohucImages from './utils/bohuc_images';
import CocaImages from './utils/coca_images';

function DetectObject(): JSX.Element {
  return (
    <ViroARScene>
      <ObjectDetectionPage modelName={'coca'} images={CocaImages} color='red'/>
      <ObjectDetectionPage modelName={'bohuc'} images={bohucImages} color='yellow'/>
    </ViroARScene>
  );
}

export default DetectObject;
