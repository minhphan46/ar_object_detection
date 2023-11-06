import {ViroARScene} from '@viro-community/react-viro';
import React from 'react';
import ObjectDetectionPage from './ObjectDetectionPage';
import {ObjectMap} from '../utils/object_map';
import Ui3DObject from './3DUiObject';

function DetectObject(props: {sceneNavigator: {scene: any}[]}) {
  const handleClick = () => {
    props.sceneNavigator.push({scene: Ui3DObject});
  };

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
          handleClick={handleClick}
        />
      ))}
    </ViroARScene>
  );
}

export default DetectObject;
