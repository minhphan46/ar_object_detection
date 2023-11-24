import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const PositionPage = () => {
  const [position, setPosition] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState('');

  const getCurrentPosition = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
        //setPosition(JSON.stringify(pos));
        const {latitude, longitude} = pos.coords; // Trích xuất latitude và longitude
        setPosition(`Lat: ${latitude}\nLong: ${longitude}`);
        setLatitude(`${latitude}`);
        setLongitude(`${longitude}`);
        setLocationStatus('You are here');
      },
      error => {
        setLocationStatus(error.message);
        console.log(error);
      },
      {enableHighAccuracy: true},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
            }}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {latitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Latitude: {longitude}
          </Text>
          <View style={{marginTop: 20}}>
            <Button title="Refresh" onPress={getCurrentPosition} />
          </View>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          React Native Geolocation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PositionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center',
  },
});
