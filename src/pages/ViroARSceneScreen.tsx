import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import DetectObject from '../components/DetectObject';

function ViroARSceneScreen(): JSX.Element {
  function _onResetScene() {
    console.log(`onReset`);
    //navigation.navigate('YourScreen', {id: 2});
    //props.navigation.push('WebView');
  }
  let url =
    'https://www.bachhoaxanh.com/nuoc-tra/tra-bi-dao-wonderfarm-lon-310ml-loc-6';

  function handleClick() {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
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
          left: 20,
          right: 0,
          bottom: 30,
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <TouchableHighlight
          style={styles.buttons}
          onPress={handleClick}
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
});
