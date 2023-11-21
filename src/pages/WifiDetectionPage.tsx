import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {StyleSheet, Text, View} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import WifiManager, {WifiEntry} from 'react-native-wifi-reborn';

type Props = NativeStackScreenProps<RootStackParamList, 'WifiDetection'>;

function WifiDetectionPage({navigation}: Props) {
  const [wifiList, setWifiList] = useState<WifiEntry[]>([]);
  const [currentSSID, setCurrentSSID] = useState('');
  useEffect(() => {
    permission();
    getWifiSignalStrengths();
    getCurrenSSID();
    getWifiList();
    const intervalId = setInterval(() => {
      getWifiSignalStrengths();
    }, 1000); // Khoảng thời gian (5 giây trong ví dụ này)

    return () => {
      clearInterval(intervalId); // Xóa interval khi component unmount
    };
  }, []);
  const getWifiSignalStrengths = async () => {
    try {
      const wifiList = await WifiManager.loadWifiList();
      if (wifiList && wifiList.length > 0) {
        for (const network of wifiList) {
          const signalStrength = await network.level;
          console.log(`Tên mạng: ${network.SSID}, RSSI: ${signalStrength}`);
          // Xử lý thông tin RSSI của từng mạng ở đây
        }
        console.log('---------------------------------------------------');
      } else {
        console.log('Không tìm thấy mạng WiFi');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin RSSI của mạng WiFi:', error);
    }
  };

  const getCurrenSSID = () => {
    WifiManager.getCurrentWifiSSID().then(ssid => setCurrentSSID(ssid));
  };

  const getWifiList = () => {
    WifiManager.loadWifiList().then(wifiList => {
      setWifiList(wifiList);
    });
  };

  const permission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // You can now use react-native-wifi-reborn
      console.log('Permission granted');
    } else {
      // Permission denied
      console.log('Permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WifiDetectionPage</Text>
      <Text style={styles.title}>{currentSSID}</Text>
      {wifiList.map(list => {
        return (
          <Text key={list.SSID} style={styles.ssidText}>
            {list.SSID}
          </Text>
        );
      })}
    </View>
  );
}

export default WifiDetectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  ssidText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'regular',
    textAlign: 'center',
    marginBottom: 20,
  },
});
