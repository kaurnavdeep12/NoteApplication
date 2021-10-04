import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
// comment
const signUp = async (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }
  try {
    const creds = await auth()
      .createUserWithEmailAndPassword(email, password)
    return creds.user
  } catch (err) {
    // handle error
  }
};

// comment
const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (err: any) {
    return Alert.alert(err.code, err.message);
  }
};

/// Comment
const forgotPassword = (email: string) => {
  if (!email) {
    Alert.alert('Error:', 'Please enter email');
  }
  return auth().sendPasswordResetEmail(email);
};

/// Comment
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
