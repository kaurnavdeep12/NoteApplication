import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
const signUp = async (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }

  try {
    const cred = await auth().createUserWithEmailAndPassword(email, password);
    console.log('go to firebase', cred);
    const {uid} = cred.user;
    return uid;
  } catch (err) {
    return Alert.alert(err.message);
  }
};

const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    return Alert.alert(err.message);
  }
};

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signUp,
  signIn,

  signOut,
};

export default Auth;
