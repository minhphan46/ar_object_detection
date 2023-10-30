import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {StyleSheet} from 'react-native';
import DetectObject from './src/DetectObject';

function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: DetectObject,
      }}
      style={styles.rootContainer}
    />
  );
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
