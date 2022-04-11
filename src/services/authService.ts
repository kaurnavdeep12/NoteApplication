import ConnectyCube from 'react-native-connectycube';
import config from '../config';

export const init = () => ConnectyCube.init(...config);
export const login_user = (user: any) => {
    console.log('user=====>',user);
  return new Promise((resolve, reject) => {
    ConnectyCube.createSession(user)
      .then(() =>
        ConnectyCube.chat.connect({
          userId: user.id,
          password: user.password,
        }),
      )
      .then(resolve)
      .catch(reject);
  });
};
