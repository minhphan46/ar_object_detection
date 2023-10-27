import {
    ViroARScene,
    Viro3DObject,
    ViroMaterials,
    ViroARImageMarker,
    ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState} from 'react';

function DetectLabel(): JSX.Element {
    ViroMaterials.createMaterials({
      blue: {
        diffuseTexture: require('../assets/images/anime.jpg'),
      },
    });

    // Outside of the render function, register the target
    ViroARTrackingTargets.createTargets({
        anime: {
          source: require('../assets/images/anime.jpg'),
          orientation: "Up",
          physicalWidth: 0.1, // real world width in meters
        },
        bottle: {
          source: require('../assets/images/bottle.jpg'),
          orientation: "Up",
          physicalWidth: 0.25, // real world width in meters
          type: 'Image'
        },
        water: {
          source: require('../assets/images/label_water.jpg'),
          orientation: "Up",
          physicalWidth: 0.25, // real world width in meters
        },
    });
  
    function _onAnchorFound(evt: any) {
      console.log('Anchor found in Marker :', evt);
    }
  
    return (
      <ViroARScene>
         <ViroARImageMarker target={'water'} onAnchorFound={_onAnchorFound}>
            <Viro3DObject
                position={[0,0,0]}
                source={require("../assets/model/can.obj")}
                type="OBJ"
                scale={[0.5, 0.5, 0.5]}
                rotation={[0, 90, 0]}
                materials={['blue']}
                dragPlane={{
                    planeNormal: [0, 0, 0],
                    planePoint: [0, 0, -2],
                    maxDistance: 5,
                }}
                onDrag={(event) => console.log("Drag Event: satori", event)}
                />
          </ViroARImageMarker>
      </ViroARScene>
    );
};
  
export default DetectLabel;