import Geolocation from '@react-native-community/geolocation';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function GetPositionComponent() {
  const [position, setPosition] = useState<string | null>(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        //setPosition(JSON.stringify(pos));
        const {latitude, longitude} = pos.coords; // Trích xuất latitude và longitude
        setPosition(`Lat: ${latitude}\nLong: ${longitude}`);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.position}>{position}</Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  position: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
