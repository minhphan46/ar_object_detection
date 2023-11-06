// Import React and React Native components
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Import react-native-sensors
import {magnetometer} from 'react-native-sensors';
import {getRad2deg, getDirection} from '../services/get_angle_service';
import CompassHeading from 'react-native-compass-heading';

const CompassObject = () => {
  // Define a state variable to store the direction
  const [direction, setDirection] = useState(0);

  const initAngle = 130;

  // Define an effect hook to subscribe to the magnetometer data
  // useEffect(() => {
  //   // Set up a subscription to the magnetometer data
  //   const subscription = magnetometer.subscribe(({x, y}) => {
  //     // Calculate the angle of the device based on the x and y values
  //     let angle = Math.atan2(y, x);
  //     // Convert the angle from radians to degrees
  //     angle = getRad2deg(angle);
  //     // Adjust the angle to match the compass directions
  //     angle += initAngle;
  //     if (angle > 360) {
  //       angle -= 360;
  //     }
  //     // Update the direction state variable with the angle
  //     setDirection(-angle);
  //   });

  //   // Return a cleanup function to unsubscribe from the magnetometer data
  //   return () => subscription.unsubscribe();
  // }, []);

  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      console.log('CompassHeading: ', heading, accuracy);
      setDirection(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  // Return the JSX elements to render
  return (
    <View style={styles.container}>
      <Text style={styles.angle}>{Math.round(direction)}°</Text>
      <Text style={styles.direction}>{getDirection(direction)}</Text>
    </View>
  );
};

// Define the styles
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
