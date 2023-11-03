import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Viro3DObject,
  ViroARScene,
  ViroMaterials,
} from '@viro-community/react-viro';

function NavigationPage(): JSX.Element {
  const initPosition = {x: 0, y: -1, z: 0};
  const productPosition = {x: 0, y: -0.5, z: -11};

  function getArrowModel() {
    const arrowModels = [];

    for (let i = 1; i <= 10; i++) {
      arrowModels.push(
        <Viro3DObject
          key={i}
          source={require('../../assets/model/arrow.obj')}
          type="OBJ"
          materials={['blue']}
          position={[initPosition.x, initPosition.y, initPosition.z - i]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 0, 90]}
        />,
      );
    }
    return arrowModels;
  }

  return (
    <ViroARScene>
      {getArrowModel()}
      <Viro3DObject
        key={'object find'}
        source={require('../../assets/model/can.obj')}
        type="OBJ"
        materials={['label']}
        position={[productPosition.x, productPosition.y, productPosition.z]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
      />
    </ViroARScene>
  );
}

export default NavigationPage;

ViroMaterials.createMaterials({
  blue: {
    diffuseColor: 'rgba(11, 127, 171, 1)',
  },
  label: {
    diffuseColor: 'rgba(196, 77, 86, 1)',
  },
});
