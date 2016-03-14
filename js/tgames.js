import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Home from './home/home.jsx';
import Reaktor from './reaktor/reaktorApp.jsx';
import auth from './common/auth.js';
import $ from 'jquery';
const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
import {NOT_LOGGED, STARTED} from './common/gamestate.js';
import LoginModal from './common/loginmodal.jsx';
global.jQuery = require('jquery');
require('bootstrap');

class App extends React.Component {

  constructor() {
    super();
    this.handleAuthResult = this.handleAuthResult.bind(this);
    this.state = {gamestate: null, userinfo: {}};
  }

  onGoogleSignedIn(response) {
    auth.storeProvider('google');
    location.reload(true);
  }

  onFacebookSignedIn(response) {

    if (response.status === 'connected') {
      auth.storeProvider('facebook');

      location.reload(true);
    }
  }

  render() {
    return (

      <div className="container-fluid">
        {this.state.gamestate && this.state.gamestate !== NOT_LOGGED ?
        <header className="pull-right">
          <img title={this.state.userinfo.name} className="img-thumbnail img-circle" src={this.state.userinfo.imageurl} />
        </header>
        : ''}
        {this.state.gamestate && this.state.gamestate === NOT_LOGGED ? <LoginModal onGoogleSignedIn={this.onGoogleSignedIn} onClick={() => {
            FB.login(this.onFacebookSignedIn);
          }}/> : '' }

        {this.state.gamestate && this.state.gamestate !== NOT_LOGGED ? 
          React.cloneElement(this.props.children, {userinfo: this.state.userinfo}) : ''}
      </div>
    )
  }

  handleAuthResult(response) {
    if (response && !response.error) {
      console.log('no error', gapi.client);
    } else {
      console.log('auth failes....', response);
    }

  }

  componentDidMount() {
    if (window.location.protocol !== "https:" && window.location.hostname.indexOf('semitaho.github.io') > -1){
      window.location.href = "https:" + window.location.href.substring(window.location.protocol.length); 
      return;
    }

    /*
     auth.checkAuthGoogle().then(isLoggedIn => {
     console.log('heihei');
     if (isLoggedIn === false) {
     console.log('et oo sisäs');
     this.setState({gamestate: NOT_LOGGED});
     return;
     } else {
     console.log('jepjep');
     }
     });


     auth.checkAuthFacebook().then(isLogged => {
     console.log('is logged facebook', isLogged);
     });
     */

     auth.checkAuth(localStorage.provider)
     .then(auth.readUserInfo)
     .then(response => {
      console.log('user info fetched...');
      this.setState({gamestate: STARTED, userinfo: response})
     }).catch((error) => {
      console.log('errro', error);
      this.setState({gamestate: NOT_LOGGED});

     });

    /*
    Promise.all([auth.checkAuthGoogle(), auth.checkAuthFacebook()]).then(dataArray => {
      console.log('promises', dataArray);
      let hasTrue = dataArray.find(item => item !== false);
      if (!hasTrue) {
        console.log('has not signed in...');
      } else {
        console.log('HAS signed in, provider: ' + localStorage.provider);
        auth.readUserInfo(localStorage.provider).then(info => {

        });
      }
    });
*/

  }
}
window.fbAsyncInit = function () {

  var appId;
  if (window.location.hostname.indexOf('semitaho.github.io') > -1) {
    appId = '1768417853390130';
  } else {
    appId = '1768419953389920';
  }

  FB.init({
    appId,
    xfbml: true,
    version: 'v2.5'
  });

  let content = document.getElementById('container');
  render((
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="reaktor" component={Reaktor}/>
      </Route>
    </Router>
  ), content);
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

