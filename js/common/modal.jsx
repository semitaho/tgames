import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

class Modal extends React.Component {


  render() {
    const backToMainMenu = () => {
      window.location.assign("");
    };

    return (<div id="tmodal" className="modal" tabIndex="-1">
          <div className="modal-content">
            {this.props.title ? <h4 className="modal-title">{this.props.title}</h4> : ''}
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button type="button" onClick={backToMainMenu} className="btn btn-default" data-dismiss="modal">Close</button>
            {this.props.onSave ? <button type="button" className="btn btn-primary" onClick={this.props.onSave}>Continue</button> : ''}
          </div>
        </div>)
  }

  componentDidMount() {
    this.toggleModal('show');
  }

  componentWillUnmount() {
    this.toggleModal('hide');
  }

  toggleModal(value) {
    let modal = $('#tmodal');
    if (value === 'show'){
      modal.openModal();
    } else if (value === 'hide'){
      modal.closeModal();

    }

  }
}

export default Modal;