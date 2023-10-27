'use strict';
import React, {useState} from 'react';
import {
  ViroARScene,
  ViroNode,
  ViroARImageMarker,
  ViroVideo,
  ViroARTrackingTargets,
  ViroAnimations,
  ViroMaterials,
} from '@viro-community/react-viro';

const MainScene = () => {
  const videoPath = require('../assets/cat.mp4');
  const [playVideoAnimation, setPlayVideoAnimation] = useState(false);
  const [videoAnimationName, setVideoAnimationString] = useState('showVideo');
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  function onAnchorFound() {
    setPlayVideoAnimation(true);
    setVideoAnimationString('showVideo');
    setShouldPlayVideo(true);
  }

  function onAnchorRemoved() {
    setShouldPlayVideo(false);
    setVideoAnimationString('closeVideo');
    setPlayVideoAnimation(true);
  }

  function onVideoAnimationFinish() {
    setPlayVideoAnimation(false);
  }

  function onVideoFinish() {
    setShouldPlayVideo(false);
    setVideoAnimationString('closeVideo');
    setPlayVideoAnimation(true);
  }

  return (
    <ViroARScene>
      <ViroARImageMarker
        target={'targetOne'}
        onAnchorFound={onAnchorFound}
        onAnchorRemoved={onAnchorRemoved}>
        <ViroNode rotation={[-90, 0, 0]}>
          <ViroVideo
            position={[0, 0, 0]}
            scale={[0, 0, 0]}
            dragType="FixedToWorld"
            animation={{
              name: videoAnimationName,
              run: playVideoAnimation,
              onFinish: onVideoAnimationFinish,
            }}
            source={videoPath}
            materials={['chromaKeyFilteredVideo']}
            height={0.2 * (9 / 16)}
            width={0.2}
            paused={!shouldPlayVideo}
            onFinish={onVideoFinish}
          />
        </ViroNode>
      </ViroARImageMarker>
    </ViroARScene>
  );
};

ViroAnimations.registerAnimations({
  showVideo: {
    properties: {scaleX: 0.9, scaleY: 0.9, scaleZ: 0.9},
    duration: 1,
    easing: 'bounce',
  },
  closeVideo: {
    properties: {scaleX: 0, scaleY: 0, scaleZ: 0},
    duration: 1,
  },
});

ViroMaterials.createMaterials({
  chromaKeyFilteredVideo: {
    chromaKeyFilteringColor: '#00FF00',
  },
});

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('../assets/vietnam.png'),
    orientation: 'Up',
    physicalWidth: 0.01, // real world width in meters
  },
});

export default MainScene;
