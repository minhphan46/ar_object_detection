import {
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import React from 'react';
import {StyleSheet} from 'react-native';
import ObjectDetectScreen from './src/object_detect_screen';

function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => <ObjectDetectScreen />,
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

