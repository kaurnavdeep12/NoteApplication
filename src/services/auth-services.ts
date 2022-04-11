import ConnectyCube from 'react-native-connectycube';
import config from '../config';
const AuthService = () => {
  const init = () => ConnectyCube.init(...config);

 const login = (user: any) => {
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

  const logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };
};

export default AuthService;
