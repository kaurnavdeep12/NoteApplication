import React, {useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

const ScanImageScreen = () => {
  const [image, setImage] = useState('');
  function goToImagePicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image Console======>', image);
      setImage(image.path);
    });
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flex: 1}}

        // style={styles.ScrollView}
      >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={goToImagePicker}
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              backgroundColor: 'green',
            }}>
            {image != '' && (
              <Image
                source={{uri: image}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ScanImageScreen;
const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'cyan',
    flex: 1,
  },
});
