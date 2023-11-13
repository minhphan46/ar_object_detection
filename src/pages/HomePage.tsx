import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useAppDispatch} from '../store/store';
import {setSelectedProduct} from '../store/slices/list_product_slice';
import {initPosition} from '../store/slices/direction_slice';
import {listProduct} from '../data/ProductObject';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomePage({navigation}: Props) {
  const dispatch = useAppDispatch();
  const onClick = () => {
    const selectProduct = listProduct[0];
    dispatch(setSelectedProduct({product: selectProduct}));
    dispatch(
      initPosition({
        x: selectProduct.position.x,
        y: selectProduct.position.y,
        z: selectProduct.position.z,
      }),
    );
    navigation.navigate('Direction');
  };

  return (
    <View style={styles.rootContainer}>
      <TouchableOpacity style={styles.buttonStyle} onPress={onClick}>
        <Text style={styles.contentText}>Search Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  buttonStyle: {
    marginTop: 20,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#B1DBFB',
  },
  contentText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
});
