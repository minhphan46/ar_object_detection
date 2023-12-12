import {
  ViroARImageMarker,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ObjectInfoCard from './ObjectInfoCard';
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  removeObjectDetected,
  updateObjectDetected,
} from '../store/slices/detect_object_slice';
import {ProductInfo} from '../data/ProductObject';

interface TargetData {
  [key: string]: {
    source: any;
    orientation: string;
    physicalWidth: number;
  };
}

type ObjectDetectionProps = {
  product: ProductInfo;
};

function ObjectDetectionList(props: ObjectDetectionProps): JSX.Element {
  const {product} = props;

  const dispatch = useAppDispatch();
  const {idObject, indexImageDetected} = useAppSelector(
    state => state.detectObject,
  );

  const [targetDataCreated, setTargetDataCreated] = useState(false);

  useEffect(() => {
    const targetData: TargetData = {};
    if (product.imageDetect !== undefined) {
      // Sử dụng mảng imagePaths để tạo targetData
      Object.keys(product.imageDetect!).forEach((key, i) => {
        targetData[`${product.name}${i + 1}`] = {
          source: product.imageDetect![key],
          orientation: 'Up',
          physicalWidth: 0.25, // real-world width in meters
        };
      });

      ViroARTrackingTargets.createTargets(targetData);

      setTargetDataCreated(true);
    }
  }, [product.imageDetect, product.name]);

  function _onFoundObject(evt: any, indexImage: number) {
    try {
      if (product.id !== idObject && indexImage !== indexImageDetected) {
        dispatch(
          updateObjectDetected({
            id: product.id,
            indexImageDetected: indexImage,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function _onUpdatedObject(_: any) {}

  function _onLostObject(_: any) {
    if (product.id === idObject) {
      dispatch(removeObjectDetected({}));
    }
  }

  const renderList = () => {
    const listItems = [];
    if (product.imageDetect === undefined) {
      return [];
    }
    try {
      for (let i = 0; i < Object.keys(product.imageDetect!).length; i++) {
        if (i !== indexImageDetected) {
          listItems.push(
            <ViroARImageMarker
              key={`${product.name}${i}`}
              target={`${product.name}${i + 1}`}
              onAnchorFound={() => _onFoundObject(product.name, i)}
              onAnchorRemoved={_onLostObject}
            />,
          );
        }
      }

      if (indexImageDetected !== -1 && product.id === idObject) {
        listItems.push(
          <ViroARImageMarker
            key={`${product.name}${indexImageDetected}`}
            target={`${product.name}${indexImageDetected + 1}`}
            onAnchorRemoved={_onLostObject}
            onAnchorUpdated={_onUpdatedObject}>
            <ObjectInfoCard product={product} isShowPreviewImage={true} />
          </ViroARImageMarker>,
        );
      }
    } catch (err) {
      console.log(err);
    }
    return listItems;
  };

  return <View>{targetDataCreated && renderList()}</View>;
}

export default ObjectDetectionList;
