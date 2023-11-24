import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import WifiManager, {WifiEntry} from 'react-native-wifi-reborn';
import {Divider} from '@rneui/base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FlatList} from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'WifiDetection'>;

type WifiInfo = {
  timestamp: number;
  name: string;
  strength: number;
};

type WifiMatrix = {
  wifi1: WifiInfo;
  wifi2: WifiInfo;
  wifi3: WifiInfo;
  wifi4: WifiInfo;
};

type RefreshButtonProps = {
  onClick: () => void;
};

function RefreshButton(props: RefreshButtonProps) {
  return (
    <MaterialCommunityIcons
      name="refresh"
      size={30}
      color="#000"
      onPress={() => props.onClick()}
    />
  );
}

function WifiDetectionPage({navigation}: Props) {
  const [wifiList, setWifiList] = useState<WifiEntry[]>([]);
  const [currentSSID, setCurrentSSID] = useState('');

  const [wifi1, setWifi1] = useState<WifiInfo | undefined>();
  const [wifi2, setWifi2] = useState<WifiInfo | undefined>();
  const [wifi3, setWifi3] = useState<WifiInfo | undefined>();
  const [wifi4, setWifi4] = useState<WifiInfo | undefined>();
  const [listWifiMatrix, setListWifiMatrix] = useState<
    WifiMatrix[] | undefined
  >();

  useEffect(() => {
    const handlleOnClick = async () => {
      await WifiManager.reScanAndLoadWifiList().then(_ => {
        getWifiSignalStrengths();
      });
    };

    navigation.setOptions({
      headerRight: () => RefreshButton({onClick: handlleOnClick}),
    });

    permission();
    const intervalId = setInterval(() => {
      getWifiSignalStrengths();
    }, 1000); // Khoảng thời gian (5 giây trong ví dụ này)

    return () => {
      clearInterval(intervalId); // Xóa interval khi component unmount
    };
  }, [navigation]);

  const getWifiSignalStrengths = async () => {
    try {
      const wifiList = await WifiManager.loadWifiList();
      if (wifiList && wifiList.length > 0) {
        console.log('---------------------------------------------------');
        for (const network of wifiList) {
          const signalStrength = await network.level;
          // Xử lý thông tin RSSI của từng mạng ở đây
          if (network.SSID === 'Wifi1') {
            setWifi1({
              timestamp: Date.now(),
              name: network.SSID,
              strength: signalStrength,
            });
            console.log(`Tên mạng: ${network.SSID}, RSSI: ${signalStrength}`);
          }
          if (network.SSID === 'wifi2') {
            setWifi2({
              timestamp: Date.now(),
              name: network.SSID,
              strength: signalStrength,
            });
            console.log(`Tên mạng: ${network.SSID}, RSSI: ${signalStrength}`);
          }
          if (network.SSID === 'Wifi3') {
            setWifi3({
              timestamp: Date.now(),
              name: network.SSID,
              strength: signalStrength,
            });
            console.log(`Tên mạng: ${network.SSID}, RSSI: ${signalStrength}`);
          }
          if (network.SSID === 'Iphone NQ') {
            setWifi4({
              timestamp: Date.now(),
              name: network.SSID,
              strength: signalStrength,
            });
            console.log(`Tên mạng: ${network.SSID}, RSSI: ${signalStrength}`);
          }
        }
      } else {
        console.log('Không tìm thấy mạng WiFi');
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin RSSI của mạng WiFi:', error);
    }
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

  const handleAddButton = () => {
    const wifiMatrix = {
      wifi1,
      wifi2,
      wifi3,
      wifi4,
    } as WifiMatrix;

    if (listWifiMatrix === undefined) {
      setListWifiMatrix([wifiMatrix]);
    } else {
      setListWifiMatrix([...listWifiMatrix, wifiMatrix]);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleAddButton} title="Add" color="black" />
      <Divider />
      <Text style={styles.subTitle}>
        "Name:" {wifi1?.name} | "Strength:" {wifi1?.strength}
      </Text>
      <Divider />
      <Text style={styles.subTitle}>
        "Name:" {wifi2?.name} | "Strength:" {wifi2?.strength}
      </Text>
      <Divider />
      <Text style={styles.subTitle}>
        "Name:" {wifi3?.name} | "Strength:" {wifi3?.strength}
      </Text>
      <Divider />
      <Text style={styles.subTitle}>
        "Name:" {wifi4?.name} | "Strength:" {wifi4?.strength}
      </Text>
      <Divider />
      <Text style={styles.heading}>List Matrix</Text>
      <FlatList
        data={listWifiMatrix}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View>
            <Text style={styles.title}>Matrix {index + 1}</Text>
            <Text style={styles.subTitle}>
              "Name:" {item.wifi1.name} | "Strength:" {item.wifi1.strength}
            </Text>
            <Text style={styles.subTitle}>
              "Name:" {item.wifi2.name} | "Strength:" {item.wifi2.strength}
            </Text>
            <Text style={styles.subTitle}>
              "Name:" {item.wifi3.name} | "Strength:" {item.wifi3.strength}
            </Text>
            <Text style={styles.subTitle}>
              "Name:" {item.wifi4.name} | "Strength:" {item.wifi4.strength}
            </Text>
            <Divider width={2} />
          </View>
        )}
      />
    </View>
  );
}

export default WifiDetectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  heading: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
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
