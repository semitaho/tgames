import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import Home from './home/home.jsx';
import Reaktor from './reaktor/reaktorApp.jsx';
import auth from './common/auth.js';
import $ from 'jquery';
const GAPI_KEY = 'AIzaSyBLLdbasHWY-YsG5o5F3cmm9dg8poGYm8M';
import {NOT_LOGGED} from './common/gamestate.js';
import LoginModal from './common/loginmodal.jsx';
global.jQuery = require('jquery');
require('bootstrap');

class App extends React.Component {

  constructor(){
    super();
    console.log('heihei');
    this.handleAuthResult = this.handleAuthResult.bind(this);
    this.state = {gamestate:null};
  }


  onGoogleSignedIn(response){
    console.log('response', response.getBasicProfile());
  }



  render() {
    return (

      <div>
        <div className="fb-like" data-share="true" data-width="450" data-show-faces="true"/>
        {this.state.gamestate && this.state.gamestate === NOT_LOGGED ?  <LoginModal  onGoogleSignedIn={this.onGoogleSignedIn}  onClick={() => {
            FB.login(response => {
              if (response.status === 'connected') {
                location.reload(true);
              }
            });
          }} /> : '' }

        {this.props.children}
      </div>
    )
  }

  checkAuth(){
    auth.loginGoogle(true).then(this.handleAuthResult);

  }

  handleAuthResult(response){
    console.log('keekki');
    if (response && !response.error) {
      console.log('no error', gapi.client);
       gapi.client.load('plus', 'v1', () =>  {
        
         var request = gapi.client.plus.people.get({
          'userId': 'me'
         });

        request.execute(resp => {
            console.log('Retrieved profile for:', resp);
        }, error => {
          console.log('error', error);
        });
       });
    } else {
      console.log('auth failes....', response);
      this.setState({gamestate: NOT_LOGGED});
    }

  }

  componentDidMount(){
    gapi.client.setApiKey(GAPI_KEY);
    this.checkAuth();
  }
};
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

