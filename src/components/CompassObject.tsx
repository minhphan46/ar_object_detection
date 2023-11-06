// Import React and React Native components
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getDirection} from '../services/get_angle_service';
import CompassHeading from 'react-native-compass-heading';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updateDirection} from '../store/slices/direction_slice';

const CompassObject = () => {
  const {direction} = useAppSelector(state => state.direction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const degree_update_rate = 3;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      console.log('CompassHeading: ', heading, accuracy);
      dispatch(updateDirection({heading, accuracy}));
    });

    return () => {
      CompassHeading.stop();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.angle}>{Math.round(direction.heading)}°</Text>
      <Text style={styles.direction}>{getDirection(direction.heading)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  angle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  direction: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CompassObject;
