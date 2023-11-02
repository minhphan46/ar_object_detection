import React from 'react';
import {
  ViroAnimations,
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import {Alert, StyleSheet} from 'react-native';

type ObjectCardInfoProps = {
  modelName: string;
  color: string;
  image: any;
  description: string;
  productType: string;
  price: string;
  url: string;
};

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

export default function ObjectInfoCard(props: ObjectCardInfoProps) {
  return (
    <ViroNode key={'card'}>
      <ViroNode
        position={[0.1, 0, 0]}
        animation={{
          name: 'animateImage',
          run: true,
        }}>
        <ViroFlexView
          onClick={showAlert}
          style={styles.cardContainer}
          width={0.8}
          height={0.4}
          rotation={[-90, 0, 0]}>
          <ViroImage
            height={0.15}
            width={0.1}
            source={props.image}
            style={styles.imageContainer}
          />
          <ViroFlexView style={styles.informationContainer}>
            {/* product name */}
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={1}
                    text={'Tên sản phẩm:'}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={2}
                    text={props.modelName}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroFlexView>

            {/* branch */}
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={1}
                    text={'Thương hiệu:'}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={2}
                    text={props.description}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroFlexView>

            {/* Category */}
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={1}
                    text={'Loại sản phẩm:'}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={2}
                    text={props.productType}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroFlexView>
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={1}
                    text={'Giá tiền:'}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={2}
                    text={props.price}
                    maxLines={2}
                    style={styles.textTitle}
                    textLineBreakMode={'WordWrap'}
                    textClipMode={'None'}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroFlexView>
          </ViroFlexView>
        </ViroFlexView>
      </ViroNode>
    </ViroNode>
  );
}

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.05,
      positionZ: -0.4,
      positionY: -0.1,
      opacity: 1.0,
    },
    easing: 'Bounce',
    duration: 300,
  },
});

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0.01,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.2,
    padding: 0.001,
    flexDirection: 'row',
  },
  informationContainer: {
    flex: 0.8,
    paddingHorizontal: 0.04,
    textAlign: 'left',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'stretch',
  },
  rowInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  labelContainer: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  contentContainer: {
    flex: 0.6,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  textContainer: {
    flex: 1,
    width: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textTitle: {
    flex: 1,
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
});
