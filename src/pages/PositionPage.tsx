import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapboxGL from '@rnmapbox/maps';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(token);
MapboxGL.setConnected(true);

const PositionPage = () => {
  const [position, setPosition] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    return () => {
      MapboxGL.setTelemetryEnabled(false);
    };
  }, []);

  const getCurrentPositionGeoLocation = () => {
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

  const getCurrentPositionMapBox = () => {
    setLocationStatus('Getting Location ...');
  };

  return (
    <View style={styles.page}>
      <View style={styles.container1}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
    // <SafeAreaView style={{flex: 1}}>
    //   <View style={styles.container}>
    //   <View style={styles.container}>
    //     <Image
    //       source={{
    //         uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
    //       }}
    //       style={{width: 100, height: 100}}
    //     />
    //     <Text style={styles.boldText}>{locationStatus}</Text>
    //     <Text
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginTop: 16,
    //       }}>
    //       Longitude: {latitude}
    //     </Text>
    //     <Text
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginTop: 16,
    //       }}>
    //       Latitude: {longitude}
    //     </Text>
    //     <View style={{marginTop: 20}}>
    //       <Button title="Refresh" onPress={getCurrentPosition} />
    //     </View>
    //   </View>
    //   <Text
    //     style={{
    //       fontSize: 18,
    //       textAlign: 'center',
    //       color: 'grey',
    //     }}>
    //     React Native Geolocation
    //   </Text>
    //   <Text
    //     style={{
    //       fontSize: 16,
    //       textAlign: 'center',
    //       color: 'grey',
    //     }}>
    //     www.aboutreact.com
    //   </Text>
    // </View>
    // </SafeAreaView>
  );
};

export default PositionPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container1: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
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
