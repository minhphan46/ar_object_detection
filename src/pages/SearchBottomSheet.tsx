import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addPerson} from '../store/slices/person_slice';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {TextInput, TouchableHighlight} from 'react-native-gesture-handler';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import CustomBottomSheet from './CustomBottomSheet';

const SearchBottomSheet = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const searchBottomSheetRef = useRef<BottomSheet>(null);
  const [searchedObject, setSearchedObject] = useState<any>([]);

  const [searchText, setSearchText] = useState<string>('');

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);

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
    console.log(searchText);
    searchBottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Button
            color="#9B4BEB"
            onPress={handleOpen}
            title="open search bottomsheet"></Button>

          <Text style={styles.contentText}>{searchText}</Text>
        </View>
      </BottomSheet>
      <CustomBottomSheet bottomSheetRef={searchBottomSheetRef} />
    </View>
  );
};

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
