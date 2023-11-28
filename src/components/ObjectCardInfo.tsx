import {
  ViroText,
  ViroMaterials,
  ViroImage,
  ViroFlexView,
  ViroAnimations,
  ViroNode,
} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';
import React from 'react';

type ObjectCardInfoProps = {
  modelName: string;
  color: string;
  image: any;
  description: string;
};

export default function ObjectCardInfo(props: ObjectCardInfoProps) {
  function getARScene(): JSX.Element {
    return (
      <ViroNode key="card">
        <ViroNode
          opacity={0}
          position={[0.4, 0, 0]}
          animation={{
            name: 'animateImage',
            run: true,
          }}>
          <ViroFlexView
            rotation={[-90, 0, 0]}
            height={0.3}
            width={0.5}
            style={styles.card}>
            <ViroFlexView style={styles.cardWrapper}>
              <ViroImage height={0.1} width={0.1} source={props.image} />
              <ViroText
                textClipMode="None"
                text={props.modelName}
                width={1}
                scale={[0.1, 0.1, 0.1]}
                style={{...styles.textStyle, color: props.color}}
              />
            </ViroFlexView>
            <ViroFlexView
              //onTouch={() => alert('twitter')}
              style={styles.subText}>
              <ViroText
                width={0.01}
                height={0.01}
                textClipMode="None"
                text={props.description}
                scale={[0.1, 0.1, 0.1]}
                style={styles.textStyle}
              />
            </ViroFlexView>
          </ViroFlexView>
        </ViroNode>
      </ViroNode>
    );
  }

  return <>{getARScene()}</>;
}

const styles = StyleSheet.create({
  textStyle: {
    flex: 0.2,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column',
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: 0.4,
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 0.5,
  },
});

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: 'rgba(255,255,255,1)',
  },
  quad: {
    diffuseColor: 'rgba(0,0,0,0.5)',
  },
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.3,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 500,
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 500,
  },
});
