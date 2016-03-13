const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
const CLIENT_ID = '620105354552-026kvdqfb4gbja57l1d2l71hgdta92gl.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/plus.me';

class Auth {

  static checkAuthGoogle() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({
          client_id: CLIENT_ID
        });
        auth2.then(() => {
          resolve(auth2.isSignedIn.get());
        });
      });
    });

  }

  static checkAuthFacebook() {
    return new Promise(resolve => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve(true);
        } else if (response.status === 'not_authorized') {
          console.log('not authorized');
          resolve(false);
        } else {
          resolve(false);
        }
      });
    });

  }

}

export default Auth;

