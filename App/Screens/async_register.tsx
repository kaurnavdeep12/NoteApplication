import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  BackHandler,
} from 'react-native';

const AsyncReg = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [pwd, setpwd] = useState('');

  const getToken = async () => {
    try {
      const tokenValue = await AsyncStorage.getItem('Users');
      console.log(tokenValue);
      if (tokenValue == null) {
        Alert.alert('empty');
      }
      els;
    } catch (error) {
      console.log("Couldn't retrieve");
    }
  };

  const setToken = async obj => {
    try {
      await AsyncStorage.setItem('Users', JSON.stringify(obj));
    } catch (error) {
      console.log("Couldn't set");
    }
  };

  async function loginHandle() {
    if (id.trim() == '' || pwd.trim() == '') {
      alert('Both fields are required !!');
    } else {
      const Async = await AsyncStorage.getItem('Users');
      const Users = JSON.parse(Async);
      if (Users) {
        const user = Users.find(x => x.id == id);
        if (user) {
          user.pwd == pwd ? alert('Verified') : alert('Wrong Password');
        } else {
          alert('User Not Found');
        }
      } else {
        alert('Empty Async Storage !!');
      }
    }
  }

  const handleRegister = async () => {
    if (id.trim() == '' || pwd.trim() == '') {
      alert('Both fields are required !!');
    } else {
      user.push({id: id, pwd: pwd});
      setUser(user);
      setpwd('');
    }
    setToken(user);
  };

  return (
    <View style={{padding: 20}}>
      <Image
        style={{
          alignSelf: 'center',
          borderWidth: 3,
          borderColor: 'skyblue',
          width: 100,
          height: 100,
        }}
        source={require('./img.png')}
      />

      <Text style={{color: 'black', marginTop: 10, marginBottom: 10}}>
        Email
      </Text>
      <TextInput
        style={{borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
        placeholder={'Enter your id'}
        onChangeText={id => setId(id)}
        autoCompleteType={'email'}
      />

      <Text style={{color: 'black', marginBottom: 10}}>Password</Text>

      <TextInput
        style={{borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
        secureTextEntry={true}
        autoCompleteType={'password'}
        onChangeText={pwd => {
          setpwd(pwd);
        }}
        defaultValue={pwd}
        border
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          style={{width: 150}}
          onPress={() => {
            loginHandle();
          }}
          title="Login "
        />
        <Button
          style={{width: 150, color: 'red'}}
          onPress={() => {
            setId(null);
            setpwd(null);
          }}
          title="Reset"
        />

        {/* <Button  onPress= {setToken} title = 'Submit'/> */}
        <Button onPress={getToken} title="Check" />
        {/* <Button onPress = {removeToken} title = 'Remove'/> */}
      </View>
      <View style={{marginTop: 20}}>
        <Button
          onPress={() => {
            handleRegister();
          }}
          title="Register"
        />
      </View>
    </View>
  );
};
export default AsyncReg;
