import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {useAppSelector} from '../store/store';

let maxDistance = 1;
export default function ProgressComponent() {
  let progress = 0;
  const {distance} = useAppSelector(state => state.direction);

  // caculate progress
  function caculateProgress(distance: number) {
    if (distance > maxDistance) {
      maxDistance = distance;
    }

    if (distance <= 2) {
      progress = 1;
    } else {
      progress = 1 - distance / maxDistance;
    }
    return progress;
  }

  return (
    <View>
      <Progress.Bar
        progress={caculateProgress(Number.parseFloat(distance))}
        width={Dimensions.get('window').width * 0.5}
        animated={true}
        color="white"
        height={10}
        useNativeDriver={true}
        animationType={'timing'}
      />
    </View>
  );
}
