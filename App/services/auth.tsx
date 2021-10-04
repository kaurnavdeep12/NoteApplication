import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
const signUp = async (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }

  try {
    const cred = await auth().createUserWithEmailAndPassword(email, password);
    const {uid} = cred.user;
    auth().currentUser?.updateProfile({
      displayName: fullName,
    });
    return uid;
  } catch (err) {
    return Alert.alert(err.code, err.message);
  }
};

const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    return Alert.alert(err.code, err.message);
  }
};

const forgotPassword = (email: string) => {
  if (!email) {
    Alert.alert('Error:', 'Please enter email');
  }
  return auth().sendPasswordResetEmail(email);
};

const signOut = () => {
  return auth().signOut();
};

const Auth = {
  signUp,
  signIn,
  forgotPassword,
  signOut,
};

export default Auth;
