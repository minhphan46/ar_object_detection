import React from 'react';
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroBox,
} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';

function ViroARDetectionImagesPage() {
  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ImageDetectPage,
        }}
        style={styles.rootContainer}
      />
    </View>
  );
}

export default ViroARDetectionImagesPage;

export function ImageDetectPage(): JSX.Element {
  ViroARTrackingTargets.createTargets({
    targetOne: {
      source: require('../../assets/images/mocks/card.jpg'),
      orientation: 'Up',
      physicalWidth: 0.1, // real world width in meters
    },
  });

  function _onFoundObject(evt: any) {
    // console.log(
    //   `Ban dang dung o vi tri: ${evt.position[0]} ${evt.position[1]} ${evt.position[2]}`,
    //   evt,
    // );
  }

  return (
    <ViroARScene>
      <ViroARImageMarker target={'targetOne'} onAnchorFound={_onFoundObject}>
        <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
      </ViroARImageMarker>
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
});
