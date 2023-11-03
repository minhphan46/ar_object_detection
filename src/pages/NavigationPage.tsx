import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  ViroARScene,
  ViroText,
  ViroTrackingState,
} from '@viro-community/react-viro';

const NavigationPage = () => {
  const [text, setText] = useState('Initializing AR...');

  return (
    <ViroARScene>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default NavigationPage;

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
