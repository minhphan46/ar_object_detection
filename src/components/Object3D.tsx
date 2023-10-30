import {
  ViroMaterials,
  Viro3DObject,
} from '@viro-community/react-viro';
import React from 'react';

function Object3D() {
  ViroMaterials.createMaterials({
    blue: {
      diffuseTexture: require('../../assets/images/mocks/anime.jpg'),
    },
  });

  return (
    <Viro3DObject
      position={[0, 0, 0]}
      source={require('../../assets/model/can.obj')}
      type="OBJ"
      scale={[0.2, 0.2, 0.2]}
      rotation={[0, 90, 0]}
      materials={['blue']}
      dragPlane={{
        planeNormal: [0, 0, 0],
        planePoint: [0, 0, -2],
        maxDistance: 5,
      }}
      onDrag={event => console.log('Drag Event: bottle', event)}
    />
  );
}

export default Object3D;
