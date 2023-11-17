import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroMaterials,
  ViroOrbitCamera,
  ViroSkyBox,
} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import {CanType} from '../data/enum/3DCanEnum';
import Object3D from '../components/Object3D';
import React from 'react';
import {useAppSelector} from '../store/store';

export default function ViroAR3DObjectPage() {
  const {selectedProduct} = useAppSelector(state => state.listProduct);

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => (
            <Ui3DObjectPage
              label={selectedProduct?.canObject[0].brandLabel}
              canType={selectedProduct?.canObject[0].type}
            />
          ),
        }}
        style={styles.rootContainer}
      />
    </View>
  );
}

interface Ui3DObjectProps {
  label: any;
  canType: CanType | undefined;
}

class Ui3DObjectPage extends React.Component<Ui3DObjectProps> {
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
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
