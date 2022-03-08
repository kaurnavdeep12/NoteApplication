import React, {useState,useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BottomSheet from 'react-native-bottomsheet-reanimated';
const ReanimatedBottomsheet = () => {
  return (
    <View style={styles.container}>
      <BottomSheet
        keyboardAware
        bottomSheerColor="#FFFFFF"
        // ref="BottomSheet"
        initialPosition={'50%'} //200, 300
        snapPoints={['50%', '100%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={
          <View>
            <Text style={styles.text}>Header</Text>
          </View>
        }
        body={
          <View style={styles.body}>
            <Text style={styles.text}>Body</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  body: {},
});

export default ReanimatedBottomsheet;
