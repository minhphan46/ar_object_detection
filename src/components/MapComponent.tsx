import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import {useAppDispatch, useAppSelector} from '../store/store';
import {handleShortestPoint} from '../utils/find_shortest_service';
import {updateCurrentPosition} from '../store/slices/direction_slice';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const MapComponent = () => {
  const dispatch = useAppDispatch();

  // draw poly line
  const [listPoint, setListPoint] = useState<any>([]);

  const {headingRealtime, objectMapPosition} = useAppSelector(
    state => state.direction,
  );

  const sheet1: number[][] = [
    [106.797522, 10.8516194],
    [106.79754673544875, 10.851600225217368],
    [106.79742286306043, 10.851474773759378],
    //106.7974473, 10.851505
    [106.7973972947866, 10.85149518882065],
    //106.79742564511571, 10.851522919259551
  ];
  const listSheet: number[][][] = [sheet1];

  const [isTouch, setIsTouch] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<any>(0);
  const [longitude, setLongitude] = useState<any>(0);

  const handleUserLocationUpdate = (location: any) => {
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    const shortestPath = handleShortestPoint(
      [objectMapPosition.long, objectMapPosition.lat],
      [location.coords.longitude, location.coords.latitude],
    );
    setListPoint(shortestPath);

    dispatch(
      updateCurrentPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }),
    );
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
          minDisplacement={0.5}
          onUpdate={handleUserLocationUpdate}
          showsUserHeadingIndicator={true}
          androidRenderMode="compass"
          renderMode={UserLocationRenderMode.Native}
          requestsAlwaysUse={true}
          visible={true}
        />
        {listSheet.map(e => {
          return (
            <Mapbox.ShapeSource
              key={e[0].toString()}
              id={e[0].toString()}
              shape={{type: 'LineString', coordinates: e}}>
              <Mapbox.FillLayer
                id={e[0].toString()}
                style={{
                  fillColor: '#527853',
                }}
              />
            </Mapbox.ShapeSource>
          );
        })}

        {isTouch ? (
          <Mapbox.Camera
            centerCoordinate={[longitude, latitude]}
            heading={headingRealtime}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserMode={UserTrackingMode.FollowWithHeading}
            followHeading={0}
          />
        ) : (
          <Mapbox.Camera
            centerCoordinate={[longitude, latitude]}
            zoomLevel={19}
            heading={headingRealtime}
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
