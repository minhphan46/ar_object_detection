import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import DetectObject from '../components/DetectObject';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type ViroARScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ViroScene'
>;

const ViroARSceneScreen: React.FC<ViroARScreenProps> = props => {
  function _onResetScene() {
    console.log(`onReset`);
    //navigation.navigate('YourScreen', {id: 2});
    props.navigation.push('WebView');
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
          onPress={_onResetScene}
          underlayColor={'#00000000'}>
          <Image
            source={require('../../assets/images/mocks/btn_mode_objects.png')}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

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
