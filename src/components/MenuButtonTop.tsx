import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from '@rneui/themed/dist/Divider';

type MenuProps = {
  funNavtoScanObject: () => void;
  funNavtoScanImage: () => void;
  funNavtoPosition: () => void;
};

const MyDivider = () => (
  <Divider subHeaderStyle={styles.dividerBg} width={0.3} />
);

const MenuButtonTop = (props: MenuProps) => {
  return (
    <View>
      <Menu name="types">
        <MenuTrigger style={styles.trigger}>
          <MaterialCommunityIcons
            style={styles.cubeIcon}
            name="cube-outline"
            size={30}
            color="#000"
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionText: {fontSize: 18},
            optionsContainer: {
              borderRadius: 10,
              paddingHorizontal: 10,
            },
          }}>
          <MenuOption
            onSelect={props.funNavtoScanObject}
            customStyles={{
              optionWrapper: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="cube-scan"
              size={30}
              color="#000"
            />
            <Text style={styles.text}>{'Detect Objects'}</Text>
          </MenuOption>
          <MyDivider />
          <MenuOption
            onSelect={props.funNavtoScanImage}
            customStyles={{
              optionWrapper: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}>
            <MaterialCommunityIcons
              style={styles.icon2}
              name="data-matrix-scan"
              size={26}
              color="#000"
            />
            <Text style={styles.text}>{'Detect Images'}</Text>
          </MenuOption>
          <MyDivider />
          <MenuOption
            onSelect={props.funNavtoPosition}
            customStyles={{
              optionWrapper: {
                flexDirection: 'row',
                alignItems: 'center',
              },
            }}>
            <MaterialCommunityIcons
              style={styles.icon2}
              name="map-marker-radius-outline"
              size={26}
              color="#000"
            />
            <Text style={styles.text}>{'Get Position'}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default MenuButtonTop;

const styles = StyleSheet.create({
  containerMenu: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 100,
    marginHorizontal: 100,
  },
  trigger: {
    padding: 5,
    margin: 5,
  },
  cubeIcon: {
    paddingLeft: 16,
  },
  icon: {
    marginLeft: 16,
    marginRight: 5,
  },
  icon2: {
    marginLeft: 18,
    marginRight: 7,
  },
  text: {
    fontSize: 15,
    margin: 10,
  },
  dividerBg: {
    color: '#878080',
  },
});
