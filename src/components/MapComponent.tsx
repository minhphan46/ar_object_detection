import {View, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import {useAppDispatch, useAppSelector} from '../store/store';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const MapComponent = () => {
  const {direction, objectMapPosition} = useAppSelector(
    state => state.direction,
  );

  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);

  const handleUserLocationUpdate = (location: any) => {
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        compassEnabled={true}
        compassFadeWhenNorth={true}
        style={styles.map}>
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
          zoomLevel={18}
          heading={direction.heading}
          animationMode={'flyTo'}
          animationDuration={0}
          followUserMode={UserTrackingMode.FollowWithHeading}
          followHeading={0}
        />
        <PointAnnotation
          id="pointAnnotation"
          coordinate={[objectMapPosition.long, objectMapPosition.lat]}>
          <View></View>
        </PointAnnotation>
      </Mapbox.MapView>
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
