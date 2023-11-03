import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import DetectObject from './DetectObject';
import Ui3DObject from './3DUiObject';

function ViroARSceneScreen(): JSX.Element {
  function _onResetScene() {
    console.log('onReset');
    //navigation.navigate('YourScreen', {id: 2});
    //props.navigation.push('WebView');
  }

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => DetectObject({sceneNavigator: []}),
          //scene: () => Ui3DObject({sceneNavigator: []}),
        }}
        style={styles.rootContainer}
      />

      <View style={styles.fab3DButton}>
        <TouchableHighlight
          style={styles.buttons}
          onPress={_onResetScene}
          underlayColor={'#00000000'}>
          <Image
            source={require('../../assets/images/mocks/btn_mode_objects.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ViroARSceneScreen;

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
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
