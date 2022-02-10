import React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

const DetailScreen = () => {
  return (
    <View style={{ height: 500, width: '100%'}}>
      <Text>Animated Lottiee</Text>
      <LottieView
        source={require('../assets/error.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default DetailScreen;
