import {
    ViroARImageMarker,
    ViroARTrackingTargets,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import bohucImages from './bohuc_images';

function BohucDetection(): JSX.Element {
    const modelName = 'bohuc';

    interface TargetData {
      [key: string]: {
        source: any; // You can specify the correct type for 'source' here
        orientation: string;
        physicalWidth: number;
      };
    }
    
    const targetData: TargetData = {};
    const [targetDataCreated, setTargetDataCreated] = useState(false);

    useEffect(() => {
      // Sử dụng mảng imagePaths để tạo targetData
      Object.keys(bohucImages).forEach((key, i) => {
          targetData[`${modelName}${i + 1}`] = {
              source: bohucImages[key],
              orientation: "Up",
              physicalWidth: 0.25, // real-world width in meters
          };
      });

      ViroARTrackingTargets.createTargets(targetData);

      // Set the flag to indicate that targetData is created
      setTargetDataCreated(true);
    }, []);

    function _onFoundCan(evt: any) {
        console.log(`Found Object ${modelName}`, evt);
    }

    const renderList = () => {
      const listItems = [];
      for (let i = 0; i < 25; i++) {
        listItems.push(
          <ViroARImageMarker key={`${modelName}${i}`} target={`${modelName}${i + 1}`} onAnchorFound={_onFoundCan}>
            
          </ViroARImageMarker>
        );
      }
      return listItems;
    };

    return (
      <View>
        {targetDataCreated && renderList()}
      </View>
    );
};
  
export default BohucDetection;