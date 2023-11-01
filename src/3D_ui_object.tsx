import {
  Viro3DObject,
  ViroARScene,
  ViroAmbientLight,
  ViroAnimations,
  ViroDirectionalLight,
  ViroMaterials,
  ViroNode,
  ViroOrbitCamera,
  ViroScene,
  ViroSkyBox,
  ViroText,
} from '@viro-community/react-viro';
import {ViroPinchState} from '@viro-community/react-viro/dist/components/Types/ViroEvents';
import {JSXElementConstructor, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CanType, getCanSource, getZPosition} from './enum/3D_can_enum';
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

var styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 200,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
function Ui3DObject(props: ObjectProps): JSX.Element {
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
  const positionz = getZPosition(props.canType);
  const [z, setZPosition] = useState(positionz);
  const [onTap, setOnTap] = useState(true);
  function scaleCanObject(
    pinchState: ViroPinchState,
    scaleFactor: number,
  ): void {
    console.log(scaleFactor);
    if (scaleFactor < 3) {
      setZPosition(z + scaleFactor);

      setOnTap(false);
    }

    if (pinchState == 3) {
      setZPosition(positionz);
      setOnTap(true);
    }
  }

  return (
    <ViroARScene style={styles.container}>
      <ViroSkyBox
        source={{
          nx: require('../assets/images/bg/grid_bg.jpg'),
          px: require('../assets/images/bg/grid_bg.jpg'),
          ny: require('../assets/images/bg/grid_bg.jpg'),
          py: require('../assets/images/bg/grid_bg.jpg'),
          nz: require('../assets/images/bg/grid_bg.jpg'),
          pz: require('../assets/images/bg/grid_bg.jpg'),
        }}
      />
      <ViroOrbitCamera
        position={[0, 0, z]}
        active={true}
        focalPoint={[0, 0, 0]}
      />
      <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

      <ViroAmbientLight color="#aaaaaa" />

      <ViroNode position={[0, 0, -1]}>
        <Viro3DObject
          source={getCanSource(props.canType)}
          materials={['label']}
          type="OBJ"
          animation={{name: 'loopRotate', run: true, loop: onTap}}
          onPinch={scaleCanObject}
        />
      </ViroNode>
    </ViroARScene>
  );
}

export default Ui3DObject;
