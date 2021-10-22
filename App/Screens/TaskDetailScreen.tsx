import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../utils/images';
// import DragonSvg from './App/assets/dragon.svg';
// import {SvgUri} from 'react-native-svg';

const TaskDetailScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={{backgroundColor: '#fff', paddingTop: 100}}>
          <TextInput
            style={styles.txtInput}
            placeholder={'Enter your text here...'}
            multiline={true}
            textAlignVertical={'top'}
          />
          <View>
            <LinearGradient
              style={{
                height: 70,
                width: 250,
                marginLeft: 22,
                marginTop: 15,
                borderRadius: 10,
              }}
              colors={['#ADD8E6', '#728FCE']}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    padding: 15,
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                  Add
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity>
              <Image
                style={{
                  height: 68,
                  width: 70,
                  alignItems: 'flex-end',
                  right: 0,
                  position: 'absolute',
                  bottom: 0,
                }}
                source={images.add_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TaskDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,
    // paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  txtInput: {
    height: 200,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#728FCE',
    // paddingTop: 80,
  },
});
