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
import {Graph, dijkstra, get2ClosetPoint} from '../utils/dijisktra_author';
import * as turf from '@turf/turf';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);
Mapbox.setConnected(true);

const PositionPage = () => {
  const sheet1: number[][] = [
    [106.79740457502515, 10.85172355871687],
    [106.79757869674495, 10.851595661527526],
    [106.79755570636263, 10.851576845471499],
    [106.79738519450387, 10.851710063039576],
    // Thêm các tọa độ khác nếu cần
  ];
  const sheet2: number[][] = [
    [106.79733822269765, 10.85164741024289],
    [106.79749775749605, 10.851544990039613],
    [106.79746745153324, 10.851516471090179],
    [106.79731341611216, 10.851620711977247],
  ];
  const sheet3: number[][] = [
    [106.79727888665269, 10.851569548403674],
    [106.79725299153813, 10.851552043927725],
    [106.79739803464855, 10.851465951511756],
    [106.79743520237588, 10.851487025489277],
  ];
  const sheet4: number[][] = [
    [106.79719966628062, 10.851480016655785],
    [106.79732345543505, 10.85140667337869],
    [106.79735099285693, 10.851429210870506],
    [106.79722535336106, 10.851497386843036],
  ];
  const listSheet: number[][][] = [sheet1, sheet2, sheet3, sheet4];

  const dispatch = useAppDispatch();
  const {currentPosition} = useAppSelector(state => state.direction);
  const [locationCoords, setLocationCoords] = useState<any>([]);

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  const handleUserLocationUpdate = (location: any) => {
    dispatch(
      updateCurrentPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }),
    );
  };

  const addNewLocation = (latitude: number, longitude: number) => {
    // console.log('--------------');
    // console.log(
    //   turf.distance([longitude, latitude], right3, {units: 'meters'}),
    // );
    // console.log(turf.distance([longitude, latitude], left3, {units: 'meters'}));
    // console.log(turf.distance(right1, right3, {units: 'meters'}));
    // console.log(turf.distance(right2, right3, {units: 'meters'}));
    // console.log(turf.distance(right4, right3, {units: 'meters'}));

    // console.log(turf.distance(left3, left2, {units: 'meters'}));
    // console.log(turf.distance(left2, left3, {units: 'meters'}));
    // console.log(turf.distance(left3, left4, {units: 'meters'}));
    // console.log(turf.distance(left4, left5, {units: 'meters'}));

    // console.log(turf.distance(right1, right2, {units: 'meters'}));
    // console.log(turf.distance(right2, right3, {units: 'meters'}));
    // console.log(turf.distance(right3, right4, {units: 'meters'}));
    // console.log(turf.distance(right4, right5, {units: 'meters'}));
    // console.log(get2ClosetPoint([longitude, latitude], listLeft, listRight));
    setLocationCoords([
      ...locationCoords,
      {
        latitude,
        longitude,
      },
    ]);

    const shortestPath = dijkstra('left1', 'object');
    console.log('Đường đi ngắn nhất:', shortestPath.join(' -> '));
    // console.log(longitude, latitude);
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
          {listSheet.map(e => {
            return (
              <Mapbox.ShapeSource
                key={e[0].toString()}
                id={e[0].toString()}
                shape={{type: 'LineString', coordinates: e}}>
                <Mapbox.FillLayer
                  id={e[0].toString()}
                  style={{lineColor: '#3700FF', lineWidth: 3}}
                />
              </Mapbox.ShapeSource>
            );
          })}

          <Mapbox.Camera
            centerCoordinate={[currentPosition.long, currentPosition.lat]}
            zoomLevel={20}
            animationMode={'flyTo'}
            animationDuration={0}
            followUserMode={UserTrackingMode.FollowWithHeading}
            followHeading={0}
          />
          {/* {listRight.map(e => {
            return (
              <PointAnnotation
                key={e[0].toString()}
                id="pointAnnotation"
                coordinate={[e[0], e[1]]}
                onSelected={() => console.log('onSelected')}></PointAnnotation>
            );
          })}
          {listLeft.map(e => {
            return (
              <PointAnnotation
                key={e[0].toString()}
                id="pointAnnotation"
                coordinate={[e[0], e[1]]}
                onSelected={() => console.log('onSelected')}></PointAnnotation>
            );
          })} */}
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
