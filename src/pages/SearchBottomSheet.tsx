import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import CustomBottomSheet from './CustomBottomSheet';
import Ui3DObject from '../data/3DUiObject';
import {ViroARSceneNavigator} from '@viro-community/react-viro';

const SearchBottomSheet = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchBottomSheetRef = useRef<BottomSheet>(null);

  const {selectedProduct} = useAppSelector(state => state.listProduct);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  //open
  const handleOpen = () => {
    console.log('open');
    searchBottomSheetRef.current?.expand();
  };
  //close
  const handleClose = () => {
    console.log('close');
    searchBottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        initialScene={{
          scene: () => (
            <Ui3DObject
              label={selectedProduct?.canObject[0].brandLabel}
              canType={selectedProduct?.canObject[0].type}
            />
          ),
        }}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={2}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        enableOverDrag={true}>
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handleClose}>
            <Text style={styles.contentText}>Search Product</Text>
          </TouchableOpacity>

          <Text style={styles.contentText}>{selectedProduct?.name}</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#B1DBFB',
  },
  container: {
    flex: 1,
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
  contentText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
  input: {
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

  row_display: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
  },
  cancle_style: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});

export default SearchBottomSheet;
