import {View, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  LineLayer,
  PointAnnotation,
  ShapeSource,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import {useAppSelector} from '../store/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const MapComponent = () => {
  const {direction, objectMapPosition} = useAppSelector(
    state => state.direction,
  );

  const [isShow, setIsShow] = useState<boolean>(true);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);

  const handleUserLocationUpdate = (location: any) => {
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  const lineCoordinates = [
    [longitude, latitude],
    [objectMapPosition.long, objectMapPosition.lat],
  ];

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  return isShow ? (
    <View style={styles.container}>
      <Mapbox.MapView
        // compassEnabled={true}
        // compassFadeWhenNorth={true}
        style={styles.map}
        onTouchMove={() => {
          setIsTouch(true);
        }}>
        <Mapbox.UserLocation
          minDisplacement={10}
          onUpdate={handleUserLocationUpdate}
          showsUserHeadingIndicator={true}
          androidRenderMode="compass"
          renderMode={UserLocationRenderMode.Native}
          requestsAlwaysUse={true}
          visible={true}
        />
        {isTouch ? (
          <Mapbox.Camera
            centerCoordinate={[longitude, latitude]}
            heading={direction.heading}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserMode={UserTrackingMode.FollowWithHeading}
            followHeading={0}
          />
        ) : (
          <Mapbox.Camera
            centerCoordinate={[longitude, latitude]}
            zoomLevel={18}
            heading={direction.heading}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserMode={UserTrackingMode.FollowWithHeading}
            followHeading={0}
          />
        )}
        <PointAnnotation
          id="pointAnnotation"
          coordinate={[objectMapPosition.long, objectMapPosition.lat]}>
          <View />
        </PointAnnotation>
        <Mapbox.ShapeSource
          id="lineSource"
          shape={{type: 'LineString', coordinates: lineCoordinates}}>
          <Mapbox.LineLayer
            id="lineLayer"
            style={{
              lineColor: '#6DB9EF',
              lineWidth: 2,
              lineCap: 'round',
              lineJoin: 'round',
              lineDasharray: [0, 3],
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
      <View style={styles.minusButton}>
        <Pressable
          onPress={() => {
            setIsShow(false);
          }}>
          <MaterialCommunityIcons
            name={'chevron-down'}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.buttons}>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => {
          setIsShow(true);
          setIsTouch(false);
        }}>
        <MaterialCommunityIcons name={'map'} size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 150,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    borderRadius: 16,
  },
  minusButton: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    top: 3,
  },
  buttons: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 50,
    opacity: 0.5,
    backgroundColor: 'black',
    color: 'white',
  },
});
