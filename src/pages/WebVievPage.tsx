import {ViroARSceneNavigator} from '@viro-community/react-viro';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type WebScreenProps = NativeStackScreenProps<RootStackParamList, 'WebView'>;

function WebViewPage(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          uri: 'https://www.bachhoaxanh.com/nuoc-tra/tra-bi-dao-wonderfarm-lon-310ml-loc-6',
        }}
      />
    </SafeAreaView>
  );
}

export default WebViewPage;
