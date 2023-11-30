import React, {useRef, useState} from 'react';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {
  Dimensions,
  Image,
  Keyboard,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/store';
import {ProductInfo, listProduct} from '../data/ProductObject';
import {setSelectedProduct} from '../store/slices/list_product_slice';
import {Divider} from '@rneui/themed/dist/Divider';
import {ScrollView} from 'react-native-gesture-handler';
import {initPosition} from '../store/slices/direction_slice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {MenuProvider} from 'react-native-popup-menu';
import MenuButtonTop from '../components/MenuButtonTop';
import BottomSheetComponent from '../components/BottomSheetComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {permissionLocation} from '../utils/permission_service';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MyDivider = () => (
  <Divider subHeaderStyle={styles.dividerBg} width={0.3} />
);

const HomePage = ({navigation}: Props) => {
  // variables
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {listProducts} = useAppSelector(state => state.listProduct);
  const dispatch = useAppDispatch();

  let chooseProduct: ProductInfo = listProducts[0];

  const searchModelName = (searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase();

    setSearchedObject(
      listProduct.filter(product =>
        product.name.toLowerCase().includes(searchTerm),
      ),
    );
  };
  const [searchedObject, setSearchedObject] = useState<any>(listProducts);

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  const handleNavToWeb = () => {
    bottomSheetRef.current?.close();
    Linking.canOpenURL(chooseProduct.url).then(supported => {
      if (supported) {
        Linking.openURL(chooseProduct.url);
      } else {
        console.log("Don't know how to open URI: " + chooseProduct.url);
      }
    });
  };

  const handleNavigateAR = async () => {
    const isLocationGranted = await permissionLocation();
    if (isLocationGranted) {
      dispatch(setSelectedProduct({product: chooseProduct}));
      dispatch(
        initPosition({
          long: chooseProduct.position.long,
          lat: chooseProduct.position.lat,
        }),
      );
      navigation.navigate('DeviceDirectionPage');
    }
    bottomSheetRef.current?.close();
  };

  const selectedType = (item: ProductInfo) => {
    chooseProduct = item;
    bottomSheetRef.current?.expand();
  };

  const handleNavigateToScanObject = () => {
    navigation.navigate('DetectObject');
  };

  const handleNavigateToScanImage = () => {
    navigation.navigate('DetectImage');
  };

  const handleNavigateToGetPosition = () => {
    navigation.navigate('Position');
  };

  const handleNavigateToShow3D = () => {
    dispatch(setSelectedProduct({product: chooseProduct}));
    navigation.navigate('Model3D');
  };

  return (
    <MenuProvider style={styles.root}>
      <View style={styles.container}>
        {_renderSearchPlace()}
        {_renderSearchList()}
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          handleNavigateAR={handleNavigateAR}
          handleNavigateToShow3D={handleNavigateToShow3D}
          handleNavToWeb={handleNavToWeb}
          handleClose={handleClose}
        />
      </View>
    </MenuProvider>
  );
  function _renderSearchPlace() {
    return (
      <View style={styles.viewSearchLabel}>
        <View style={styles.searchLabel}>
          <MaterialCommunityIcons
            style={styles.searchIcon}
            name="magnify"
            size={20}
            color="#000"
          />
          <TouchableWithoutFeedback
            style={styles.root}
            onPress={Keyboard.dismiss}
            accessible={false}>
            <TextInput
              style={styles.input}
              placeholder="Search product here"
              onChangeText={searchString => {
                searchModelName(searchString);
              }}
              underlineColorAndroid="transparent"
            />
          </TouchableWithoutFeedback>
        </View>
        <MenuButtonTop
          funNavtoScanObject={handleNavigateToScanObject}
          funNavtoScanImage={handleNavigateToScanImage}
          funNavtoPosition={handleNavigateToGetPosition}
        />
      </View>
    );
  }

  function _renderSearchList() {
    return (
      <ScrollView style={styles.searchTable}>
        {searchedObject.length === 0 ? (
          <Text style={styles.titleText}>No product matchs</Text>
        ) : (
          <Text style={styles.titleText}>Products</Text>
        )}
        {searchedObject.map((item: any) => {
          return (
            <View key={item.name}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current?.close();
                  selectedType(item);
                }}
                style={styles.cancleStyle}>
                {_getProductCard(item)}
                <MyDivider />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  }

  function _getProductCard(item: any) {
    return (
      <View style={styles.rowDisplay}>
        <Image style={styles.buttonImageIconStyle} source={item.image} />
        <Text style={styles.searchText}>{item.name}</Text>

        {item.imageDetect ? (
          <MaterialCommunityIcons
            style={styles.icon}
            name="check-circle"
            size={20}
            color="#A6CF98"
          />
        ) : (
          <MaterialCommunityIcons
            style={styles.icon}
            name="close-circle"
            size={20}
            color="#CE5A67"
          />
        )}
      </View>
    );
  }
};

export default HomePage;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    padding: 10,
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  cancleText: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'normal',
  },
  searchText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    padding: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 15,
    paddingTop: 15,
  },
  input: {
    paddingRight: 10,
    color: '#040404',
  },
  searchTable: {
    paddingHorizontal: 16,
  },
  searchLabel: {
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  viewSearchLabel: {
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowDisplay: {
    paddingVertical: 16,
    width: Dimensions.get('window').width * 0.86,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cancleStyle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 30,
    width: 30,
    resizeMode: 'stretch',
  },
  dividerBg: {
    color: '#878080',
  },
});
