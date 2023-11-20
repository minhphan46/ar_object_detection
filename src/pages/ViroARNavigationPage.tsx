import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import CompassObject from '../components/CompassObject';
import ShowNavigation from '../components/ShowNavigation';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updatePhoneDirection} from '../store/slices/direction_slice';

function ViroARNavigationPage() {
  const dispatch = useAppDispatch();

  const {isDeviceStanding} = useAppSelector(state => state.direction);
  useEffect(() => {
    return () => {
      dispatch(updatePhoneDirection({isStading: false}));
    };
  }, [isDeviceStanding]);
  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ShowNavigation,
        }}
        style={styles.rootContainer}
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
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
