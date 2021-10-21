import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Plus from '../assets/svg/plus.svg';

const TaskDetailScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Plus width={120} height={100} />
        <Text>Welcome</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;
const styles = StyleSheet.create({
  body: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
