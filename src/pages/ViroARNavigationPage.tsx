import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {Modal, StyleSheet, View} from 'react-native';
import CompassObject from '../components/CompassObject';
import ShowNavigation from '../components/ShowNavigation';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {SplitPane} from 'expo-split-pane';
import MapComponent from '../components/MapComponent';
import {showToastSuccess, ShowToastType} from '../store/slices/direction_slice';
import {useToast} from 'react-native-toast-notifications';
import ProgressComponent from '../components/ProgressComponent';
import ModalCardInfo from '../components/ModalCardInfo';

type Props = NativeStackScreenProps<RootStackParamList, 'DeviceDirectionPage'>;

function ViroARNavigationPage({navigation}: Props) {
  const {mustShowToast} = useAppSelector(state => state.direction);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [isShowMap, setIsShowMap] = useState<boolean>(true);

  if (mustShowToast === ShowToastType.pending) {
    toast.hideAll();
    toast.show('You have arrived', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      animationType: 'slide-in',
    });
    dispatch(showToastSuccess({}));
  }

  return (
    <View style={styles.outer}>
      <SplitPane
        dividerStyle={{
          height: 15,
        }}
        min={0.1}
        style={{flex: 1}}
        orientation="horizontal"
        //pane2InitialSize={250}
        pane2InitialSize={0.1}
        onChange={size => {
          if (size && size.pane2Size !== undefined && size.pane2Size < 1) {
            setIsShowMap(true);
          } else {
            setIsShowMap(false);
          }
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
      {isShowMap && (
        <View style={styles.map}>
          <MapComponent />
        </View>
      )}

      <View style={styles.fab3DButton}>
        <CompassObject />
      </View>

      <View style={styles.direction}>
        <ProgressComponent />
      </View>

      <ModalCardInfo />
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
    bottom: 50,
    width: 200,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  direction: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    width: 200,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
