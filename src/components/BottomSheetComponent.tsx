import React, {useMemo} from 'react';
import BottomSheet, {TouchableOpacity} from '@gorhom/bottom-sheet';
import {StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomSheetProps = {
  bottomSheetRef: any;
  handleNavigateAR: () => void;
  handleNavigateToShow3D: () => void;
  handleNavToWeb: () => void;
  handleClose: () => void;
};

const BottomSheetComponent = (props: BottomSheetProps) => {
  const snapPoints = useMemo(() => ['40%'], []);
  return (
    <BottomSheet
      backgroundStyle={styles.bottomSheetBg}
      ref={props.bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={styles.bottomSheetContainer}
      enableContentPanningGesture={false}>
      {_renderButtonBottom(
        props.handleNavigateAR,
        'Show Direction',
        'arrow-up-bold-circle-outline',
        '#000000',
      )}
      {_renderButtonBottom(
        props.handleNavigateToShow3D,
        'Show 3D Object',
        'rotate-3d',
        '#000000',
      )}
      {_renderButtonBottom(
        props.handleNavToWeb,
        'Go to Bach Hoa Xanh',
        'shopping-outline',
        '#000000',
      )}
      {_renderButtonBottom(
        props.handleClose,
        'Close',
        'close-circle-outline',
        'red',
      )}
    </BottomSheet>
  );
};

function _renderButtonBottom(
  navigateFunc: any,
  content: string,
  iconName: string,
  color: string,
) {
  return (
    <TouchableOpacity style={styles.transparentButton} onPress={navigateFunc}>
      <MaterialCommunityIcons
        style={styles.icon2}
        name={iconName}
        size={26}
        color={color}
      />
      <Text style={[styles.contentText, {color: color}]}>{content}</Text>
    </TouchableOpacity>
  );
}

export default BottomSheetComponent;

const styles = StyleSheet.create({
  bottomSheetBg: {
    backgroundColor: '#fff',
  },
  bottomSheetContainer: {
    borderWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  icon2: {
    marginLeft: 16,
    marginRight: 10,
  },
  transparentButton: {
    backgroundColor: '#FAF9F9',
    padding: 15,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 10,
  },
  contentText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'normal',
  },
});
