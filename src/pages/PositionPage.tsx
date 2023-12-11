import {View, StyleSheet, Pressable, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Mapbox, {
  CircleLayer,
  PointAnnotation,
  UserLocationRenderMode,
  UserTrackingMode,
} from '@rnmapbox/maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updateCurrentPosition} from '../store/slices/direction_slice';
import {handleShortestPoint} from '../utils/find_shortest_service';
import * as turf from '@turf/turf';
import {listLeft, listRight} from '../data/building_point/BuildingPoint';
import {getTimeMeasureUtils} from '@reduxjs/toolkit/dist/utils';

const token =
  'pk.eyJ1IjoicXVhbmduaGF0MjIiLCJhIjoiY2xvaTJ3aTZ0MGN6czJycWhwMXZkdzh3aiJ9.rVhMy3XyQ9ilcYGjMFFtLw';
Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(token);

const PositionPage = () => {
  const sheet1: number[][] = [
    [106.797522, 10.8516194],
    [106.79754673544875, 10.851600225217368],
    [106.79742286306043, 10.851474773759378],
    //106.7974473, 10.851505
    [106.7973972947866, 10.85149518882065],
    //106.79742564511571, 10.851522919259551

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
  const listSheet: number[][][] = [sheet1];

  const dispatch = useAppDispatch();
  const {currentPosition} = useAppSelector(state => state.direction);
  const [locationCoords, setLocationCoords] = useState<any>([]);
  const [listPoint, setListPoint] = useState<any>([]);

  const [isIniteCamera, setInitCamera] = useState(true);
  const [locationCoord, setLocationCoord] = useState<any>([]);

  useEffect(() => {
    return () => {
      Mapbox.setTelemetryEnabled(false);
    };
  }, []);

  const handleUserLocationUpdate = (location: any) => {
    //console.log(locationCoord);
    if (locationCoord.length !== 0) {
      const shortestPath = handleShortestPoint(
        [locationCoord[0], locationCoord[1]],
        [location.coords.longitude, location.coords.latitude],
      );
      setListPoint(shortestPath);
    }
    dispatch(
      updateCurrentPosition({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      }),
    );
  };

  const addNewLocation = (latitude: number, longitude: number) => {
    const shortestPath = handleShortestPoint(
      [longitude, latitude],
      [currentPosition.long, currentPosition.lat],
    );
    setListPoint(shortestPath);
    setLocationCoord([longitude, latitude]);
    const distancepl = turf.distance(listRight['right1'], listLeft['left1'], {
      units: 'meters',
    });
    // // const distancepr = turf.distance(
    // //   [currentPosition.long, currentPosition.lat],
    // //   listRight['right1'],
    // //   {
    // //     units: 'meters',
    // //   },
    // // );
    // console.log(`left: ${distancepl}, `);
    console.log(`${longitude}, ${latitude}`);
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
          logoEnabled={false}
          styleURL="https://wsmap.tgdd.vn/vector_style/mwg-map-style/osm_liberty.json"
          compassEnabled={true}
          compassFadeWhenNorth={true}
          rotateEnabled={true}
          zoomEnabled={true}
          style={styles.map}
          onPress={(feature: any) => {
            const {coordinates} = feature.geometry;
            if (coordinates) {
              addNewLocation(coordinates[1], coordinates[0]);
            }
          }}>
          <Mapbox.UserLocation
            minDisplacement={0.5}
            visible={true}
            onUpdate={handleUserLocationUpdate}
            showsUserHeadingIndicator={true}
            animated={true}
            androidRenderMode="compass"
            requestsAlwaysUse={true}
            renderMode={UserLocationRenderMode.Native}
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
          <Mapbox.ShapeSource
            id="online"
            shape={{type: 'LineString', coordinates: listPoint}}>
            <Mapbox.LineLayer
              id="line"
              style={{lineColor: '#3700FF', lineWidth: 3}}
            />
          </Mapbox.ShapeSource>

          {isIniteCamera && (
            <Mapbox.Camera
              centerCoordinate={[currentPosition.long, currentPosition.lat]}
              zoomLevel={20}
              animationMode={'flyTo'}
              animationDuration={1}
              followUserMode={UserTrackingMode.FollowWithHeading}
              followHeading={0}
              onUserTrackingModeChange={_ => {
                setInitCamera(true);
              }}
            />
          )}
          {Object.keys(listLeft).map((e: string) => {
            return (
              <PointAnnotation
                key={e}
                id="pointAnnotation"
                coordinate={[listLeft[e][0], listLeft[e][1]]}
                onSelected={() => console.log('onSelected')}>
                <View>
                  <Text>{e}</Text>
                </View>
              </PointAnnotation>
            );
          })}
          <PointAnnotation
            id="pointAnnotation"
            coordinate={[106.7975374, 10.8516619]}
            onSelected={() => console.log('onSelected')}>
            <View>
              <Text>e</Text>
            </View>
          </PointAnnotation>
          {Object.keys(listRight).map((e: string) => {
            return (
              <PointAnnotation
                key={e}
                id="pointAnnotation"
                coordinate={[listRight[e][0], listRight[e][1]]}
                onSelected={() => console.log('onSelected')}>
                <View>
                  <Text>{e}</Text>
                </View>
              </PointAnnotation>
            );
          })}
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
