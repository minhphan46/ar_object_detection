import {
  ViroARImageMarker,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ObjectText from '../components/ObjectText';

type ObjectDetectionProps = {
  modelName: string;
  images: Record<string, any>;
};

function ObjectDetectionPage(props: ObjectDetectionProps): JSX.Element {
  interface TargetData {
    [key: string]: {
      source: any;
      orientation: string;
      physicalWidth: number;
    };
  }

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

  const [isFoundOnject, setIsFoundOnject] = useState(false);

  function _onFoundObject(evt: any) {
    if (!isFoundOnject) {
      console.log(`Found Object ${props.modelName}`, evt);
      setIsFoundOnject(true);
    }
  }

  function _onLostObject(evt: any) {
    if (isFoundOnject) {
      console.log(`Found lose ${props.modelName}`, evt);
      setIsFoundOnject(false);
    }
  }

  const renderList = () => {
    const listItems = [];
    for (let i = 0; i < Object.keys(props.images).length; i++) {
      listItems.push(
        <ViroARImageMarker
          key={`${props.modelName}${i}`}
          target={`${props.modelName}${i + 1}`}
          onAnchorFound={_onFoundObject}
          onAnchorUpdated={_onFoundObject}
          onAnchorRemoved={_onLostObject}
          >
          <ObjectText modelName={props.modelName} />
        </ViroARImageMarker>,
      );
    }
    return listItems;
  };

  return <View>{targetDataCreated && renderList()}</View>;
}

export default ObjectDetectionPage;
