import React, {useMemo, useRef, useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import MenuButtonTop from '../components/MenuButtonTop';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const CustomBottomSheet = ({navigation}: Props) => {
  // variables
  const snapPoints = useMemo(() => ['50%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {listProducts, selectedProduct} = useAppSelector(
    state => state.listProduct,
  );
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

  const handleNavigateAR = () => {
    bottomSheetRef.current?.close();
    dispatch(setSelectedProduct({product: chooseProduct}));
    dispatch(
      initPosition({
        x: chooseProduct.position.x,
        y: chooseProduct.position.y,
        z: chooseProduct.position.z,
      }),
    );
    navigation.navigate('Direction');
  };

  const selectedType = (item: ProductInfo) => {
    chooseProduct = item;
    bottomSheetRef.current?.expand();
  };

  const handleNavigateToScanObject = () => {
    navigation.navigate('Detect');
  };

  const handleNavigateToShow3D = () => {
    dispatch(setSelectedProduct({product: chooseProduct}));
    navigation.navigate('Model3D');
  };

  return (
    <MenuProvider style={{flex: 1}}>
      <View style={styles.container}>
        {_renderSearchPlace()}
        {_renderSearchList()}
        {_renderBottomSheet()}
      </View>
    </MenuProvider>
  );
  function _renderSearchPlace() {
    return (
      <View style={styles.viewSearchLabel}>
        <View style={styles.searchLabel}>
          <FontAwsomeIcon
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#000"
          />
          <TouchableWithoutFeedback
            style={{flex: 1}}
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
          funNavtoScanImage={handleNavigateToScanObject}
        />
      </View>
    );
  }

  function _renderSearchList() {
    const MyDivider = () => (
      <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
    );
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
                onPress={() => selectedType(item)}
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
      </View>
    );
  }

  function _renderBottomSheet() {
    return (
      <BottomSheet
        backgroundStyle={{backgroundColor: '#F2F2F2'}}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}>
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={handleNavigateAR}>
          <Text style={styles.contentText}>Show Direction</Text>
        </TouchableOpacity>
        <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={handleNavigateToShow3D}>
          <Text style={styles.contentText}>Show 3D Object</Text>
        </TouchableOpacity>
        <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={handleNavToWeb}>
          <Text style={styles.contentText}>Go to Bach Hoa Xanh</Text>
        </TouchableOpacity>
        <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
        <TouchableOpacity
          style={styles.transparentButton}
          onPress={handleClose}>
          <Text style={styles.contentText}>Close</Text>
        </TouchableOpacity>
        <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
      </BottomSheet>
    );
  }
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  transparentButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
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
  contentText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
  searchText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '400',
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
    // flex: 1,
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
  containerMenu: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 100,
    marginHorizontal: 100,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
});
