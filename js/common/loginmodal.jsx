import React from 'react';
import ReactDOM from 'react-dom';
import auth from './auth.js';
import {CLIENT_ID} from './auth.js';
import $ from 'jquery';


class LoginModal extends React.Component{
  render (){
    return (<div id="facebookmodal" className="modal" tabIndex="-1" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                   <div className="modal-header">
                    <h3>Et ole kirjautunut sisään</h3>
                   </div> 
                   <div className="modal-footer">
                       <div className="btn-group-vertical pull-right col-md-12">
                        <div className="g-signin2" id="google-login"/>
                        <button className="btn btn-primary" onClick={this.props.onClick}>Login with Facebook</button>
                       </div>
                  </div>
                </div>
              </div>
            </div>)
  }

  componentDidMount(){
    console.log('facebookmodal - did mount');
    this.toggleModal('show');
    FB.XFBML.parse(document.getElementById('fb-login'));
    console.log('gapi client', CLIENT_ID);
    auth.loadAuth2().then( () => {
      console.log('kollo');
      gapi.signin2.render('google-login', {
        'scope': 'profile email',
        'longtitle': true,
        'width': 'auto',
        'theme': 'dark',
        'onsuccess': this.props.onGoogleSignedIn
      });

    });
  

  }

  componentWillUnmount(){
    this.toggleModal('hide');
  }

  toggleModal(value){
    let modal = $(ReactDOM.findDOMNode(this));
    modal.modal(value); 

  }
}

export default LoginModal;