import React, {useEffect, useState} from 'react';
import {
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroBox,
} from '@viro-community/react-viro';
import {ShowModels} from './NavigationPage';

function NavigationImagePage(): JSX.Element {
  ViroARTrackingTargets.createTargets({
    targetOne: {
      source: require('../../assets/images/mocks/card.jpg'),
      orientation: 'Up',
      physicalWidth: 0.1, // real world width in meters
    },
  });

  function _onFoundObject(evt: any) {
    console.log(
      `Ban dang dung o vi tri: ${evt.position[0]} ${evt.position[1]} ${evt.position[2]}`,
      evt,
    );
  }

  return (
    <ViroARScene>
      <ViroARImageMarker target={'targetOne'} onAnchorFound={_onFoundObject}>
        <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        <ShowModels x={0} y={-1} z={-10} rotationX={0} />
      </ViroARImageMarker>
    </ViroARScene>
  );
}

export default NavigationImagePage;
