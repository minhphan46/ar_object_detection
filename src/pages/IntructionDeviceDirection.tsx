import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {accelerometer} from 'react-native-sensors';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../store/store';
import LottieView from 'lottie-react-native';
import {getStadingArea} from '../utils/get_angle_service';
import {
  initPosition,
  updatePhoneDirection,
} from '../store/slices/direction_slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {setSelectedProduct} from '../store/slices/list_product_slice';
import {NavigationAction, useRoute} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDirectionPage'>;

export default function IntructionUserHandlePhone({navigation, route}: Props) {
  const chooseProduct = route.params.direction;
  const dispatch = useAppDispatch();
  let isStanding = false;
  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      isStanding = getStadingArea(y);
      if (isStanding) {
        dispatch(updatePhoneDirection({isStading: isStanding}));
        dispatch(setSelectedProduct({product: chooseProduct}));
        dispatch(
          initPosition({
            x: chooseProduct.position.x,
            y: chooseProduct.position.y,
            z: chooseProduct.position.z,
          }),
        );
        navigation.navigate('Direction');
        subscription.unsubscribe();
      }
    });

    return () => {
      subscription.unsubscribe(); // Hủy lắng nghe khi component unmount
    };
  });

  return (
    <View style={styles.container}>
      <LottieView
        style={{flex: 1}}
        source={require('../../assets/lottie/up_lottie.json')}
        autoPlay
        loop
      />
      <Text style={styles.titleText}>
        Please put the phone upright, the phone's frame is perpendicular to the
        ground{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center',
  },
});
