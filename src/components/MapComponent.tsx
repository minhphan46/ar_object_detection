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
import {handleShortestPoint} from '../utils/find_shortest_service';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const MapComponent = () => {
  // draw poly line
  const [listPoint, setListPoint] = useState<any>([]);

  const {direction, objectMapPosition} = useAppSelector(
    state => state.direction,
  );

  const [isTouch, setIsTouch] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);

  let lineCoordinates = [
    [longitude, latitude],
    [objectMapPosition.long, objectMapPosition.lat],
  ];

  const handleUserLocationUpdate = (location: any) => {
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    const shortestPath = handleShortestPoint(
      [objectMapPosition.long, objectMapPosition.lat],
      [location.coords.longitude, location.coords.latitude],
    );
    setListPoint(shortestPath);

    lineCoordinates = [
      [longitude, latitude],
      [objectMapPosition.long, objectMapPosition.lat],
    ];
  };

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        // compassEnabled={true}
        // compassFadeWhenNorth={true}
        logoEnabled={false}
        styleURL="https://wsmap.tgdd.vn/vector_style/mwg-map-style/osm_liberty.json"
        rotateEnabled={true}
        zoomEnabled={true}
        style={styles.map}
        onTouchMove={() => {
          setIsTouch(true);
        }}>
        <Mapbox.UserLocation
          minDisplacement={10}
          onUpdate={handleUserLocationUpdate}
          showsUserHeadingIndicator={true}
          androidRenderMode="compass"
          renderMode={UserLocationRenderMode.Normal}
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
            zoomLevel={19}
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

        <Mapbox.ShapeSource
          id="online"
          shape={{type: 'LineString', coordinates: listPoint}}>
          <Mapbox.LineLayer
            id="line"
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
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    bottom: 30,
    right: 20,
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
