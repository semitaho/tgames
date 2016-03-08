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
                       <div className="btn-group pull-right"> 
                        <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark" />
                        <button onClick={this.props.onClick} className="btn btn-primary pull-right">Kirjaudu Facebookin kautta</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>)
  }

  componentDidMount(){
    console.log('facebookmodal - did mount');
    this.toggleModal('show');
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