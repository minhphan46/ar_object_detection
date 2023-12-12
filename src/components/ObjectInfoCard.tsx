import React from 'react';
import {
  ViroAnimations,
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro';
import {Alert, StyleSheet, Linking} from 'react-native';
import {ProductInfo} from '../data/ProductObject';
import {permissionLocation} from '../utils/permission_service';
import {useAppDispatch} from '../store/store';
import {setSelectedProduct} from '../store/slices/list_product_slice';
import {initPosition} from '../store/slices/direction_slice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

type ObjectCardInfoProps = {
  product: ProductInfo;
  isShowPreviewImage?: boolean;
};

export default function ObjectInfoCard(props: ObjectCardInfoProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {product} = props;

  function handleUrl() {
    Linking.canOpenURL(product.url).then(supported => {
      if (supported) {
        Linking.openURL(product.url);
      } else {
        console.log("Don't know how to open URI: " + product.url);
      }
    });
  }

  const handleDirection = async () => {
    const isLocationGranted = await permissionLocation();
    if (isLocationGranted) {
      dispatch(setSelectedProduct({product}));
      dispatch(
        initPosition({
          long: product.position.long,
          lat: product.position.lat,
        }),
      );
      navigation.navigate('DeviceDirectionPage');
    }
  };

  const showAlert = () =>
    Alert.alert(
      product.name,
      'Where would you like to see this product?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'destructive',
        },
        {
          text: 'Direction',
          onPress: () => handleDirection(),
          style: 'default',
        },
        {
          text: 'BHX Website',
          onPress: () => handleUrl(),
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );

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
          {props.isShowPreviewImage === true && (
            <ViroImage
              height={0.15}
              width={0.1}
              source={product.image}
              style={styles.imageContainer}
            />
          )}
          <ViroFlexView style={styles.informationContainer}>
            {/* product name */}
            <ViroFlexView style={styles.rowInfoContainer}>
              <ViroFlexView style={styles.labelContainer}>
                <ViroFlexView
                  scale={[0.2, 0.2, 0.2]}
                  style={styles.textContainer}>
                  <ViroText
                    width={1}
                    text={'Name:'}
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
                    text={product.name}
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
                    text={'Brand name:'}
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
                    text={product.brandName}
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
                    text={'Type:'}
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
                    text={product.type}
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
                    text={'Price:'}
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
                    text={product.price}
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
    easing: 'Linear',
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
