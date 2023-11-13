import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ViroARSceneScreen from './src/pages/ViroARSceneScreen';
import {HomePage} from './src/pages/HomePage';

export type RootStackParamList = {
  Home: undefined;
  Direction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen name={'Home'} component={HomePage} />
            <Stack.Screen name={'Direction'} component={ViroARSceneScreen} />
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
