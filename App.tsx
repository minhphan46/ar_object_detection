import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import TestRedux from './src/pages/TestRedux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SearchBottomSheet from './src/pages/SearchBottomSheet';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        {/* <ViroARSceneScreen /> */}
        <SearchBottomSheet />
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
