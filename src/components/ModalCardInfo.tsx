import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ProductInfo} from '../data/ProductObject';
import {useAppDispatch, useAppSelector} from '../store/store';
import {toggleShowModal} from '../store/slices/direction_slice';

const ModalCardInfo = () => {
  const {isShowModal} = useAppSelector(state => state.direction);
  const {selectedProduct} = useAppSelector(state => state.listProduct);

  const dispatch = useAppDispatch();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowModal}
      onRequestClose={() => {
        dispatch(toggleShowModal({}));
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image
            style={styles.buttonImageIconStyle}
            source={selectedProduct?.image}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Name: </Text>
            <Text style={styles.modalText}>{selectedProduct?.name}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Brand name: </Text>
            <Text style={styles.modalText}>{selectedProduct?.brandName}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Type: </Text>
            <Text style={styles.modalText}>{selectedProduct?.type}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalText}>Price: </Text>
            <Text style={styles.modalText}>{selectedProduct?.price}</Text>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => dispatch(toggleShowModal({}))}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCardInfo;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonImageIconStyle: {
    alignSelf: 'center',
    height: 100,
    width: 100,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#711DB0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
