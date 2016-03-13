import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class LoginModal extends React.Component{
  render (){
    return (<div id="facebookmodal" className="modal" tabIndex="-1" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                   <div className="modal-header">
                    <h4>Et ole kirjautunut sisään</h4>
                   </div> 
                   <div className="modal-footer">
                       <div className="btn-group pull-right col-md-12"> 
                        <div className="g-signin2" id="google-login" />
                        <div id="fb-login" className="fb-login-button" onlogin={this.props.onClick} data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>
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
    console.log('gapi', gapi.signin2);
    gapi.signin2.render('google-login', {
        'scope': 'profile email',
        'longtitle': false,
        'theme': 'dark',
        'onsuccess': this.props.onGoogleSignedIn
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