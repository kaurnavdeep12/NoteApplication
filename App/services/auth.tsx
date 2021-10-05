import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
// comment
const signUp = async (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }
<<<<<<< HEAD
  try {
    const creds = await auth()
      .createUserWithEmailAndPassword(email, password)
    return creds.user
  } catch (err) {
    // handle error
  }
=======
  return auth().createUserWithEmailAndPassword(email, password);
>>>>>>> a58bad2412d17e1506ed5fab1c9d944f8f2aecbe
};

// comment
const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
<<<<<<< HEAD
  try {
    await auth().signInWithEmailAndPassword(email, password);
  } catch (err: any) {
    return Alert.alert(err.code, err.message);
  }
=======
  return auth().createUserWithEmailAndPassword(email, password);
>>>>>>> a58bad2412d17e1506ed5fab1c9d944f8f2aecbe
};

/// Comment
const forgotPassword = (email: string) => {
  if (!email) {
    Alert.alert('Error:', 'Please enter email');
  }
  return auth().sendPasswordResetEmail(email);
};

<<<<<<< HEAD
/// Comment
const signOut = () => {
=======
const signout = () => {
>>>>>>> a58bad2412d17e1506ed5fab1c9d944f8f2aecbe
  return auth().signOut();
};

const Auth = {
  signUp,
  signIn,
  forgotPassword,
  signout,
};

export default Auth;
