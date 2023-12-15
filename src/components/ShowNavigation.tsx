import React, {useEffect, useState} from 'react';
import {
  Viro3DObject,
  ViroARScene,
  ViroAnimations,
  ViroCamera,
  ViroMaterials,
  ViroNode,
  ViroSpinner,
} from '@viro-community/react-viro';
import {useAppDispatch, useAppSelector} from '../store/store';
import {getRad2deg} from '../utils/get_angle_service';
import {CanType, getCanSource} from '../data/enum/3DCanEnum';
import {getDistance} from '../utils/viro_position_service';
import {ViroPosition, toggleShowModal} from '../store/slices/direction_slice';
import ObjectInfoCard from './ObjectInfoCard';
var turf = require('@turf/turf');

type GetArrowModelsProps = {
  x: number;
  y: number;
  z: number;
  rotationX?: number;
};

type GetLineProps = {
  point1: ViroPosition;
  point2: ViroPosition;
  angle: number;
  isLastLine: boolean;
};

function ShowNavigation(): JSX.Element {
  const {objectViroPosition, isFirstInit, direction} = useAppSelector(
    state => state.direction,
  );

  const [camera, setCamera] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCamera(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ViroARScene>
      {camera ? (
        <ViroCamera
          position={[0, 0, 0]}
          rotation={[0, direction.heading, 0]}
          active={isFirstInit}>
          <ShowModels
            x={objectViroPosition?.x ?? 0}
            y={-1}
            z={objectViroPosition?.z ?? -1}
            rotationX={0}
          />
        </ViroCamera>
      ) : (
        <ViroSpinner type="light" position={[0, 0, -2]} />
      )}
    </ViroARScene>
  );
}

export function ShowModels(props: GetArrowModelsProps) {
  const dispatch = useAppDispatch();
  const [isRotate, setRotate] = useState(true);
  const {x, y, z} = props;
  const [rotationX, setRotationX] = useState<number>(0);
  //const [showInformation, setShowInformation] = useState<boolean>(false);

  const {selectedProduct} = useAppSelector(state => state.listProduct);
  ViroAnimations.registerAnimations({
    loopRotate: {
      properties: {
        rotateY: '+=45',
      },
      duration: 500,
    },
  });

  useEffect(() => {
    const rad = Math.atan2(x, z);
    setRotationX(() => 180 - getRad2deg(rad));
  }, [x, z]);

  ViroMaterials.createMaterials({
    blue: {
      diffuseColor: 'rgba(11, 127, 171, 1)',
    },
    red: {
      diffuseColor: '#FFA533',
    },
    label: {
      diffuseColor: 'rgba(171,171,171,1)',
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
      diffuseTexture: selectedProduct?.canObject[0].brandLabel,
      specularTexture: selectedProduct?.canObject[0].brandLabel,
    },
    pointer_label: {
      diffuseColor: 'rgba(194,48,48,1)',
      writesToDepthBuffer: true,
      readsFromDepthBuffer: true,
    },
  });

  return (
    <>
      {/* <GetArrowModels x={x} y={y} z={z} rotationX={rotationX} /> */}
      <DrawDirection />
      <ViroNode
        position={[x, y, z]}
        onClickState={(stateValue, position, source) => {
          console.log('ClickState', stateValue, position, source);
        }}
        onClick={(position, _) => {
          console.log(position);
          //setShowInformation(!showInformation);
          dispatch(toggleShowModal({}));
        }}>
        <ViroNode>
          <Viro3DObject
            position={[0, 3, 0]}
            source={require('../../assets/model/map_pointer.obj')}
            materials={['pointer_label']}
            type="OBJ"
            scale={[0.8, 0.8, 0.8]}
            rotation={[0, 0, 0]}
            animation={{name: 'loopRotate', run: true, loop: isRotate}}
          />
        </ViroNode>
        <Viro3DObject
          source={getCanSource(CanType.can250)}
          materials={['label']}
          type="OBJ"
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, 0, 0]}
        />
        {/* {showInformation && selectedProduct && (
          <ViroNode
            position={[0, -0.5, -1.5]}
            rotation={[90, 90, 0]}
            scale={[2, 2, 2]}>
            <ObjectInfoCard
              product={selectedProduct}
              isShowPreviewImage={false}
            />
          </ViroNode>
        )} */}
      </ViroNode>
    </>
  );
}

