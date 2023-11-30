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
      'Request location permissions',
      'To use this feature, please open location permissions in the app settings',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Open App Settings',
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
