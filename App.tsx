import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViroARSceneScreen from './src/pages/ViroARSceneScreen';
import CustomBottomSheet from './src/pages/CustomBottomSheet';
import ViroARDetectionPage from './src/pages/ViroARDetectionPage';
import ViroAR3DObject from './src/pages/3DUiObjectPage';

export type RootStackParamList = {
  Home: undefined;
  Direction: undefined;
  Detect: undefined;
  Model3D: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen
              name={'Home'}
              options={{
                headerShown: false,
              }}
              component={CustomBottomSheet}
            />
            <Stack.Screen name={'Direction'} component={ViroARSceneScreen} />
            <Stack.Screen name={'Detect'} component={ViroARDetectionPage} />
            <Stack.Screen name={'Model3D'} component={ViroAR3DObject} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
export default App;
