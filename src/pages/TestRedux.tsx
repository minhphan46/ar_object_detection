import {View, Text, Button} from 'react-native';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addPerson} from '../store/slices/person_slice';

export default function TestRedux() {
  const {persons} = useAppSelector(state => state.person);
  const dispatch = useAppDispatch();

  const handleClickButton = () => {
    dispatch(addPerson({name: '123'}));
  };

  return (
    <View>
      <Text>{persons.length.toString()}</Text>
      <Button onPress={handleClickButton} title={'OnClick'} />
    </View>
  );
}
