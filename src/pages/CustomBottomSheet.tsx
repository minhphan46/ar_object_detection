import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {Divider} from '@rneui/base';
import data from '../data/data.json';
import {useAppDispatch, useAppSelector} from '../store/store';
import {ProductInfo, listProduct} from '../data/ProductObject';
import {setSelectedProduct} from '../store/slices/list_product_slice';

const CustomBottomSheet = ({bottomSheetRef}: any) => {
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

  const {listProducts, selectedProduct} = useAppSelector(
    state => state.listProduct,
  );
  const dispatch = useAppDispatch();

  const [searchText, onChangeSearch] = useState('');

  const [searchedObject, setSearchedObject] = useState<any>(listProducts);

  const searchModelName = (searchTerm: string) => {
    searchTerm = searchTerm.toLowerCase();

    setSearchedObject(
      listProduct.filter(product =>
        product.name.toLowerCase().includes(searchTerm),
      ),
    );
  };
  const selectedType = (item: ProductInfo) => {
    dispatch(setSelectedProduct({product: item}));

    //handleClose();
  };
  const handleClose = () => {
    console.log('close');
    bottomSheetRef.current?.close();
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}>
      <View style={styles.rowDisplay}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={text => {
            onChangeSearch(text);
            searchModelName(text);
            console.log(searchedObject);
          }}></TextInput>
        <TouchableOpacity onPress={handleClose} style={styles.cancleStyle}>
          <Text style={styles.cancleText}>Cancle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchTable}>
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
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
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
  input: {
    color: '#050505',
    flex: 1,
    width: 'auto',
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: '#E9E9E9',
  },

  searchTable: {
    paddingHorizontal: 16,
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
