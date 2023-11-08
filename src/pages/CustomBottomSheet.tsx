import React, {useLayoutEffect, useMemo, useState} from 'react';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Divider} from '@rneui/base';
import data from '../data/data.json';
import {ObjectMap} from '../utils/object_map';

const CustomBottomSheet = ({bottomSheetRef}: any) => {
  const snapPoints = useMemo(() => ['25%', '50%', '100%'], []);
  const [searchText, onChangeSearch] = useState('');

  const [searchedObject, setSearchedObject] = useState<any>([]);

  const searchModelName = (searchText: string) => {
    const filteredObjects = Object.keys(ObjectMap).filter(key =>
      ObjectMap[key].modelName.toLowerCase().includes(searchText.toLowerCase()),
    );

    const filteredObjectMap = filteredObjects.map(key => ObjectMap[key]);

    setSearchedObject(filteredObjectMap);
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
      <View style={styles.row_display}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={text => {
            onChangeSearch(text);
            searchModelName(text);
            console.log(searchedObject);
          }}></TextInput>
        <TouchableOpacity onPress={handleClose} style={styles.cancle_style}>
          <Text style={styles.contentText}>Cancle</Text>
        </TouchableOpacity>
      </View>

      <View>
        {searchedObject.map((item: any) => {
          return (
            <Text key={item.modelName} style={styles.contentText}>
              {item.modelName}
            </Text>
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
