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
import Config from '../utils/Config';

const TaskDetailScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.main}>
          <TextInput
            style={styles.txtInput}
            placeholder={'Enter your text here...'}
            multiline={true}
            textAlignVertical={'top'}
          />
          <View>
            <TouchableOpacity>
              <LinearGradient
                style={styles.addbtn}
                colors={['#ADD8E6', '#728FCE']}>
                <Text style={styles.addtxt}>{Config.strings.add}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <Image style={styles.sideImage_Icon} source={images.add_icon} />
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
    backgroundColor: 'white',
  },
  txtInput: {
    height: 200,
    width: 370,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#728FCE',
    fontSize: 30,
  },
  main: {
    backgroundColor: 'white',
    paddingTop: 100,
  },
  addbtn: {
    height: 70,
    width: 300,
    marginLeft: 22,
    marginTop: 15,
    borderRadius: 10,
  },
  addtxt: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  sideImage_Icon: {
    height: 68,
    width: 70,
    alignItems: 'flex-end',
    right: 5,
    position: 'absolute',
    bottom: 0,
  },
});
