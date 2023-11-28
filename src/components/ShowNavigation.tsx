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
import {CanType, getCanSource} from '../data/enum/3DCanEnum';

type GetArrowModelsProps = {
  x: number;
  y: number;
  z: number;
  rotationX?: number;
};

function ShowNavigation(): JSX.Element {
  const {objectPosition, isFirstInit} = useAppSelector(
    state => state.direction,
  );

  const {position} = useAppSelector(state => state.currentLocation);

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
          active={isFirstInit}>
          <ShowModels
            x={position?.x ?? 0}
            y={position?.y ?? -1}
            z={position?.z ?? -1}
            rotationX={0}
          />
        </ViroCamera>
      ) : (
        <ViroSpinner type="light" position={[0, 0, -2]} />
      )}
    </ViroARScene>
  );
}

export function ShowModels(props: GetArrowModelsProps) {
  const {x, y, z} = props;
  const [rotationX, setRotationX] = useState<number>(0);

  const {selectedProduct} = useAppSelector(state => state.listProduct);

  useEffect(() => {
    const rad = Math.atan2(x, z);
    setRotationX(() => 180 - getRad2deg(rad));
  }, [x, z]);

  ViroMaterials.createMaterials({
    blue: {
      diffuseColor: 'rgba(11, 127, 171, 1)',
    },
    label: {
      diffuseColor: 'rgba(171,171,171,1)',
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
      diffuseTexture: selectedProduct?.canObject[0].brandLabel,
      specularTexture: selectedProduct?.canObject[0].brandLabel,
    },
  });

  return (
    <>
      <GetArrowModels x={x} y={y} z={z} rotationX={rotationX} />

      <ViroNode
        position={[x, y, z]}
        onClickState={(stateValue, position, source) => {
          console.log('ClickState', stateValue, position, source);
        }}>
        <Viro3DObject
          source={getCanSource(CanType.can250)}
          materials={['label']}
          type="OBJ"
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 0]}
        />
      </ViroNode>
    </>
  );
}

function GetArrowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, y, z, rotationX} = props;

  const numArrow = 5;

  return (
    <>
      {[...Array(numArrow)].map((_, i) => {
        return (
          <Viro3DObject
            key={i}
            source={require('../../assets/model/direction_arrow.obj')}
            type="OBJ"
            materials={['blue']}
            position={[(x / numArrow) * i, y - 0.2, (z / numArrow) * i]}
            scale={[0.02, 0.02, 0.02]}
            rotation={[rotationX ?? 0, 0, -90]}
          />
        );
      })}
    </>
  );
}

export default ShowNavigation;
