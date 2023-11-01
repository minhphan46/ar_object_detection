import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {StyleSheet} from 'react-native';
import DetectObject from './src/DetectObject';
import Ui3DObject from './src/3D_ui_object';
import {CanType} from './src/enum/3D_can_enum';

function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => {
          return (
            <Ui3DObject
              brandLabel={require('./assets/images/pepsi_label.jpg')}
              canType={CanType.can310}></Ui3DObject>
          );
        },
      }}
    />
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
