import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  onPress?: any;
  iconName: string;
  backgroundcolor: string;
  style?: any;
}

export default function Button(Props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={Props.onPress}
        style={[
          {backgroundColor: Props.backgroundcolor},
          Props.style,
          styles.button,
        ]}>
        <Icon name={Props.iconName} color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
      width:60,
      height:60,
      padding:10,
      elevation:10,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100
  },
});
