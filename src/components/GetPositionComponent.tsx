import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function GetPositionComponent() {
  const [position, setPosition] = useState<string | null>(null);

  const getCurrentPosition = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.position}>{position}</Text>
      <Button title="Get Current Position" onPress={getCurrentPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  position: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
