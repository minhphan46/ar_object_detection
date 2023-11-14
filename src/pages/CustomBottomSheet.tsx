import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
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
    //dispatch(setSelectedProduct({product: item}));
    chooseProduct = item;
    bottomSheetRef.current?.expand();
  };

  const handleNavigateToScanObject = () => {};

  return (
    <View style={styles.container}>
      {_renderSearchPlace()}

      {_renderSearchList()}
      {_renderBottomSheet()}
    </View>
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
          <TextInput
            style={styles.input}
            placeholder="Search something here"
            onChangeText={searchString => {
              searchModelName(searchString);
            }}
            underlineColorAndroid="transparent"
          />
        </View>
        <TouchableHighlight onPress={handleNavigateToScanObject}>
          <MaterialCommunityIcons
            style={styles.cubeIcon}
            name="cube-scan"
            size={30}
            color="#000"
          />
        </TouchableHighlight>
      </View>
    );
  }
  function _renderSearchList() {
    return (
      <ScrollView style={styles.searchTable}>
        {searchedObject.length === 0 ? (
          <Text style={styles.titleText}>No product matchs</Text>
        ) : (
          <Text style={styles.titleText}>Suggestions</Text>
        )}
        {searchedObject.map((item: any) => {
          return (
            <View key={item.name}>
              <TouchableOpacity
                onPress={() => selectedType(item)}
                style={styles.cancleStyle}>
                <View style={styles.rowDisplay}>
                  <Image
                    style={styles.buttonImageIconStyle}
                    source={item.image}
                  />
                  <Text style={styles.searchText}>{item.name}</Text>
                </View>
                <Divider subHeaderStyle={{color: '#878080'}} width={0.3} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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
          onPress={handleClose}>
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
  cubeIcon: {
    paddingLeft: 16,
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
    backgroundColor: '#D2CFCF',
  },
  viewSearchLabel: {
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
  },
  rowDisplay: {
    paddingVertical: 16,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
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
});
