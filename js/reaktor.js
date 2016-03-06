import {render} from 'react-dom';
import React from 'react';
import App from './reaktor/reaktorApp.jsx';
global.jQuery = require('jquery');
require('bootstrap');
let tircContent = document.getElementById('reaktor-container');

window.fbAsyncInit = function() {

  var appId;
  if (window.location.hostname.indexOf('semitaho.github.io') > -1) {
    appId = '1768417853390130';
  } else {
    appId = '1768419953389920';
  }

  FB.init({
    appId,
    xfbml      : true,
    version    : 'v2.5'
    });

  function login(){
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }


  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
       FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
       render(<App {...response} />, tircContent);
     });
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      console.log('not not_authorized');
      login();
      // the user is logged in to Facebook, 
      // but has not authenticated your app
    } else {
      console.log('not in facebook');
    }
  });
};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

