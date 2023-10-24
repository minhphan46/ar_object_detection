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
      diffuseTexture: require('./assets/wood.jpg'),
    },
    anime: {
      diffuseTexture: require('./assets/anime.jpg'),
    },
    waterColor: {
      diffuseTexture: require('./assets/watercolor.jpg'),
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

  return (
    <ViroARScene>
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
        style={styles.helloWorldTextStyle}
      /> */}
      {/* <Viro360Image source={require('./assets/landscape.jpeg')} /> */}
      <ViroARPlane minHeight={0.1} minWidth={0.1} alignment={'Horizontal'}>
        <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} />
        {/* <OBJTest></OBJTest> */}
      </ViroARPlane>
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

function Model3D (position : CatBoxArguments) : JSX.Element {
  return (
      <Viro3DObject
        source={require("./assets/direction_arrow.glb")}
        position={position.position}
        scale={[0.5, 0.5, 0.5]}
        rotation={[0, 90, 0]}
        type="GLB"
        materials={['wood']}
      />
  );
}
const OBJTest = () => {
  return (
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
    
    // <Viro3DObject
    //   source={require("./assets/ball.obj")}
    //   position={[0, -5, -6]}
    //   scale={[0.5, 0.5, 0.5]}
    //   type="OBJ"
    //   materials={['wood']}
    // />

    <ViroARPlaneSelector>
    {
      [1,2,3,4,5,6,7,8,9,10].map((object, index) => {
        return <Model3D key={index} position={[0,0, 0 - index * 10]}></Model3D>
      })
    }
    </ViroARPlaneSelector>
  )
}
function App(): JSX.Element {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => <HelloWorldSceneAr />,
      }}
      style={styles.rootContainer}
    />
  );
}

export default App;

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

