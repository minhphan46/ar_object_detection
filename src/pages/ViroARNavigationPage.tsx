import {ViroARSceneNavigator} from '@viro-community/react-viro';
import {Button, StyleSheet, View} from 'react-native';
import CompassObject from '../components/CompassObject';
import ShowNavigation from '../components/ShowNavigation';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {updatePhoneDirection} from '../store/slices/direction_slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {StackActions} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
