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
      console.log('poi');
      this.setState({pressed: false});
    }

    let clazzName = 'react-button '+this.props.type;
    if (this.props.blink){
      clazzName = 'react-button '+this.props.type+' blink';
    }
    else if (this.props.active){
      clazzName = 'react-button '+this.props.type+' active';
    }

    if (this.state.pressed){
      clazzName = clazzName + ' pressed';

    }

    return <div className="col-md-3 col-sm-3 col-xs-3"> 
            <div onMouseDown={pressed} onMouseUp={releasePressed} className={clazzName}>
            </div>
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