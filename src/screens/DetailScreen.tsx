import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import RatePopupComp from '../components/RatePopupComp';
import {AuthParamList} from '../Types/NavigationParams';

const DetailScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'UserList'>;
  const navigation = useNavigation<NavigationProp>();
  const [isModalOpen, setisModalOpen] = useState(false);

  const OnRatePress = () => {
    setisModalOpen(!isModalOpen);
  };

  const OnbottomsheetPress = () => {
    navigation.navigate('ReanimatedBottomsheet');
  };

  const Onflashmessage = () => {
    navigation.navigate('FlashMessage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={OnRatePress} style={styles.contain}>
        <Text style={styles.text}>Rating Popup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={OnbottomsheetPress} style={styles.contain1}>
        <Text style={styles.text}>Reanimated BottomSheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Onflashmessage} style={styles.contain1}>
        <Text style={styles.text}>Flash Message</Text>
      </TouchableOpacity>
      <RatePopupComp visible={isModalOpen} toggleModal={setisModalOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contain: {
    backgroundColor: 'powderblue',
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  contain1: {
    backgroundColor: 'orange',
    width: 300,
    height: 50,
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 7,
  },
});

export default DetailScreen;
