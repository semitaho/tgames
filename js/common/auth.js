const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
export const CLIENT_ID = window.location.hostname.indexOf('semitaho.github.io') > -1 ? '620105354552-h5i2a2nu1g9gc60tohe38lqrst5dnglb.apps.googleusercontent.com' : '620105354552-026kvdqfb4gbja57l1d2l71hgdta92gl.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/plus.me';
const PROVIDER_GOOGLE = 'google';
const PROVIDER_FACEBOOK = 'facebook';
let initialized =false;
class Auth {

  static loadAuth2(){
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        if (initialized){
          resolve(true);
        }
        let auth2 = gapi.auth2.init({
          client_id: CLIENT_ID
        });
        console.log('authload2', auth2);
        
        auth2.then(() => {
          console.log('jeee');
          initialized = true;
          resolve(true);
        }, (error) => {
          console.log('error',error);
          reject(Error(error));
        });
      
      });
    }); 
  }

  static checkAuth(provider){

    return new Promise((resolve,reject) => {
      const rejectAuth= () => {
        reject(Error("not authorized"));
      };

      switch(provider){
        case PROVIDER_GOOGLE:
          this.checkAuthGoogle().then(() => {
            resolve({provider: PROVIDER_GOOGLE});
          }, rejectAuth);
          break;
        case PROVIDER_FACEBOOK:
          this.checkAuthFacebook().then(() => {
            resolve({provider: PROVIDER_FACEBOOK});
          }, rejectAuth);
          break;  

        default:
         reject(Error('no provider provided'));
      }
      if (!provider){
        reject('no provider provided');
      }
    });

  }

  static checkAuthGoogle() {
    return new Promise((resolve, reject) => {
        this.loadAuth2().then(() => {
          console.log('chekkonen');
          let auth2 = gapi.auth2.getAuthInstance();
          if (auth2.isSignedIn && auth2.isSignedIn.get() === true) {
            resolve(true);
          } else {
            reject(false);
          }
        });
    });
  }

  static checkAuthFacebook() {
    return new Promise((resolve,reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve(true);
        } else if (response.status === 'not_authorized') {
          const NOT_AUTHORIZED = 'not authorized';
          console.log(NOT_AUTHORIZED);
          reject(Error(NOT_AUTHORIZED));
        } else {
          reject(Error('not logged in'));
        }
      });
    });

  }

  static storeProvider(provider) {
    if (localStorage) {
      localStorage.provider = provider;
    }
  }

  static readUserInfo(provider, reject) {
    return new Promise((resolve, reject)=> {
      switch (provider.provider) {
        case PROVIDER_GOOGLE:
          let auth2 = gapi.auth2.getAuthInstance();
          let profile = auth2.currentUser.get().getBasicProfile();
          let userObject = {userid: profile.getId(), name: profile.getName(), imageurl: profile.getImageUrl(), provider: PROVIDER_GOOGLE};
          resolve(userObject);
          break;
        case PROVIDER_FACEBOOK:
          FB.api('/me?fields=id,name,picture', (response) => {
            let userObject = {userid: response.id, name: response.name, provider: PROVIDER_FACEBOOK};
            if (response.picture && response.picture.data){
              userObject.imageurl = response.picture.data.url;
            }
            resolve(userObject);
          });
          break;
        default:
          console.log('cannot find correct provider!');
          reject('cannot find provider:' + provider);
      }
    });

  }

}
export default Auth;

