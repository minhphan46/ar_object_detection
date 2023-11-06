import React from 'react';
import ViroARSceneScreen from './src/pages/ViroARSceneScreen';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import TestRedux from './src/pages/TestRedux';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Provider store={store}>
        {/* <ViroARSceneScreen /> */}
        <TestRedux />
      </Provider>
    </SafeAreaView>
  );
}

export default App;
