import {ViroARScene, ViroARSceneNavigator} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import {listProduct} from '../data/ProductObject';
import ObjectDetectionList from '../components/ObjectDetectionList';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch} from '../store/store';
import {removeObjectDetected} from '../store/slices/detect_object_slice';

type Props = NativeStackScreenProps<RootStackParamList, 'DetectObject'>;

type DeleteButtonProps = {
  onClick: () => void;
};

function DeleteButton(props: DeleteButtonProps) {
  return (
    <MaterialCommunityIcons
      name="refresh"
      size={30}
      color="#000"
      onPress={() => props.onClick()}
    />
  );
}

function ViroARDetectionObjectPage({navigation}: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handlleOnClick = () => {
      dispatch(removeObjectDetected({}));
    };

    navigation.setOptions({
      headerRight: () => DeleteButton({onClick: handlleOnClick}),
    });
  }, [dispatch, navigation]);

  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: DetectObjectListPage,
        }}
        style={styles.rootContainer}
      />
    </View>
  );
}

export default ViroARDetectionObjectPage;

export function DetectObjectListPage(): JSX.Element {
  return (
    <ViroARScene>
      {listProduct.map(
        product =>
          product.imageDetect !== undefined && (
            <ObjectDetectionList key={product.id} product={product} />
          ),
      )}
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
