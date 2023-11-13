import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import NavigationPage from './NavigationPage';
import CompassObject from '../components/CompassObject';
import {ProductInfo, ProductPosition, listProduct} from '../data/ProductObject';
import {useAppDispatch, useAppSelector} from '../store/store';
import {useEffect} from 'react';
import {initPosition} from '../store/slices/direction_slice';
import {setSelectedProduct} from '../store/slices/list_product_slice';
import NavigationImagePage from './NavigationImagePage';

function ViroARSceneScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(setSelectedProduct({product: listProduct[0]}));
  const {selectedProduct} = useAppSelector(state => state.listProduct);
  const position = selectedProduct?.position;

  useEffect(() => {
    dispatch(initPosition({x: position!.x, y: position!.y, z: position!.z}));
  }, [dispatch, position!.x, position!.y, position!.z]);

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          //scene: NavigationPage,
          scene: NavigationImagePage,
        }}
        style={styles.rootContainer}
      />

      <View style={styles.fab3DButton}>
        <CompassObject />
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
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
