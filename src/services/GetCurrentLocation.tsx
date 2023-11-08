import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

export default function GetCurrentLocationExample() {
  const [position, setPosition] = useState<string | null>(null);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        setPosition(JSON.stringify(pos));
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    setInterval(function () {
      getCurrentPosition();
    }, 100);
  }, []);

  return (
    <View>
      <Text>
        <Text style={styles.title}>Current position: </Text>
        {position}
      </Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
