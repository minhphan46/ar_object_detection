import {
    ViroARScene,
    ViroText,
    ViroNode,
    ViroScene,
    Viro3DObject,
    Viro360Image,
    ViroFlexView,
    ViroImage,
    ViroTrackingState,
    ViroTrackingReason,
    ViroARSceneNavigator,
    ViroBox,
    ViroMaterials,
    ViroAnimations,
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroARPlane,
    ViroARImageMarker,
    ViroARTrackingTargets,
  } from '@viro-community/react-viro';
  import { Viro3DPoint } from '@viro-community/react-viro/dist/components/Types/ViroUtils';
  import React, {useState} from 'react';
  import {StyleSheet} from 'react-native';


function HelloWorldSceneAr(): JSX.Element {
    const [text, setText] = useState<string>('Initializing AR...');
  
    function onInitialized(
      state: ViroTrackingState,
      reason: ViroTrackingReason,
    ): void {
      console.log('guncelleme', state, reason);
      // if (state === ViroConstants.TRACKING_NORMAL) {
      //   setText('Hello World!');
      // } else if (state === ViroConstants.TRACKING_NONE) {
      //   // Handle loss of tracking
      // }
    }
    ViroMaterials.createMaterials({
      wood: {
        diffuseTexture: require('../assets/images/wood.jpg'),
      },
      anime: {
        diffuseTexture: require('../assets/images/anime.jpg'),
      },
      waterColor: {
        diffuseTexture: require('../assets/images/watercolor.jpg'),
      }
    });
  
    ViroAnimations.registerAnimations({
      rotate: {
        duration: 2000,
        properties: {
          rotateY: '+=90',
        },
      },
    });
  
    function _onAnchorFound(evt: any) {
      console.log('Anchor found in Marker :', evt);
    }
  
    return (
      <ViroARScene>
         <ViroARImageMarker target={'vietnam'} onAnchorFound={_onAnchorFound}>
            <Viro3DObject
                position={[0,0,0]}
                source={require("../assets/model/can.obj")}
                type="OBJ"
                scale={[0.5, 0.5, 0.5]}
                rotation={[0, 90, 0]}
                materials={['anime']}
                dragPlane={{
                    planeNormal: [0, 0, 0],
                    planePoint: [0, 0, -2],
                    maxDistance: 5,
                }}
                onDrag={(event) => console.log("Drag Event: satori", event)}
                />
          </ViroARImageMarker>
        {/* <OBJTest></OBJTest> */}
        {/* <ViroText
          text={text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -5]}
          style={styles.helloWorldTextStyle}
        /> */}
        {/* <Viro360Image source={require('../assets/landscape.jpeg')} /> */}
        {/* <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
          <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        </ViroARPlane> */}
      </ViroARScene>
    );
  }
  
  interface CatBoxArguments {
    position: Viro3DPoint
  }
  
  function CatBox (position : CatBoxArguments) : JSX.Element {
    return (
      <ViroNode position={position.position} scale={[1, 1, 1]}>
          <ViroBox
          height={2}
          length={2}
          width={2}
          scale={[0.2, 0.2, 0.2]}
          materials={['wood']}
          animation={{name: 'rotate', loop: true, run: true}}></ViroBox>
      </ViroNode>
    );
  }
  function CatText (position : CatBoxArguments) : JSX.Element {
    return (
      <ViroNode position={position.position} scale={[0.5, 0.5, 0.5]}>
          <ViroText style={styles.helloWorldTextStyle} text="Text A" position={[0, 0, 1]}  />
        </ViroNode>
    );
  }
  // Outside of the render function, register the target
  ViroARTrackingTargets.createTargets({
    vietnam: {
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
    satori: {
    source: require('../assets/images/satori.jpg'),
    orientation: "Up",
    physicalWidth: 0.25, // real world width in meters
    },
    cokecan: {
        source: require('../assets/model/cokecan.arobject'),
        orientation: "Up",
        physicalWidth: 0.25, // real world width in meters
      },
  });
  
  function Model3D (position : CatBoxArguments) : JSX.Element {
    return (
      <ViroNode position={position.position} scale={[1, 1, 1]}>
        <Viro3DObject
          source={require("../assets/model/ball.obj")}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          materials={['wood']}
        />
      </ViroNode>
    );
  }
  const OBJTest = () => {
    return (
      <>
    <ViroARScene>
      <ViroARImageMarker target={"bottle"}>
        <ViroBox position={[0, .25, 0]} scale={[.5, .5, .5]} />
      </ViroARImageMarker>
    </ViroARScene>
    </>
    
    //   <> 
    //   {
    //     [1,2,3,4,5,6,7,8,9,10].map((item, index) => {
    //       return <Model3D key ={index} position={[0,-5, -6 - index * 10]}></Model3D>
    //     })
    //   }
    // </> 
    //<ViroFlexView
      //   style={{
      //     flexDirection: 'row', 
      //     padding: .1
      //   }}
      //   width={5.0} 
      //   height={5.0}
      //   position={[-5.0, 0.0, -2.0]}
      //   rotation={[0, 70, 0]} >
      //     <ViroImage
      //       source={require('./assets/cat.jpg')} 
      //       style={{flex: .5}} />
      // </ViroFlexView>
    )
  }
  const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
    },
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: 'red',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });
  
  
  export default HelloWorldSceneAr;