import {View, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as turf from '@turf/turf';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const PositionPage = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [bearing, setBearing] = useState<number>(0);

  const lat = 10.851753;
  const long = 106.797441;

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

  const calculateAngleBetween = () => {
    const position1 = turf.point([longitude, latitude]);
    const position2 = turf.point([long, lat]);

    const bearing = turf.bearing(position1, position2);

    console.log((bearing + 360) % 360);

    setBearing((bearing + 360) % 360);
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
        <View style={styles.buttons}>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setLocationCoords([
                ...locationCoords,
                {latitude: latitude, longitude: longitude},
              ]);
            }}>
            {/*<Text>Add</Text>*/}
            <MaterialCommunityIcons
              name={'map-marker-plus-outline'}
              size={24}
              color="#fff"
            />
          </Pressable>
          <Pressable
            style={styles.buttonContainer}
            onPress={calculateAngleBetween}>
            {/*<Text>Degree</Text>*/}
            <MaterialCommunityIcons
              name={'angle-acute'}
              size={24}
              color="#fff"
            />
          </Pressable>
        </View>
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
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    right: 20,
  },
  buttonContainer: {
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'tomato',
    color: 'white',
  },
});
