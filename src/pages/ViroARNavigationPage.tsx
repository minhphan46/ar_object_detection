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

  return (
    <View style={styles.outer}>
      <SplitPane
        dividerStyle={{
          height: 15,
        }}
        style={{flex: 1}}
        orientation="horizontal"
        pane2InitialSize={250}
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
