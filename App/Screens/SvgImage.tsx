import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
// import DragonSvg from './App/assets/dragon.svg';
import {SvgUri} from 'react-native-svg';

const SvgImage = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <SvgUri
          width="100%"
          height="100%"
          uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
        />
      </View>
    </SafeAreaView>
  );
};

export default SvgImage;
const styles = StyleSheet.create({
  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
