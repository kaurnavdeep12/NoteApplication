import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import JitsiComp from '../components/JitsiComp';


const VideoCallingScreen = () => {
  const [JoinMeeting, setJoinMeeting] = useState(false);
  // function joinMeeting()
  // {
  //   Alert.alert('aaaa')
  // }
  return (
    <View style={{flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
      {JoinMeeting ? (
        <JitsiComp />
      ) : (
        <View
          style={{
            width: 230,
            height: 50,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderWidth: 2,
          }}>
          <TouchableOpacity onPress={() => setJoinMeeting(true)}>
            <Text
              style={{
                textAlign: 'center',
                alignContent: 'center',
                padding: 10,
                fontSize: 20,
              }}>
              Join Meeting
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default VideoCallingScreen;
