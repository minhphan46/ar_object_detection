import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import DetectObject from './src/DetectObject';

function App(): JSX.Element {
  function _onResetScene() {
    console.log(`onReset`);
  }

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: DetectObject,
        }}
        style={styles.rootContainer}
      />

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 77,
          alignItems: 'center',
        }}>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onResetScene}
          underlayColor={'#00000000'}>
          <Image
            source={require('./assets/images/mocks/btn_mode_objects.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
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
});
