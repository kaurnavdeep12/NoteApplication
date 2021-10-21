import {RFValue} from 'react-native-responsive-fontsize';
export function fontScale(size: number) {
  return RFValue(size);
}

export default {
  strings: {
    heading_text: 'Note App',
    placehoder_text: 'Enter your Notes Here...',
    error_text: 'Error: Input field is empty...',
    helping_text: 'No Notes available',
    sub_title: 'Your Note:',
    splash_text: 'Navigation',
    add_note: 'Note App',
    edit_note: 'Edit Note',
    go_back: 'Go Back',
    scr_heading: 'NoteDetailScreen',
    welcome_back: 'Welcome Back!!',
    welcome: 'Welcome!!',
    login: 'Login',
    dont_account: "Don't have an account?",
    forgot_password: 'Forgot Password?',
    success_login: 'You have successfully Login!!',
    register: 'Register',
    note_title: 'Note App',
    back: 'Back',
    next: 'Next',
  },
  fonts: {
    NOTOSERIF: 'NotoSerif-Bold',
    ROBOTO_LIGHT: 'Roboto-Light',
  },
  colors: {
    textColor: '#102624',
  },
};
