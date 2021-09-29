import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
const signUp = (fullName: string, email: string, password: string) => {
  if (!fullName || !email || !password) {
    Alert.alert('Error:', 'Please enter all fileds');
  }

  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const {uid} = cred.user;
      auth().currentUser?.updateProfile({
        displayName: fullName,
      });
      return uid;
    })
    .catch(err => Alert.alert(err.code, err.message));
};

const signIn = (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert('Error:', 'Please enter all fields');
  }
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch(err => Alert.alert(err.code, err.message));
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
