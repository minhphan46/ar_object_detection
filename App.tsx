import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViroARNavigationPage from './src/pages/ViroARNavigationPage';
import HomePage from './src/pages/HomePage';
import ViroAR3DObjectPage from './src/pages/3DUiObjectPage';
import ViroARDetectionImagesPage from './src/pages/ViroARDetectionImagesPage';
import ViroARDetectionObjectPage from './src/pages/ViroARDetectionObjectPage';
import IntructionUserHandlePhone from './src/pages/InstructionDeviceDirectionPage';
import PositionPage from './src/pages/PositionPage';
import {ToastProvider} from 'react-native-toast-notifications';

export type RootStackParamList = {
  Home: undefined;
  Direction: undefined;
  DetectObject: undefined;
  Model3D: undefined;
  DetectImage: undefined;
  DeviceDirectionPage: undefined;
  Position: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <ToastProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
              <Stack.Screen
                name={'Home'}
                options={{
                  headerShown: false,
                }}
                component={HomePage}
              />
              <Stack.Screen
                name={'Direction' as never}
                options={{
                  title: 'Direction',
                }}
                component={ViroARNavigationPage}
              />
              <Stack.Screen
                name={'DetectObject'}
                options={{
                  title: 'Detect Products',
                }}
                component={ViroARDetectionObjectPage}
              />
              <Stack.Screen
                name={'Model3D'}
                options={{
                  title: 'Show 3D Product',
                }}
                component={ViroAR3DObjectPage}
              />
              <Stack.Screen
                name={'DetectImage'}
                options={{
                  title: 'Detect Images',
                }}
                component={ViroARDetectionImagesPage}
              />
              <Stack.Screen
                name={'DeviceDirectionPage'}
                options={{
                  title: 'Device Direction',
                }}
                component={IntructionUserHandlePhone}
              />
              <Stack.Screen
                name={'Position' as never}
                options={{
                  title: 'Get Position',
                }}
                component={PositionPage}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default App;
