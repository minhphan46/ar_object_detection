import {
  Viro3DObject,
    ViroARImageMarker,
    ViroARTrackingTargets,
    ViroMaterials,
    ViroText,
} from '@viro-community/react-viro';
import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import bohucImages from './bohuc_images';
import {StyleSheet} from 'react-native';

function BohucDetection(): JSX.Element {
    const modelName = 'bohuc';

    interface TargetData {
      [key: string]: {
        source: any; // You can specify the correct type for 'source' here
        orientation: string;
        physicalWidth: number;
      };
    }
    
    ViroMaterials.createMaterials({
      blue: {
        diffuseTexture: require('../../assets/images/mocks/anime.jpg'),
      },
    });
    
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

    const [isFoundOnject, setIsFoundOnject] = useState(false);


    function _onFoundObject(evt: any) {
      console.log(`Found Object ${modelName}`, evt);
      // if (!isFoundOnject) {
      //     console.log(`Found Object ${modelName}`, evt);
      //     setIsFoundOnject(true)
      // }
    }

    function _onLostObject(evt: any) {
      if (isFoundOnject) {
          console.log(`Found lose ${modelName}`, evt);
          setIsFoundOnject(false)
      }
    }

    function TextModel () : JSX.Element {
      return (
        <ViroText
          text={modelName}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0, 0]}
          rotation={[90, 180, 180]}
          style={styles.modelNameTextStyle} 
        />
      );
    }

    function ObjectModel () : JSX.Element {
      return (
          <Viro3DObject
            position={[0,0,0]}
            source={require("../../assets/model/can.obj")}
            type="OBJ"
            scale={[0.2, 0.2, 0.2]}
            rotation={[0, 90, 0]}
            materials={['blue']}
            dragPlane={{
                planeNormal: [0, 0, 0],
                planePoint: [0, 0, -2],
                maxDistance: 5,
            }}
            onDrag={(event) => console.log("Drag Event: bottle", event)}
          />
      );
    }

    

    const renderList = () => {
      const listItems = [];
      for (let i = 0; i < 25; i++) {
        listItems.push(
          <ViroARImageMarker 
            key={`${modelName}${i}`} 
            target={`${modelName}${i + 1}`} 
            onAnchorFound={_onFoundObject} 
            onAnchorUpdated={_onFoundObject}
            onAnchorRemoved={_onLostObject}>
             {
              <TextModel/>
             }
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

const styles = StyleSheet.create({
  modelNameTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'blue',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
  
export default BohucDetection;