import React from 'react';
import {
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import {StyleSheet} from 'react-native';

export default function CardInfo() {
  return (
    <ViroNode key={'card'}>
      <ViroNode position={[0.4, -0.1, -0.1]}>
        <ViroFlexView
          style={styles.cardContainer}
          width={1.4}
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
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Thương hiệu: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={'Coca Cola (Mỹ)'}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
            </ViroFlexView>

            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Sản xuất tại: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={'Việt Nam'}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
            </ViroFlexView>

            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Loại nước: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={'Có ga'}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
            </ViroFlexView>

            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Lượng đường: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={'Có đường'}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
            </ViroFlexView>

            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Thể tích: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={'320ml'}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
            </ViroFlexView>

            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroText
                  text={'Giá tiền: '}
                  maxLines={3}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
              </ViroFlexView>
              <ViroFlexView style={styles.contentContainer}>
                <ViroText
                  text={
                    '10.600 vnd jsndjnsjdn aaaaaaa ggggg fff hshdbd jjjh jjn'
                  }
                  maxLines={4}
                  style={styles.textTitle}
                  textLineBreakMode={'None'}
                  textClipMode={'None'}
                  scale={[0.2, 0.2, 0.2]}
                />
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
    padding: 0.001,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 0.4,
    padding: 0.001,
    flexDirection: 'row',
  },
  informationContainer: {
    flex: 0.6,
    padding: 0.02,
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
  textTitle: {
    flex: 1,
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
});
