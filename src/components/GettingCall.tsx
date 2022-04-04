import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from './Button';

interface Props {
  hangup: () => void;
  join: () => void;
}
export default function GettingCall(props: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/girl.jpeg')} />
      <View style={styles.bContainer}>
        <Button
          iconName="phone"
          backgroundcolor="green"
          onPress={props.join}
          style={{marginRight: 30}}
        />
         <Button
          iconName="phone"
          backgroundcolor="red"
          onPress={props.join}
          style={{marginRight: 30}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bContainer: {
      flexDirection:'row',
      bottom:-350
  },
});
