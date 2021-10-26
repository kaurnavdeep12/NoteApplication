import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/native';
import Config from '../utils/Config';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  type NavigationProp = StackNavigationProp<AuthParamList, 'TaskDetailScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    if (email === '') {
      Alert.alert('please enter valid email');
    } else if (password === '') {
      Alert.alert('please enter password');
    } else {
      try {
        await auth().signInWithEmailAndPassword(email, password);
        navigation.navigate('NotesScreen');
        setEmail('');
        setPassword('');
        setError('');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const goRegister = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Register'}],
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.welcomeText}>{Config.strings.welcome_back}</Text>
      <Text style={styles.loginText}>{Config.strings.login}</Text>
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#808e9b"
        style={styles.input}
        autoCorrect={true}
        autoCapitalize="none"
        autoCompleteType="email"
        returnKeyType="next"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(e: any) => setEmail(e)}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#808e9b"
        style={styles.input}
        returnKeyType="done"
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={e => setPassword(e)}
      />

      {error ? <Text style={styles.error_txt}>{error}</Text> : null}
      <TouchableOpacity>
        <Text style={styles.fpText}>{Config.strings.forgot_password}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginButtonText}>{Config.strings.login}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.signUpTextView}>
        <Text style={styles.signUpText}>{Config.strings.dont_account}</Text>
        <TouchableOpacity onPress={goRegister}>
          <Text style={[styles.signUpText, {color: '#B53471'}]}>
            {' Register'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
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
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
    color: '#fff',
    alignSelf: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#333',
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#808e9b',
  },
  fpText: {
    alignSelf: 'flex-end',
    color: '#B33771',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
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
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
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
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
  },
  error_txt: {
    color: 'red',
  },
});
