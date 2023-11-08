import React from 'react';
import {
  Viro3DObject,
  ViroARCamera,
  ViroARScene,
  ViroBox,
  ViroMaterials,
  ViroNode,
} from '@viro-community/react-viro';
import {useAppSelector} from '../store/store';

function NavigationPage(): JSX.Element {
  const {objectPosition, isFindPositionObject} = useAppSelector(
    state => state.direction,
  );

  return (
    <ViroARScene>
      {isFindPositionObject ? (
        ShowModels(objectPosition)
      ) : (
        <ViroARCamera>{ShowModels(objectPosition)}</ViroARCamera>
      )}
    </ViroARScene>
  );
}

type GetArrowModelsProps = {
  x: number;
  y: number;
  z: number;
};

function ShowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, y, z} = props;

  return (
    <>
      <ViroNode
        position={[x, y, z]}
        onClickState={(stateValue, position, source) => {
          console.log('ClickState', stateValue, position, source);
        }}>
        <ViroBox materials={['label']} scale={[1, 1, 1]} rotation={[0, 0, 0]} />
        {/* <Viro3DObject
          key={Date.now.toString()}
          source={require('../../assets/model/can.obj')}
          type="OBJ"
          materials={['label']}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
        /> */}
      </ViroNode>
    </>
  );
}

function GetArrowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, z} = props;

  return (
    <>
      {[...Array(10)].map((_, i) => {
        <Viro3DObject
          key={i}
          source={require('../../assets/model/ball.obj')}
          type="OBJ"
          materials={['blue']}
          position={[(x / 10) * (i + 1), -1, (z / 10) * (i + 1)]}
          scale={[0.02, 0.02, 0.02]}
          rotation={[0, 0, -90]}
        />;
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
