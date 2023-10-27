import {
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import HelloWorldSceneAr from './src/helloworld';
import DetectLabel from './src/detect_label';

function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => <DetectLabel />,
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
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

