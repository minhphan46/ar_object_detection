import {
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroMaterials,
  ViroOrbitCamera,
  ViroSkyBox,
} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';
import {CanType} from '../enum/3DCanEnum';
import Object3D from '../components/Object3D';
import React from 'react';

interface Ui3DObjectProps {
  label: any;
  canType: CanType | undefined;
}

class Ui3DObject extends React.Component<Ui3DObjectProps> {
  render(): React.ReactNode {
    const {label} = this.props;
    const {canType} = this.props;
    ViroMaterials.createMaterials({
      ddd: {
        diffuseTexture:
          label ??
          require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
        specularTexture:
          label ??
          require('../../assets/images/soft_drink_label/pepsi_label.jpg'),
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
          brandLabel={
            label ??
            require('../../assets/images/soft_drink_label/pepsi_label.jpg')
          }
          canType={canType ?? CanType.can310}
        />
      </ViroARScene>
    );
  }
}

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
