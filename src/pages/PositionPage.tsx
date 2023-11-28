import {View, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updateCurrentPosition} from '../store/slices/direction_slice';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const PositionPage = () => {
  const dispatch = useAppDispatch();
  const {currentPosition} = useAppSelector(state => state.direction);
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
      updateCurrentPosition({
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
            centerCoordinate={[currentPosition.long, currentPosition.lat]}
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
        <View style={styles.buttons}>
          <Pressable
            style={styles.buttonContainer}
            onPress={() => {
              setLocationCoords([
                ...locationCoords,
                {
                  latitude: currentPosition.lat,
                  longitude: currentPosition.long,
                },
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
