const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
const CLIENT_ID = '620105354552-026kvdqfb4gbja57l1d2l71hgdta92gl.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/plus.me';
const PROVIDER_GOOGLE = 'google';
const PROVIDER_FACEBOOK = 'facebook';

class Auth {

  static checkAuthGoogle() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({
          client_id: CLIENT_ID
        });
        auth2.then(() => {
          if (auth2.isSignedIn && auth2.isSignedIn.get() === true) {
            resolve({provider: PROVIDER_GOOGLE});
          } else {
            resolve(false);
          }
        });
      });
    });
  }

  static checkAuthFacebook() {
    return new Promise(resolve => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve({provider: PROVIDER_FACEBOOK});
        } else if (response.status === 'not_authorized') {
          console.log('not authorized');
          resolve(false);
        } else {
          resolve(false);
        }
      });
    });

  }

  static storeProvider(provider) {
    if (localStorage) {
      localStorage.provider = provider;
    }
  }

  static readUserInfo(provider) {
    return new Promise((resolve, reject)=> {
      switch (provider) {
        case PROVIDER_GOOGLE:
          break;
        case PROVIDER_FACEBOOK:
          break;
        default:
          console.log('cannot find correct provider!');
          reject('cannot find provider:' + provider);
      }
    });

  }

}

export default Auth;

