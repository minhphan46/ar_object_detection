import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import * as turf from '@turf/turf';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const PositionPage = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  // list location.coords usestate
  const [locationCoords, setLocationCoords] = useState<any>([]);

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  const handleUserLocationUpdate = (location: any) => {
    console.log('location', location);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const addNewLocation = (lat: number, long: number) => {
    setLocationCoords([
      ...locationCoords,
      {
        latitude: lat,
        longitude: long,
      },
    ]);
    caculateDistance(lat, long);
  };

  const caculateDistance = (lat: number, long: number) => {
    const point1 = turf.point([longitude, latitude]);
    const point2 = turf.point([long, lat]);

    const distance = turf.distance(point1, point2);
    console.log('Khoảng cách giữa hai điểm là:', distance * 1000, 'đơn vị.');
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          onPress={(feature: any) => {
            const {coordinates} = feature.geometry;
            if (coordinates) {
              addNewLocation(coordinates[1], coordinates[0]);
            }
          }}>
          <Mapbox.UserLocation
            minDisplacement={1}
            onUpdate={handleUserLocationUpdate}
            showsUserHeadingIndicator={true}
            androidRenderMode="gps"
            renderMode={UserLocationRenderMode.Normal}
            requestsAlwaysUse={true}
            visible={true}
          />
          <Mapbox.Camera
            centerCoordinate={[longitude, latitude]}
            zoomLevel={20}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserMode={UserTrackingMode.FollowWithHeading}
            followHeading={0}
          />
          {locationCoords.map((item: any, index: number) => {
            return (
              <PointAnnotation
                key={index.toString()}
                id="pointAnnotation"
                coordinate={[item.longitude, item.latitude]}
                onSelected={() => console.log('onSelected')}>
                <Mapbox.Callout
                  title={`long: ${item.longitude} \nlat: ${item.latitude}`}
                />
              </PointAnnotation>
            );
          })}
        </Mapbox.MapView>
        <Pressable
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
          }}
          onPress={() => addNewLocation(latitude, longitude)}>
          <Text>Add</Text>
        </Pressable>
      </View>
    </View>
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
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});
