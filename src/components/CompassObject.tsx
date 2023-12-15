// Import React and React Native components
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updateDirection} from '../store/slices/direction_slice';

const CompassObject = () => {
  const {headingRealtime} = useAppSelector(state => state.direction);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const degree_update_rate = 1;
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      dispatch(updateDirection({heading, accuracy}));
    });

    return () => {
      CompassHeading.stop();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.angle}>{Math.round(direction.heading)}°</Text> */}
      <Text style={styles.direction}>Distance:</Text>
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
