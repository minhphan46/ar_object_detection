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
import {StyleSheet} from 'react-native';
import {CanType} from '../enum/3DCanEnum';
import Object3D from '../components/Object3D';

const Ui3DObject = (props: {sceneNavigator: {scene: any}[]}) => {
  ViroMaterials.createMaterials({
    ddd: {
      diffuseTexture: require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
      specularTexture: require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
    },
  });

  return (
    <ViroARScene style={styles.container}>
      <ViroSkyBox
        source={{
          nx: require('../../assets/images/bg/grid_bg.jpg'),
          px: require('../../assets/images/bg/grid_bg.jpg'),
          ny: require('../../assets/images/bg/grid_bg.jpg'),
          py: require('../../assets/images/bg/grid_bg.jpg'),
          nz: require('../../assets/images/bg/grid_bg.jpg'),
          pz: require('../../assets/images/bg/grid_bg.jpg'),
        }}
      />
      <ViroOrbitCamera
        position={[0, 0, 1]}
        active={true}
        focalPoint={[0, 0, 0]}
      />
      <ViroDirectionalLight direction={[0, 0, -1]} color="#ffffff" />

      <ViroAmbientLight color="#aaaaaa" />

      <Object3D
        brandLabel={require('../../assets/images/soft_drink_label/pepsi_label.jpg')}
        canType={CanType.can310}
      />
    </ViroARScene>
  );
};

export default Ui3DObject;

const styles = StyleSheet.create({
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