function GetListLines(): ViroPosition[][] {
  const {listShortestPoint} = useAppSelector(state => state.direction);
  // cứ hai điểm trong list, tách thành một cặp
  let listLine: ViroPosition[][] = [];

  for (let i = 0; i < listShortestPoint.length - 1; i++) {
    listLine.push([listShortestPoint[i], listShortestPoint[i + 1]]);
  }

  return listLine;
}

function DrawDirection(): JSX.Element {
  const listLine = GetListLines();
  const {listAngleDirection} = useAppSelector(state => state.direction);

  return (
    <>
      {listLine.map((line, index) => {
        return (
          <DrawDirectionModel
            key={index}
            point1={line[0]}
            point2={line[1]}
            isLastLine={index === listLine.length - 1}
            angle={listAngleDirection[index]}
          />
        );
      })}
    </>
  );
}

function DrawDirectionModel(props: GetLineProps): JSX.Element {
  const numOfPoint = GetNumOfModelDraw(props.point1, props.point2);

  return (
    <>
      {[...Array(numOfPoint)].map((_, i) => {
        const t = i / numOfPoint;
        const x = props.point1.x + (props.point2.x - props.point1.x) * t;
        const z = props.point1.z + (props.point2.z - props.point1.z) * t;

        //const angle = angleBetweenTwoPoint(props.point1, props.point2);
        return i === numOfPoint - 1 && !props.isLastLine ? (
          <Viro3DObject
            key={i}
            source={require('../../assets/model/arrow.obj')}
            type="OBJ"
            materials={['red']}
            opacity={1}
            position={[x, -1, z]}
            scale={[0.3, 0.3, 0.3]}
            rotation={[props.angle, 180, 90]}
          />
        ) : (
          <Viro3DObject
            key={i}
            source={require('../../assets/model/ball.obj')}
            type="OBJ"
            materials={['blue']}
            opacity={0.8}
            position={[x, -1, z]}
            scale={[0.06, 0.06, 0.06]}
          />
        );
      })}
    </>
  );
}

function GetNumOfModelDraw(point1: ViroPosition, point2: ViroPosition): number {
  // can (point1.x - point2.x) * (point1.x - point2.x) + (point1.z - point2.z) * (point1.z - point2.z)
  const direction = Math.sqrt(
    (point1.x - point2.x) * (point1.x - point2.x) +
      (point1.z - point2.z) * (point1.z - point2.z),
  ).toFixed(0);
  // lam tron so
  return parseFloat(direction);
}

function GetNumOfBall(): number {
  const {currentPosition, objectMapPosition} = useAppSelector(
    state => state.direction,
  );
  const currentPositionPoint = turf.point([
    currentPosition.long,
    currentPosition.lat,
  ]);

  const objectMapPositionPoint = turf.point([
    objectMapPosition.long,
    objectMapPosition.lat,
  ]);
  // lam tron so
  return parseFloat(
    getDistance(currentPositionPoint, objectMapPositionPoint).toFixed(0),
  );
}

function GetArrowModels(props: GetArrowModelsProps): JSX.Element {
  const {x, y, z, rotationX} = props;

  const numArrow = GetNumOfBall();

  return (
    <>
      {[...Array(numArrow)].map((_, i) => {
        return (
          <Viro3DObject
            key={i}
            source={require('../../assets/model/ball.obj')}
            type="OBJ"
            materials={['blue']}
            opacity={0.5}
            position={[(x / numArrow) * i, y - 0.2, (z / numArrow) * i]}
            scale={[0.02, 0.02, 0.02]}
            rotation={[rotationX ?? 0, 0, -90]}
          />
        );
      })}
    </>
  );
}

export default ShowNavigation;
