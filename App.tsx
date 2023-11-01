import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import DetectObject from './src/components/DetectObject';
import ViroARSceneScreen from './src/pages/ViroARSceneScreen';
import WebViewPage from './src/pages/WebVievPage';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  ViroScene: undefined;
  WebView: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ViroScene"
          component={ViroARSceneScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewPage}
          options={{title: 'Webview Page'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
