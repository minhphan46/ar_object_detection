import {
  ViroARImageMarker,
  ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ObjectText from '../components/ObjectText';
import ObjectCardInfo from '../components/ObjectCardInfo';

type ObjectDetectionProps = {
  modelName: string;
  description: string;
  images: Record<string, any>;
  color: string;
  imageLogo: any;
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
  const [isFoundOnject, setIsFoundOnject] = useState(false);

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
    console.log(`Found Object ${props.modelName} ${id}`, evt);
    setIsFoundOnject(!isFoundOnject);
    setIndexImageFound(id);
  }

  function _onLostObject(evt: any) {
    if (isFoundOnject) {
    }
    setIsFoundOnject(false);
    console.log(`Lost Object ${props.modelName}`, evt);
  }

  const [indexImageFound, setIndexImageFound] = useState<number>(-1);

  const renderList = () => {
    const listItems = [];
    for (let i = 0; i < Object.keys(props.images).length; i++) {
      if (i !== indexImageFound)
        listItems.push(
          <ViroARImageMarker
            key={`${props.modelName}${i}`}
            target={`${props.modelName}${i + 1}`}
            onAnchorFound={() => _onFoundObject(props.modelName, i)}
            onAnchorRemoved={_onLostObject}
          />,
        );
    }

    console.log(`index ${indexImageFound}`);

    if (indexImageFound !== -1) {
      listItems.push(
        <ViroARImageMarker
          key={`${props.modelName}${indexImageFound}`}
          target={`${props.modelName}${indexImageFound + 1}`}
          onAnchorRemoved={_onLostObject}>
          {/* <ObjectText modelName={props.modelName} color={props.color} /> */}
          <ObjectCardInfo
            modelName={props.modelName}
            color={props.color}
            image={props.imageLogo}
            description={props.description}
          />
        </ViroARImageMarker>,
      );
    }

    return listItems;
  };

  return <View>{targetDataCreated && renderList()}</View>;
}

export default ObjectDetectionPage;
