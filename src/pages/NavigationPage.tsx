import React, {useEffect, useState} from 'react';
import {
  Viro3DObject,
  ViroARScene,
  ViroCamera,
  ViroMaterials,
  ViroNode,
  ViroSpinner,
} from '@viro-community/react-viro';
import {useAppSelector} from '../store/store';
import {getRad2deg} from '../utils/get_angle_service';

type GetArrowModelsProps = {
  x: number;
  y: number;
  z: number;
  rotationX?: number;
};

function NavigationPage(): JSX.Element {
  const {objectPosition, isFindPositionObject} = useAppSelector(
    state => state.direction,
  );

  const [camera, setCamera] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCamera(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ViroARScene>
      {camera ? (
        <ViroCamera
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          active={!isFindPositionObject}>
          <ShowModels
            x={objectPosition.x}
            y={objectPosition.y}
            z={objectPosition.z}
            rotationX={0}
          />
        </ViroCamera>
      ) : (
        <ViroSpinner type="light" position={[0, 0, -2]} />
      )}
    </ViroARScene>
  );
}

function ShowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, y, z} = props;
  const [rotationX, setRotationX] = useState<number>(0);

  useEffect(() => {
    const rad = Math.atan2(x, z);
    setRotationX(() => 180 - getRad2deg(rad));
  }, [x, z]);

  return (
    <>
      <GetArrowModels x={x} y={y} z={z} rotationX={rotationX} />

      <ViroNode
        position={[x, y, z]}
        onClickState={(stateValue, position, source) => {
          console.log('ClickState', stateValue, position, source);
        }}>
        {/* <ViroBox materials={['label']} scale={[1, 1, 1]} rotation={[0, 0, 0]} /> */}
        <Viro3DObject
          key={Date.now.toString()}
          source={require('../../assets/model/can.obj')}
          type="OBJ"
          materials={['label']}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
        />
      </ViroNode>
    </>
  );
}

function GetArrowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, z, rotationX} = props;

  return (
    <>
      {[...Array(10)].map((_, i) => {
        return (
          <Viro3DObject
            key={i}
            source={require('../../assets/model/direction_arrow.obj')}
            type="OBJ"
            materials={['blue']}
            position={[(x / 10) * i, -1, (z / 10) * i]}
            scale={[0.02, 0.02, 0.02]}
            rotation={[rotationX ?? 0, 0, -90]}
          />
        );
      })}
    </>
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
