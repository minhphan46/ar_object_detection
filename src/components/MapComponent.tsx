import {View, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import {useAppDispatch, useAppSelector} from '../store/store';
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

  const [isShow, setIsShow] = useState(false);

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

  return isShow ? (
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