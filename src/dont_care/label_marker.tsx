import {
    Viro3DObject,
    ViroARImageMarker,
    ViroARTrackingTargets,
    ViroBox,
    ViroMaterials,
} from '@viro-community/react-viro';
import React, {useState} from 'react';

function LabelMarker(): JSX.Element {
    ViroMaterials.createMaterials({
        blue: {
          diffuseTexture: require('../assets/images/anime.jpg'),
        },
      });
    // Outside of the render function, register the target
    ViroARTrackingTargets.createTargets({
        water: {
          source: require('../assets/images/bohuc/bohuc1.jpg'),
          orientation: "Up",
          physicalWidth: 0.25, // real world width in meters
        },
        anime: {
            source: require('../assets/images/bohuc/bohuc2.jpg'),
            orientation: "Up",
            physicalWidth: 0.25, // real world width in meters
          },
    });

    function _onFoundCan(evt: any) {
        console.log('Found Can:', evt);
    }

    return (
      <>
        <ViroARImageMarker target={'water'} onAnchorFound={_onFoundCan}>
        <Viro3DObject
                position={[0,0,0]}
                source={require("../assets/model/can.obj")}
                type="OBJ"
                scale={[0.2, 0.2, 0.2]}
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
        <ViroARImageMarker target={'anime'} onAnchorFound={_onFoundCan}>
            <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARImageMarker>

      </>
    );
};
  
export default LabelMarker;