import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
class ReactButton extends React.Component{

  constructor(){
    super();
    this.state = {pressed: false};
  }
  render(){
    const pressed = (e) => {
      e.preventDefault();
      this.setState({pressed: true});
      this.props.onPress();
    };

    const releasePressed = (e) => {
      e.preventDefault();
      this.setState({pressed: false});
    }

    let clazzName = 'btn btn-large waves-effect waves-light react-button '+this.props.type;
    if (this.props.blink){
      clazzName = 'react-button '+this.props.type+' blink';
    }
    else if (this.state.pressed){
      clazzName = clazzName + ' pressed';
    }
    if (this.props.active){
      clazzName = 'react-button '+this.props.type+' active lighten-5 z-depth-4';
    }

    return <div className="col m3 s3 l3">
            <button onMouseDown={this.props.onPress ? pressed: ''}  onTouchStart={this.props.onPress ? pressed: ''} onTouchEnd={releasePressed} onMouseUp={releasePressed} className={clazzName}>
            </button>
           </div>
  }

  componentDidMount(){
    let domNode = $(ReactDOM.findDOMNode(this)).find('.react-button');
    console.log('height',domNode.width());
    domNode.height(domNode.width());

    $(window).resize( () => {
      console.log('resizing...');
      domNode.height(domNode.width());

    } )


  }


}

export default ReactButton;