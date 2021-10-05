import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {Auth} from '../services';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const handleSignUp = () => {
    navigation.navigate('Register');
  };
  const handleLoginClick = () => {
    if (email == '' && password == '') {
      Alert.alert('Please Enter Both Fields');
    } else {
      navigation.navigate('Congratulations');
    }
  };

  // eslint-disable-next-line no-shadow
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#808e9b"
          style={styles.input}
          autoCorrect={true}
          autoCapitalize={false}
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#808e9b"
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={e => setPassword(e)}
        />
        <TouchableOpacity>
          <Text style={styles.fpText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Auth.signIn(email, password)}
          style={styles.loginButton}>
          <TouchableOpacity onPress={handleLoginClick}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.signUpTextView}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signUpText, {color: '#B53471'}]}>
              {' Signup'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default Login;
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
});
