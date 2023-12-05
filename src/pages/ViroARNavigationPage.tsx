import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {Pressable, StyleSheet, View} from 'react-native';
import CompassObject from '../components/CompassObject';
import ShowNavigation from '../components/ShowNavigation';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {StackActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapComponent from '../components/MapComponent';
import {SplitPane} from 'expo-split-pane';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDirectionPage'>;

function ViroARNavigationPage({navigation}: Props) {
  const {isDeviceStanding} = useAppSelector(state => state.direction);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MaterialCommunityIcons
          size={26}
          color={'black'}
          onPress={() => {
            // Xử lý sự kiện pop back tại đây
            navigation.dispatch(StackActions.popToTop()); // Quay về màn hình trước đó
          }}
          name="keyboard-backspace"
        />
      ),
    });
  }, [navigation, isDeviceStanding]);

  const [isShowMap, setIsShowMap] = useState<boolean>(false);

  return (
    <View style={styles.outer}>
      <SplitPane
        dividerStyle={{
          height: 15,
        }}
        min={0.1}
        style={{flex: 1}}
        orientation="horizontal"
        pane2InitialSize={250}
        onChange={size => {
          if (size && size.pane2Size !== undefined && size.pane2Size < 1) setIsShowMap(true);
          else setIsShowMap(false);
        }}
        pane1={
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
              scene: ShowNavigation,
            }}
            style={styles.rootContainer}
          />
        }
        pane2={<MapComponent />}
      />

      <View style={styles.fab3DButton}>
        <CompassObject />
      </View>
      {isShowMap && (
        <View style={styles.map}>
          <MapComponent />
        </View>
      )}
    </View>
  );
}

export default ViroARNavigationPage;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  map: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 200,
    width: 150,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    width: 80,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
