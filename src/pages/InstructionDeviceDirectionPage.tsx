import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {accelerometer} from 'react-native-sensors';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../store/store';
import LottieView from 'lottie-react-native';
import {
  convertDeg2Rad,
  getDirection,
  getStadingArea,
} from '../utils/get_angle_service';
import {
  updateDirection,
  updatePhoneDirection,
} from '../store/slices/direction_slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import CompassHeading from 'react-native-compass-heading';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDirectionPage'>;

export default function IntructionUserHandlePhone({navigation}: Props) {
  const dispatch = useAppDispatch();
  let isStanding = false;
  const [headingapp, setHeadingApp] = useState(-100);
  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setHeadingApp(heading);
    });

    const subscription = accelerometer.subscribe(({x, y, z}) => {
      isStanding = getStadingArea(y);
      if (isStanding) {
        if (headingapp > 355 || headingapp < 5) {
          dispatch(updatePhoneDirection({isStading: isStanding}));
          navigation.navigate('Direction');
          subscription.unsubscribe();
          CompassHeading.stop();
        }
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
        source={require('../../assets/lottie/ar_loti.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>Your Device Heading</Text>
      <Text style={styles.titleHeading}>{Math.round(headingapp)}°</Text>
      <Text style={styles.titleDes}>
        Please put the phone upright, the phone's frame is perpendicular to the
        ground, and heading number is 0°{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  titleHeading: {
    color: '#8C4CC7',
    fontSize: 50,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  titleDes: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 100,
    textAlign: 'center',
  },
});
