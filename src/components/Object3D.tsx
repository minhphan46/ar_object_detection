import {
  ViroMaterials,
  Viro3DObject,
  ViroNode,
  ViroAnimations,
} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {CanType, getCanSource, getZPosition} from '../enum/3D_can_enum';
import {ViroPinchState} from '@viro-community/react-viro/dist/components/Types/ViroEvents';
import {Viro3DPoint} from '@viro-community/react-viro/dist/components/Types/ViroUtils';
import {ImageSourcePropType} from 'react-native';

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
  const [onTap, setOnTap] = useState(true);
  function scaleCanObject(
    pinchState: ViroPinchState,
    scaleFactor: number,
  ): void {
    console.log(scaleFactor);
    console.log(pinchState);
    if (pinchState === 2) {
      if (scaleFactor < 2) {
        setZPosition(0);
        setOnTap(false);
      }
    }

    if (pinchState == 3) {
      // setZPosition(positionz);
      setOnTap(true);
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

  function onTouch(
    touchState: any,
    touchPos: Viro3DPoint,
    source: ImageSourcePropType,
  ): void {
    if (touchState == 1) {
      setOnTap(false);
    }
    if (touchState == 3) {
      setOnTap(true);
    }
  }

  return (
    <ViroNode position={[0, 0, z]}>
      <Viro3DObject
        onTouch={onTouch}
        source={getCanSource(props.canType)}
        materials={['label']}
        type="OBJ"
        animation={{name: 'loopRotate', run: true, loop: onTap}}
        onPinch={scaleCanObject}
      />
    </ViroNode>
  );
}

export default Object3D;
