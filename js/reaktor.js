
import {render} from 'react-dom';
import React from 'react';
import App from './reaktor/reaktorApp.jsx';

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
  render(<App  />, tircContent);

};

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

