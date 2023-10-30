import React, {ViroText} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';

type ObjectTextProps = {
  modelName: string;
  color: string;
};

export default function ObjectText(props: ObjectTextProps) {
  return (
    <ViroText
      text={props.modelName}
      scale={[0.2, 0.2, 0.2]}
      position={[0, 0, 0]}
      rotation={[90, 180, 180]}
      style={{...styles.modelNameTextStyle, color: props.color}}
    />
  );
}

const styles = StyleSheet.create({
  modelNameTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
