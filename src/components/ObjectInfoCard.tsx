import React from 'react';
import {
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';

export default function ObjectInfoCard() {
  return (
    <ViroNode key={'card'}>
      <ViroNode position={[0.4, -0.1, -0.1]}>
        <ViroFlexView
          style={styles.cardContainer}
          width={1.3}
          height={0.6}
          rotation={[-90, 0, 0]}
          transformBehaviors={['billboard']}>
          <ViroImage
            height={0.4}
            width={0.4}
            source={require('../../assets/images/coca/coca.png')}
            style={styles.imageContainer}
          />

          <ViroFlexView
            style={styles.informationContainer}
            transformBehaviors={['billboard']}>
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
                    text={'Nước ngọt Coca lon 320ml'}
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
                    text={'Coca Cola (Mỹ)'}
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
                    text={'Nước ngọt'}
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
                    text={'10.600 vnd'}
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

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0.01,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.4,
    padding: 0.001,
    flexDirection: 'row',
  },
  informationContainer: {
    flex: 0.6,
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
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
});
