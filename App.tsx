import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ViroARSceneScreen from './src/pages/ViroARSceneScreen';
import SearchBottomSheet from './src/pages/SearchBottomSheet';
import {listProduct} from './src/data/ProductObject';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        {/* <SearchBottomSheet /> */}
        {/* <TestRedux /> */}
        <ViroARSceneScreen product={listProduct[0]} />
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
