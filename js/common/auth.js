const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
const CLIENT_ID = '620105354552-026kvdqfb4gbja57l1d2l71hgdta92gl.apps.googleusercontent.com';
const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/plus.me';
const PROVIDER_GOOGLE = 'google';
const PROVIDER_FACEBOOK = 'facebook';

class Auth {

  static loadAuth2(){
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({
          client_id: CLIENT_ID
        });
        auth2.then(() => {
          resolve(true);
        }, (error) => {
          console.log('error',error);
        });
      
      });
    }); 
  }

  static checkAuth(provider){
    return new Promise((resolve,reject) => {
      switch(provider){
        case PROVIDER_GOOGLE:
          this.checkAuthGoogle().then(() => {
            resolve({provider: PROVIDER_GOOGLE});
          });
          break;
        case PROVIDER_FACEBOOK:
          this.checkAuthFacebook().then(() => {
            resolve({provider: PROVIDER_FACEBOOK});
          });
          break;  

        default:
         reject('no provider provided');
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
    return new Promise(resolve => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve(true);
        } else if (response.status === 'not_authorized') {
          console.log('not authorized');
          reject(false);
        } else {
          reject(false);
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

