import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {accelerometer} from 'react-native-sensors';
import {useAppDispatch} from '../store/store';
import LottieView from 'lottie-react-native';
import {getStadingArea} from '../utils/get_angle_service';
import {
  updateCurrentPosition,
  updateDirection,
  updatePhoneDirection,
} from '../store/slices/direction_slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import CompassHeading from 'react-native-compass-heading';
import Mapbox, {UserLocationRenderMode} from '@rnmapbox/maps';
import {Divider} from '@rneui/base';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDirectionPage'>;

export default function IntructionUserHandlePhone({navigation}: Props) {
  const dispatch = useAppDispatch();
  let isStanding = false;

  const [headingapp, setHeadingApp] = useState(100);
  const [currentLocation, setCurrentLocation] = useState<number[]>([0, 0]);
  let headingCur = 0;
  let accuracyCur = 0;

  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      headingCur = heading;
      accuracyCur = accuracy;
      setHeadingApp(heading);
    });

    const subscription = accelerometer.subscribe(({x, y, z}) => {
      isStanding = getStadingArea(y);

      if (isStanding) {
        if (headingapp === 0) {
          dispatch(updatePhoneDirection({isStading: isStanding}));
          dispatch(
            updateDirection({heading: headingCur, accuracy: accuracyCur}),
          );
          navigation.replace('Direction');
          subscription.unsubscribe();
          CompassHeading.stop();
        }
      }
    });

    return () => {
      subscription.unsubscribe(); // Hủy lắng nghe khi component unmount
    };
  }, [headingapp]);

  const handleUserLocationUpdate = (location: any) => {
    setCurrentLocation([location.coords.longitude, location.coords.latitude]);
    dispatch(
      updateCurrentPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottieView}
        source={require('../../assets/lottie/ar_loti.json')}
        autoPlay
        loop
      />
      <Text style={styles.title}>Your Device Heading</Text>
      <Text style={styles.titleHeading}>{Math.round(headingapp)}°</Text>
      <Text style={styles.titleDes}>
        Please put the phone upright, the phone's frame is perpendicular to the
        ground, and heading number is 0°
      </Text>
      <Divider />
      <Text style={styles.subTitleDes}>
        Your current location:
        {currentLocation[0]} - {currentLocation[1]}
      </Text>
      <Mapbox.UserLocation
        minDisplacement={1}
        onUpdate={handleUserLocationUpdate}
        showsUserHeadingIndicator={true}
        androidRenderMode="gps"
        renderMode={UserLocationRenderMode.Normal}
        requestsAlwaysUse={true}
        visible={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottieView: {
    flex: 1,
  },
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
    marginBottom: 50,
    textAlign: 'center',
  },
  subTitleDes: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
