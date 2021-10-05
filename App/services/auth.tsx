import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
// comment
const signUp = async (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }
  return auth().createUserWithEmailAndPassword(email, password);
};

// comment
const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
  return auth().createUserWithEmailAndPassword(email, password);
};

/// Comment
const forgotPassword = (email: string) => {
  if (!email) {
    Alert.alert('Error:', 'Please enter email');
  }
  return auth().sendPasswordResetEmail(email);
};

const signout = () => {
  return auth().signOut();
};

const Auth = {
  signUp,
  signIn,
  forgotPassword,
  signout,
};

export default Auth;
