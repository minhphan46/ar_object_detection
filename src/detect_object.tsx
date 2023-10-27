import {
    ViroARScene,
} from '@viro-community/react-viro';
import React from 'react';
import BohucDetection from './bohuc/buhuc_detection';

function DetectObject(): JSX.Element {
    return (
      <ViroARScene>
        <BohucDetection></BohucDetection>
      </ViroARScene>
    );
};
  
export default DetectObject;