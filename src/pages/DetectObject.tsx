import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './ObjectDetectionPage';
import {ObjectMap} from '../utils/object_map';

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
          productType={ObjectMap[key].productType}
          price={ObjectMap[key].price}
          url={ObjectMap[key].url}
        />
      ))}
    </ViroARScene>
  );
}

export default DetectObject;
