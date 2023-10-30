import {
    ViroARScene,
} from '@viro-community/react-viro';
import React from 'react';
import ModelDetection from './model_detection';
import bohucImages from './bohuc/bohuc_images';

function ObjectDetectScreen(): JSX.Element {
    return (
      <ViroARScene>
        <ModelDetection name='bohuc' images={bohucImages}></ModelDetection>
      </ViroARScene>
    );
};
  
export default ObjectDetectScreen;