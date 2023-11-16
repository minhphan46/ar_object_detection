import {ViroARScene, ViroARSceneNavigator} from '@viro-community/react-viro';
import {StyleSheet, View} from 'react-native';
import CompassObject from '../components/CompassObject';
import {listProduct} from '../data/ProductObject';
import ObjectDetectionList from '../components/ObjectDetectionList';

function ViroARDetectionObjectPage() {
  return (
    <View style={styles.outer}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: DetectObjectListPage,
        }}
        style={styles.rootContainer}
      />
    </View>
  );
}

export default ViroARDetectionObjectPage;

export function DetectObjectListPage(): JSX.Element {
  return (
    <ViroARScene>
      {listProduct.map(
        product =>
          product.imageDetect && (
            <ObjectDetectionList
              key={product.id}
              modelName={product.name}
              description={product.brandName}
              images={product.imageDetect}
              imageLogo={product.image}
              productType={product.type}
              price={product.price}
              url={product.url}
              handleClick={() => {
                console.log('Click Model');
              }}
            />
          ),
      )}
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
  },
  buttons: {
    height: 80,
    width: 80,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  },
  fab3DButton: {
    position: 'absolute',
    left: 20,
    right: 0,
    bottom: 30,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  location: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
