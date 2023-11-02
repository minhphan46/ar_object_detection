import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {StyleSheet} from 'react-native';
import Ui3DObject from './src/3D_ui_object';

function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: Ui3DObject,
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
