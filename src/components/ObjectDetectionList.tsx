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

interface TargetData {
  [key: string]: {
    source: any;
    orientation: string;
    physicalWidth: number;
  };
}

type ObjectDetectionProps = {
  modelName: string;
  description: string;
  images: Record<string, any>;
  imageLogo: any;
  productType: string;
  price: string;
  url: string;
  handleClick: () => void;
};

function ObjectDetectionList(props: ObjectDetectionProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {idObject, indexImageDetected} = useAppSelector(
    state => state.detectbject,
  );

  const [targetDataCreated, setTargetDataCreated] = useState(false);

  useEffect(() => {
    const targetData: TargetData = {};
    // Sử dụng mảng imagePaths để tạo targetData
    Object.keys(props.images).forEach((key, i) => {
      targetData[`${props.modelName}${i + 1}`] = {
        source: props.images[key],
        orientation: 'Up',
        physicalWidth: 0.25, // real-world width in meters
      };
    });

    ViroARTrackingTargets.createTargets(targetData);

    // Set the flag to indicate that targetData is created
    setTargetDataCreated(true);
  }, [props.images, props.modelName]);

  function _onFoundObject(evt: any, id: number) {
    try {
      console.log(`Found Object ${props.modelName} ${id} `, evt);
      if (props.modelName !== idObject && id !== indexImageDetected) {
        dispatch(
          updateObjectDetected({
            id: props.modelName,
            indexImageDetected: id,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function _onUpdatedObject(_: any) {}

  function _onLostObject(_: any) {
    console.log(`Lost Object ${props.modelName}`);
    if (props.modelName === idObject) {
      dispatch(removeObjectDetected({}));
    }
  }

  const renderList = () => {
    const listItems = [];
    try {
      for (let i = 0; i < Object.keys(props.images).length; i++) {
        if (i !== indexImageDetected) {
          listItems.push(
            <ViroARImageMarker
              key={`${props.modelName}${i}`}
              target={`${props.modelName}${i + 1}`}
              onAnchorFound={() => _onFoundObject(props.modelName, i)}
              onAnchorRemoved={_onLostObject}
            />,
          );
        }
      }

      if (indexImageDetected !== -1 && props.modelName === idObject) {
        listItems.push(
          <ViroARImageMarker
            key={`${props.modelName}${indexImageDetected}`}
            target={`${props.modelName}${indexImageDetected + 1}`}
            onAnchorRemoved={_onLostObject}
            onAnchorUpdated={_onUpdatedObject}>
            {/* <ObjectText modelName={props.modelName} color={props.color} /> */}
            {/* <ObjectCardInfo
              modelName={props.modelName}
              color={props.color}
              image={props.imageLogo}
              description={props.description}
            /> */}
            <ObjectInfoCard
              modelName={props.modelName}
              image={props.imageLogo}
              description={props.description}
              productType={props.productType}
              price={props.price}
              url={props.url}
              handleClick={props.handleClick}
            />
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
