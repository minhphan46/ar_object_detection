import {
  ViroARScene,
  ViroText,
  ViroNode,
  ViroScene,
  Viro3DObject,
  Viro360Image,
  ViroTrackingState,
  ViroTrackingReason,
  ViroARSceneNavigator,
} from '@viro-community/react-viro';
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

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
        style={styles.helloWorldTextStyle}
      /> */}
      {/* <Viro360Image source={require('./assets/landscape.jpeg')} /> */}
      
      <OBJTest></OBJTest>
    </ViroARScene>
  );
}
const OBJTest = () => {
  return (
    // <ViroText
    //     text={"Hello askdjjhalskdhasldhsa"}
    //     scale={[0.5, 0.5, 0.5]}
    //     position={[0, 0, -1]}
    //     style={styles.helloWorldTextStyle}
    //   />
    <>
<ViroNode position={[0, 0, -1]} scale={[0.5, 0.5, 0.5]}>
        <ViroText style={styles.helloWorldTextStyle} text="Text A" position={[0, 0, 1]}  />
         
      </ViroNode>
      <ViroNode position={[0, 0, -2 ]} scale={[1, 1, 1]}>
          <ViroText style={styles.helloWorldTextStyle} text="Text B" />
        </ViroNode> 
    </>
    
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

