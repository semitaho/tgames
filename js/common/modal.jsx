import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class Modal extends React.Component{
  render (){
    return (<div id="tmodal" className="modal modal-lg" tabIndex="-1" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  {this.props.title ? 
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">{this.props.title}</h4>
                  </div> : ''}
                  <div className="modal-body">
                    {this.props.children}
                  </div>
                 <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    {this.props.onSave ? <button type="button" className="btn btn-primary" onClick={this.props.onSave}>Continue</button> : ''}
                </div>
               </div>
               </div>
               </div>)
  }

  componentDidMount(){
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

export default Modal;