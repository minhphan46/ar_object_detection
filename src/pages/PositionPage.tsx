import {View, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as turf from '@turf/turf';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  updateCurrentLocation,
  updateDistanceAndAngle,
} from '../store/slices/current_location_slice';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const PositionPage = () => {
  const dispatch = useAppDispatch();
  const {lat, long, distance, angle} = useAppSelector(
    state => state.currentLocation,
  );

  // list location.coords usestate
  const [locationCoords, setLocationCoords] = useState<any>([]);

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  const handleUserLocationUpdate = (location: any) => {
    console.log('location', location);
    dispatch(
      updateCurrentLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }),
    );
  };

  const addNewLocation = (latitude: number, longitude: number) => {
    setLocationCoords([
      ...locationCoords,
      {
        latitude,
        longitude,
      },
    ]);
    calculateDistance(latitude, longitude);
  };

  const calculateDistance = (latitude: number, longitude: number) => {
    const point1 = turf.point([long, lat]);
    const point2 = turf.point([longitude, latitude]);

    const distance2Point = turf.distance(point1, point2, {units: 'meters'});
    const angle2Point = calculateAngleBetween(point1, point2);
    console.log(angle2Point);
    if (angle2Point <= 90 || angle2Point >= 270) {
      let z = -distance2Point * Math.cos((angle2Point * Math.PI) / 180);
      let x = distance2Point * Math.sin((angle2Point * Math.PI) / 180);
      let y = 0;
      console.log(`x: ${x},y: ${y},z: ${z}`);
    } else if (angle2Point <= 180) {
      let z = -distance2Point * Math.cos((angle2Point * Math.PI) / 180);
      let x = distance2Point * Math.sin(((180 - angle2Point) * Math.PI) / 180);
      let y = 0;
      console.log(`x: ${x},y: ${y},z: ${z}`);
    } else {
      let z = -distance2Point * Math.cos((angle2Point * Math.PI) / 180);
      let x = -distance2Point * Math.sin((angle2Point - 180 * Math.PI) / 180);
      let y = 0;
      console.log(`x: ${x},y: ${y},z: ${z}`);
    }
    console.log(
      'Khoảng cách giữa hai điểm là:',
      distance2Point * 1000,
      'đơn vị.',
    );
    console.log('Angle:', angle2Point, 'độ.');

    dispatch(
      updateDistanceAndAngle({distance: distance2Point, angle: angle2Point}),
    );
  };

  const calculateAngleBetween = (position1: any, position2: any): number => {
    return turf.bearing(position1, position2);
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          compassEnabled={true}
          compassFadeWhenNorth={true}
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
            centerCoordinate={[long, lat]}
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
                {latitude: lat, longitude: long},
              ]);
            }}>
            {/*<Text>Add</Text>*/}
            <MaterialCommunityIcons
              name={'map-marker-plus-outline'}
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
