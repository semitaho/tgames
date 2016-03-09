const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
const CLIENT_ID = '620105354552-026kvdqfb4gbja57l1d2l71hgdta92gl.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/plus.me';


class Auth{

  static loginGoogle(immediate){
    return new Promise((resolve, reject) =>  {
      gapi.auth.authorize({client_id: CLIENT_ID, scope:  GOOGLE_SCOPE, immediate}, (response) => {
        resolve(response);
      });
    });

  }

}

export default Auth;

