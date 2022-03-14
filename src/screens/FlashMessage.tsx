import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar';
const FlashMessage = () => {
  function onPresstext()
  {
    Snackbar.show({
      text: 'Hello world',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
  // useEffect(() => {
  //   SnackBar.show('Making the world happier', {duration: 8000});
  // }, []);
  return (
    <View style={{flex: 1}}>
      <Text
        style={{justifyContent: 'center', alignItems: 'center', padding: 100}}
        onPress={onPresstext}>
        Open SnackBar
      </Text>
    </View>
  );
};

export default FlashMessage;
