import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import {FloatingAction} from 'react-native-floating-action';
import {Header} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const [isloading, setisLoading] = useState(true);
  const [list, setList] = useState<Array<any>>([]);
  // const Input = AsyncStorage.getItem('Input');
  // console.log('get Data +++', Input);

  const getData_async = () => {
    try {
      // eslint-disable-next-line no-shadow
      const Input = AsyncStorage.getItem('Input');
      console.log('get Data +++', Input);
    } catch (e) {
      Alert.alert('Failed to fetch the data from storage');
    }
  };

  useEffect(() => {
    getData_async();
  }, []);

  const actions = [
    {
      text: 'Add Notes',
      icon: require('../assets/notepad.png'),
      name: 'bt_accessibility',
      position: 2,
    },
  ];

  const handleLogout = async () => {
    await auth().signOut();
    navigation.navigate('Login');
  };

  const pressLogout = async () => {
    Alert.alert(
      'NoteApp',
      'Do you really want to Logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            handleLogout();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onclickbtn = () => {
    // Alert.alert('aaaa');
    navigation.navigate('TaskDetailScreen');
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => Alert.alert('Right icon Clicked'),
        }}
        centerComponent={{
          text: 'NoteApplication',
          style: {color: '#fff', fontSize: 24},
        }}
        rightComponent={{
          icon: 'logout',
          color: '#fff',
          onPress: () => pressLogout(),
        }}
      />
      <Text>Floating Action example</Text>
      <FloatingAction actions={actions} onPressItem={onclickbtn} />

      {isloading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    // onPress={() => onItemClick(item)}
                  >
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square} />
                        <Text style={styles.itemText}>
                          hellllllllloooooooooooooooo
                        </Text>
                      </View>
                      <Button
                        title="X"
                        color="crimson"
                        // onPress={() => {
                        //   onDeletePress(item.id);
                        // }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  img_logout: {height: 40, width: 50, alignSelf: 'flex-end'},
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 3,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 3,
  },
  addText: {fontSize: 20},

  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  scroll: {
    flexGrow: 1,
  },
});
