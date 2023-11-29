import Mapbox from '@rnmapbox/maps';
import {Alert, Linking, Platform} from 'react-native';

export const permissionLocation = async () => {
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    return true;
  }
  const isGranted = await Mapbox.requestAndroidLocationPermissions();
  if (!isGranted) {
    Alert.alert(
      'Yêu cầu quyền',
      'Để sử dụng tính năng này, vui lòng mở quyền truy cập vị trí trong cài đặt ứng dụng',
      [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Mở cài đặt ứng dụng',
          onPress: () => {
            Linking.openSettings();
          },
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  }
  return isGranted;
};
