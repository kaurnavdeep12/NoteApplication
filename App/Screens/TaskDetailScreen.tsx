import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
// import DragonSvg from './App/assets/dragon.svg';
// import {SvgUri} from 'react-native-svg';
import Plus from '../assets/svg/plus.svg';
import {TextComponent, EditTextComponent} from '../components';
import {FloatingAction} from 'react-native-floating-action';

const TaskDetailScreen = () => {
  const actions = [
    {
      text: 'Accessibility',
      icon: require('../assets/notepad.png'),
      name: 'Add Notes',
      position: 2,
    },
  ];
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <Text>Floating Action example</Text>
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
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
