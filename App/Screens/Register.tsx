/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import auth from '@react-native-firebase/auth';
import Config from '../utils/Config';
import {firebase} from '@react-native-firebase/firestore';

// import {firebase} from '@react-native-firebase/firestore';

const Register = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const ref_input2 = useRef();
  // const ref_input3 = useRef();

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const handleRegister = async () => {
    if (email === '') {
      Alert.alert('please enter valid email');
    } else if (password === '') {
      Alert.alert('please enter password');
    } else {
      try {
        const response = await auth()
          .createUserWithEmailAndPassword(email, password)
          .then(resp => {
            firebase
              .firestore()
              .collection('users')
              .doc(resp.user.uid)
              .set({firstName: firstName, lastName: lastName});
          });

        // console.log('response user in Register Screen', response);
        navigation.navigate('HomeScreen');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{Config.strings.welcome}</Text>
      <Text style={styles.loginText}>{Config.strings.register}</Text>

      <TextInput
        placeholder="First Name"
        placeholderTextColor="#808e9b"
        style={styles.input}
        value={firstName}
        onChangeText={e => setfirstName(e)}
        autoFocus={true}
        returnKeyType="next"
        // onSubmitEditing={() => ref_input2.current.focus()}
      />

      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#808e9b"
        style={styles.input}
        value={lastName}
        onChangeText={e => setlastName(e)}
        autoFocus={true}
        returnKeyType="next"
        // onSubmitEditing={() => ref_input2.current.focus()}
      />

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        autoCapitalize="none"
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={e => setEmail(e)}
        returnKeyType="next"
        blurOnSubmit={false}
        // onSubmitEditing={() => ref_input3.current.focus()}
        // ref={ref_input2}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#808e9b"
        style={styles.input}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={e => setPassword(e)}
        // ref={ref_input3}
      />

      {error ? <Text style={styles.error_txt}>{error}</Text> : null}
      <TouchableOpacity>
        <Text style={styles.fpText}>{Config.strings.forgot_password}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{Config.strings.register}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#fff',
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 6,
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#833471',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fafafa',
    alignSelf: 'center',
  },
  loginWithBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  iconButton: {
    backgroundColor: '#333',
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 100,
  },
  signUpTextView: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#808e9b',
    fontSize: 20,
    fontWeight: '500',
  },
  error_txt: {
    color: 'red',
  },
});
