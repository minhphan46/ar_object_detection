import {
  ViroMaterials,
  Viro3DObject,
  ViroNode,
  ViroAnimations,
} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {
  CanType,
  getCanSource,
  getYPosition,
  getZPosition,
  getZoomInObject,
} from '../data/enum/3DCanEnum';
import {ViroPinchState} from '@viro-community/react-viro/dist/components/Types/ViroEvents';

type ObjectProps = {
  brandLabel: any;
  canType: CanType;
};
ViroAnimations.registerAnimations({
  loopRotate: {
    properties: {
      rotateY: '+=45',
    },
    duration: 1000,
  },
});
function Object3D(props: ObjectProps) {
  const positionz = getZPosition(props.canType);
  const [z, setZPosition] = useState(positionz);
  const [isRotate, setRotate] = useState(true);
  function scaleCanObject(
    pinchState: ViroPinchState,
    scaleFactor: number,
  ): void {
    if (pinchState === 2) {
      if (scaleFactor > 1) {
        setZPosition(getZoomInObject(props.canType));
        setRotate(false);
      } else {
        setZPosition(getZPosition(props.canType));
      }
    }

    if (pinchState === 3) {
      // setZPosition(positionz);
      setRotate(true);
    }
  }
  ViroMaterials.createMaterials({
    label: {
      lightingModel: 'Blinn',
      diffuseColor: 'rgba(171,171,171,1)',
      diffuseTexture: props.brandLabel,
      specularTexture: props.brandLabel,
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
    },
  });

  return (
    <ViroNode
      position={[0, getYPosition(props.canType), z]}
      onClickState={(stateValue, _, __) => {
        if (stateValue === 1) {
          setRotate(false);
          // Click Down
        }
        if (stateValue === 2) {
          setRotate(true);
          // Click Up
        }
      }}>
      <Viro3DObject
        source={getCanSource(props.canType)}
        materials={['label']}
        type="OBJ"
        animation={{name: 'loopRotate', run: true, loop: isRotate}}
        onPinch={scaleCanObject}
      />
    </ViroNode>
  );
}

export default Object3D;
