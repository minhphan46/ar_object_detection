import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Viro3DObject,
  ViroARScene,
  ViroMaterials,
} from '@viro-community/react-viro';
// Import react-native-sensors
import {magnetometer} from 'react-native-sensors';
import {
  getRad2deg,
  getDirection,
  getNewPosition,
} from '../services/get_angle_service';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function NavigationPage(): JSX.Element {
  const initPosition = {x: 0, y: -1, z: 0};
  let productPosition = {x: 0, y: -0.5, z: -11};
  // Define a state variable to store the direction
  let appAngle = 0;
  let isGetAngle = false;
  //const [isGetAngle, setIsGetAngle] = useState(false);
  const initAngle = 130;

  // function getArrowModels() {
  //   const arrowModels = [];
  //   console.log('asdadasdasdasdasdassdassdas');

  //   for (let i = 1; i <= 10; i++) {
  //     arrowModels.push(
  //       <Viro3DObject
  //         key={i}
  //         source={require('../../assets/model/arrow.obj')}
  //         type="OBJ"
  //         materials={['blue']}
  //         position={[initPosition.x, initPosition.y, initPosition.z - i]}
  //         scale={[0.05, 0.05, 0.05]}
  //         rotation={[0, 0, 90]}
  //       />,
  //     );
  //   }
  //   return arrowModels;
  // }

  // Define an effect hook to subscribe to the magnetometer data
  useEffect(() => {
    // Set up a subscription to the magnetometer data
    const subscription = magnetometer.subscribe(({x, y}) => {
      // Calculate the angle of the device based on the x and y values
      let angle = Math.atan2(y, x);
      // Convert the angle from radians to degrees
      //angle = getRad2deg(angle);
      // Adjust the angle to match the compass directions
      //angle += initAngle;
      if (angle > 360) {
        angle -= 360;
      }
      // Update the direction state variable with the angle
      if (!isGetAngle) {
        appAngle = -angle;
        console.log(`=================================direction ${appAngle}`);
        productPosition = getNewPosition(productPosition, appAngle);
        console.log(
          `=================================product ${
            productPosition.x +
            ' ' +
            productPosition.y +
            ' ' +
            productPosition.z
          }`,
        );
        isGetAngle = true;
        //setIsGetAngle(true);
      }
    });
    // Return a cleanup function to unsubscribe from the magnetometer data
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ViroARScene>
      {/* {getArrowModels()} */}
      <Viro3DObject
        key={Date.now.toString()}
        source={require('../../assets/model/can.obj')}
        type="OBJ"
        materials={['label']}
        position={[productPosition.x, productPosition.y, productPosition.z]}
        scale={[1, 1, 1]}
        rotation={[0, 0, 0]}
      />
    </ViroARScene>
  );
}

export default NavigationPage;

ViroMaterials.createMaterials({
  blue: {
    diffuseColor: 'rgba(11, 127, 171, 1)',
  },
  label: {
    diffuseColor: 'rgba(196, 77, 86, 1)',
  },
});
